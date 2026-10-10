import { Component, OnInit, Input } from '@angular/core';

import { Path } from '../../../../config';

import { DinamicPrice, Sweetalert } from '../../../../functions';

import { UsersService } from '../../../../services/users.service';
import { ProductsService } from '../../../../services/products.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.css']
})
export class AccountWishlistComponent implements OnInit {

	@Input() childItem:any;

	path:string = Path.url;
	wishlist:any[] = [];
	products:any[] = [];
	price:any[] = [];
  render:boolean = true;

	constructor(private usersService: UsersService,
		        private productsService: ProductsService) { }

	ngOnInit(): void {

  	/*=============================================
  	Seleccionamos el id del usuario
  	=============================================*/

		this.usersService.getUniqueData(this.childItem)
		.subscribe(resp=>{
			
			if(resp["wishlist"] != undefined){

				/*=============================================
    		Tomamos de la data la lista de deseos
  			=============================================*/

  			this.wishlist = JSON.parse(resp["wishlist"]);

    		/*=============================================
    		Realizamos un foreach en la lista de deseos
    		=============================================*/

    		if(this.wishlist.length > 0){

    			this.wishlist.forEach(list =>{	
    				
    				/*=============================================
        			Filtramos la data de productos 
    				=============================================*/

    				this.productsService.getFilterData("url", list)
    				.subscribe(resp=>{

              /*=============================================
              recorremos la data de productos
              =============================================*/

              for(const i in resp){

      					/*=============================================
          			agregamos los productos 
          			=============================================*/
      					
      					this.products.push(resp[i]);

      					/*=============================================
         			  validamos los precios en oferta
          			=============================================*/

          			this.price.push(DinamicPrice.fnc(resp[i]))	

              }  
					
    				})
 
    			})		

    		}
	
			}

		})

	}

  /*=============================================
  Removemos el producto de la lista de deseos
  =============================================*/

  removeProduct(product){

    if (!window.confirm('Are you sure to remove it?')) {
      return;
    }

    /*=============================================
    Buscamos coincidencia para remover el producto
    =============================================*/

    this.wishlist.forEach((list, index)=>{
      
      if(list == product){

        this.wishlist.splice(index, 1);

      }

    })

    /*=============================================
    Actualizamos en Firebase la lista de deseos
    =============================================*/

    let body ={

      wishlist: JSON.stringify(this.wishlist)
    
    }

    this.usersService.patchData(this.childItem, body)
    .subscribe(resp=>{

        if(resp["wishlist"] != ""){

          Sweetalert.fnc("success", "Product removed", "account")

        }

    })

  }

}

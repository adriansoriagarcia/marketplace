import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare let jQuery:any;
declare let $:any;

interface SubCategory {
  category: string;
  image: string;
  name: string;
  products_inventory: number;
  title_list: string;
  url: string;
  view: number;
}




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  path: string = 'assets/';
  categories: any[] = [];
  arrayTitleList: any[] = [];
  render: boolean = true;
  authValidate: boolean = false;
  picture!: string;
  wishlist: number = 0;
  shoppingCart: any[] = [];
  totalShoppingCart: number = 0;
  renderShopping: boolean = true;
  subTotal: string = `<h3>Sub Total:<strong class="subTotalHeader"><div class="spinner-border"></div></strong></h3>`;
  lang: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService
  ) {}

  ngOnInit() {
    /*=============================================
		Tomamos la data de las categorías
		=============================================*/

    this.categoriesService.getData().subscribe((resp: Record<string, any>) => {
      /*=============================================
			Recorremos la colección de categorías para tomar la lista de títulos
			=============================================*/

      let i;

      for (i in resp) {
        this.categories.push(resp[i]);

        /*=============================================
				Separamos la lista de títulos en índices de un array
				=============================================*/

        this.arrayTitleList.push(JSON.parse(resp[i].title_list));
      }
    });
  }

  callback() {
    if (this.render) {
      this.render = false;
      let arraySubCategories: SubCategory[][] = [];

      /*=============================================
			Hacemos un recorrido por la lista de títulos
			=============================================*/

      this.arrayTitleList.forEach((titleList) => {
        /*=============================================
				Separar individualmente los títulos
				=============================================*/

        for (let i = 0; i < titleList.length; i++) {
          /*=============================================
					Tomamos la colección de las sub-categorías filtrando con la lista de títulos
					=============================================*/

          this.subCategoriesService
            .getFilterData('title_list', titleList[i])
            .subscribe((resp: any) => {
              const subCategories = Array.isArray(resp) ? resp : [resp]; // Convierte en array si es necesario
              arraySubCategories.push(...subCategories);

              /*=============================================
						Hacemos un recorrido por la colección general de subcategorias
						=============================================*/

              let f;
              let g;
              let arrayTitleName = [];
             
              for (let f in arraySubCategories) {
                /* Recorrer la colección particular de subcategorías */
              
                for (let g in arraySubCategories[f]) {
                  const subCategory = arraySubCategories[f][g];  // Accede al objeto subCategory
              
                  // Verifica si las propiedades existen antes de hacer el push
                  if (subCategory.title_list && subCategory.name && subCategory.url) {
                    arrayTitleName.push({
                      titleList: subCategory.title_list,  // Accede directamente a las propiedades
                      subcategory: subCategory.name,
                      url: subCategory.url,
                    });
                    //console.log('Pushed:', arrayTitleName);
                  } 
                }
              }
              

              /*=============================================
						Recorremos el array de objetos nuevo para buscar coincidencias con las listas de título
						=============================================*/
            //console.log('titleList:', titleList);  // Verifica el contenido de titleList
            //console.log('arrayTitleName:', arrayTitleName); 
              for (f in arrayTitleName) {
                if (titleList[i] == arrayTitleName[f].titleList) {
                  /*=============================================
								Imprimir el nombre de subcategoría debajo de el listado correspondiente
								=============================================*/
                  $(`[titleList='${titleList[i]}']`).append(
                    `<li>
										<a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
									</li>`
                  );
                }
              }
            });
        }
      });
    }
  }
}

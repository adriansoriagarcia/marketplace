import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit {

	breadcrumb:string = '';

  	constructor(private categoriesService: CategoriesService,
  	          private subCategoriesService: SubCategoriesService,
  	          private activateRoute: ActivatedRoute) { }

  	ngOnInit(): void {

	/*=============================================
	Refrescamos el RouterLink para actualizar la ruta de la página
	=============================================*/		
    // this.activateRoute.params.subscribe(param => { })

	let params = this.activateRoute.snapshot.params["param"].split("&")[0];

	/*=============================================
	Filtramos data de categorías
	=============================================*/	

	this.categoriesService.getFilterData("url", params)
	.subscribe((resp1: Object)=>{

		const categories = resp1 as Record<string, { name: string; view: number }>;

		if(Object.keys(categories).length > 0){

			for(const i in categories){

				this.breadcrumb = categories[i].name;

				let id = i;
				
				let value = {
					"view": Number(categories[i].view+1)
				}

				this.categoriesService.patchData(id, value)
				.subscribe(resp=>{})
	
			}

		}else{

			/*=============================================
			Filtramos data de subategorías
			=============================================*/	

			this.subCategoriesService.getFilterData("url", params)
			.subscribe(resp2=>{

				const subCategories = resp2 as Record<string, { name: string; view: number }>;
	
				for(const i in subCategories){

					this.breadcrumb = subCategories[i].name;

					let id = i;
				
					let value = {
						"view": Number(subCategories[i].view+1)
					}

					this.subCategoriesService.patchData(id, value)
					.subscribe(resp=>{})
					
				}

			})

		}
		
	})
	
  }

}

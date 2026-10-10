import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Path } from '../../config';
import { Search } from '../../functions';

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { UsersService } from '../../services/users.service';

type Category = {
	name: string;
	icon: string;
	url: string;
	title_list: string;
};

type SubCategory = {
	title_list: string;
	name: string;
	url: string;
};

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	path: string = Path.url;
	categories: Category[] = [];
	arrayTitleList: string[][] = [];
	render:Boolean = true;
	authValidate = false;

	constructor(
		private categoriesService: CategoriesService,
		private subCategoriesService: SubCategoriesService,
		private usersService: UsersService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.refreshAuth();
		this.router.events
			.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe(() => this.refreshAuth());

		/*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getData()
		.subscribe(resp => {

			const categoryRecords = resp as Record<string, Category>;
			this.categories = Object.values(categoryRecords);

			/*=============================================
			Recorremos la colección de categorías para tomar la lista de títulos
			=============================================*/

			for (const category of this.categories) {

				/*=============================================
				Separamos la lista de títulos en índices de un array
				=============================================*/
				
				this.arrayTitleList.push(JSON.parse(category.title_list) as string[]);
				
			}

		})
	
	}

	private refreshAuth(): void {
		this.usersService.authActivate().then(isAuthenticated => {
			this.authValidate = isAuthenticated;
		});
	}

	logout(): void {
		localStorage.removeItem('idToken');
		localStorage.removeItem('expiresIn');
		this.authValidate = false;
		this.router.navigateByUrl('/login');
	}

	/*=============================================
	Declaramos función del buscador
	=============================================*/

	goSearch(search: string): void {

		if(search.length == 0 || Search.fnc(search) == undefined){

			return;
		}

		window.open(`search/${Search.fnc(search)}`, '_top')

	}

	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;
			const arraySubCategories: Array<Record<string, SubCategory>> = [];
			
			/*=============================================
			Hacemos un recorrido por la lista de títulos
			=============================================*/

			this.arrayTitleList.forEach(titleList =>{

				/*=============================================
				Separar individualmente los títulos
				=============================================*/

				for(let i = 0; i < titleList.length; i++){
					const requestedTitle = titleList[i];

					/*=============================================
					Tomamos la colección de las sub-categorías filtrando con la lista de títulos
					=============================================*/
					
					this.subCategoriesService.getFilterData("title_list", requestedTitle)
					.subscribe(resp =>{
						
						arraySubCategories.push(resp as Record<string, SubCategory>);

						/*=============================================
						Hacemos un recorrido por la colección general de subcategorias
						=============================================*/

						const arrayTitleName: SubCategory[] = [];

						for (const subCategoryRecords of arraySubCategories) {
							
							/*=============================================
							Hacemos un recorrido por la colección particular de subcategorias
							=============================================*/

							for (const key in subCategoryRecords) {

								/*=============================================
								Creamos un nuevo array de objetos clasificando cada subcategoría con la respectiva lista de título a la que pertenece
								=============================================*/

								arrayTitleName.push({

									"title_list": subCategoryRecords[key].title_list,
									"name": subCategoryRecords[key].name,
									"url": subCategoryRecords[key].url,

								})

							}

						}

						/*=============================================
						Recorremos el array de objetos nuevo para buscar coincidencias con las listas de título
						=============================================*/

						for (const subCategory of arrayTitleName) {

							if(requestedTitle == subCategory.title_list){
								
								/*=============================================
								Imprimir el nombre de subcategoría debajo de el listado correspondiente
								=============================================*/

								$(`[titleList='${requestedTitle}']`).append(

									`<li>
										<a href="products/${subCategory.url}">${subCategory.name}</a>
									</li>`

								)
						
							}

						}					

					})

				}			

			})
		}

	}



}

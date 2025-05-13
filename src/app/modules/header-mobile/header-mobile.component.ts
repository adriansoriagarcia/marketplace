import { Component } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare let jQuery: any;
declare let $: any;

interface SubCategory {
  category: string;
  subcategory: string;
  url: string;
}

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
})
export class HeaderMobileComponent {
  path: string = Path.url;
  categories: any[] = [];
  arrayTitleList: any[] = [];
  categoriesList: any[] = [];
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

  ngAfterViewInit() {
    $(document).on('click', '.sub-toggle', function (this: HTMLElement) {
      $(this).parent().children('ul').toggle();
    });
  }

  ngOnInit() {
    /*=============================================
		Tomamos la data de las categorías
		=============================================*/

    this.categoriesService.getData().subscribe((resp: any) => {
      /*=============================================
			Recorremos la colección de categorías para tomar la lista de títulos
			=============================================*/
      let i;

      for (i in resp) {
        this.categories.push(resp[i]);

        /*=============================================
				Separamos los nombres de categorías
				=============================================*/

        this.categoriesList.push(resp[i].name);
      }
    });

    /*=============================================
		Activamos el efecto toggle en el listado de subcategorías
		=============================================*/

    $(document).ready(function () {
      $(document).on('click', '.sub-toggle', function (this: any) {
        // Especificamos que `this` es un HTMLElement
        $(this).parent().children('ul').toggle();
      });
    });
  }

  callback() {
    if (this.render) {
      this.render = false;
      let arraySubCategories: SubCategory[] = [];

      /*=============================================
			Separar las categorías
			=============================================*/

      this.categoriesList.forEach((category) => {
        /*=============================================
				Tomamos la colección de las sub-categorías filtrando con los nombres de categoría
				=============================================*/

        this.subCategoriesService
          .getFilterData('category', category)
          .subscribe((resp: any) => {
            /*=============================================
					Hacemos un recorrido por la colección general de subcategorias y clasificamos las subcategorias y url
					de acuerdo a la categoría que correspondan
					=============================================*/

            let i;

            for (i in resp) {
              arraySubCategories.push({
                category: resp[i].category,
                subcategory: resp[i].name,
                url: resp[i].url,
              });
            }

            /*=============================================
					Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorías
					=============================================*/

            for (i in arraySubCategories) {
              if (category == arraySubCategories[i].category) {
                $(`[category='${category}']`).append(
                  `<li class="current-menu-item ">
		                        	<a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
		                        </li>`
                );
              }
            }
          });
      });
    }
  }
}

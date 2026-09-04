import { Component, OnInit } from '@angular/core';
import { Path, Api } from '../../../config';
//import { OwlCarouselConfig } from '../../../functions';

import { ProductsService } from '../../../services/products.service';

declare var $: any;


@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

	path:String = 'assets/';	
	banner_home:Array<any> = [];
	category:Array<any> = [];
	url:Array<any> = [];
	render:Boolean = true;
	preload:Boolean = false;

	transformValue: number = 0;  // Variable para controlar la posición de desplazamiento del carrusel
  currentIndex: number = 0;

	constructor(private productsService: ProductsService) { }


	ngOnInit(): void {
		this.updateCarouselPosition();
		this.preload = true;

		let index = 0;

		this.productsService.getData()
		.subscribe(resp =>{
			
			/*=============================================
			Tomar la longitud del objeto
			=============================================*/

			let i;
			let size = 0;

			for(i in resp){

				size++			

			}

			/*=============================================
			Generar un número aleatorio 
			=============================================*/

			if(size > 5){

				index = Math.floor(Math.random()*(size-5));

			}

			/*=============================================
			Seleccionar data de productos con límites
			=============================================*/


			this.productsService.getLimitData(Object.keys(resp)[index], 5)
			.subscribe( resp => { 

				let i;

				for(i in resp){
				
					this.banner_home.push(JSON.parse(resp[i].horizontal_slider))
					this.category.push(resp[i].category)
					this.url.push(resp[i].url)

					this.preload = false;

				}

			})

		})

	}

	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;

			//OwlCarouselConfig.fnc()

		}

	}


	nextSlide() {
		if (this.currentIndex < this.banner_home.length - 1) {
		  this.currentIndex++;
		} else {
		  this.currentIndex = 0;  // Volver al primer slide si estamos al final
		}
	
		this.updateCarouselPosition();  // Actualiza la posición después de cambiar el índice
	  }
	
	  // Método para ir al slide anterior
	  previousSlide() {
		if (this.currentIndex > 0) {
		  this.currentIndex--;
		} else {
		  this.currentIndex = this.banner_home.length - 1;  // Volver al último slide si estamos al principio
		}
	
		this.updateCarouselPosition();  // Actualiza la posición después de cambiar el índice
	  }
	
	  // Método para actualizar la posición del carrusel de manera dinámica
	  updateCarouselPosition() {
		// Cada slide ocupará el 100% del ancho del contenedor, así que usamos `this.currentIndex * 100`
		// Esto ajustará la posición en porcentaje, no en píxeles
		this.transformValue = -(this.currentIndex * 100);  // Desplazamos el carrusel con base en el índice
	  }

}

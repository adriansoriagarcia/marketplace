import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

import { ProductsModel } from '../models/products.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

	private api:string = Api.url;

	constructor(private http:HttpClient ) { }

	getData(): Observable<any[]> {
		return this.http.get<any[]>(`${this.api}products.json`).pipe(
		  map((resp: any[]) => { // Tipa 'resp' como un array de cualquier tipo
			let newResp: any[] = []; // Define 'newResp' como un array de 'any'
			let count = 0;
	
			for (const i in resp) {
			  if (resp.hasOwnProperty(i)) { // Verifica si 'i' es una propiedad de 'resp'
				count++;
	
				if (JSON.parse(resp[i].feedback).type === 'approved') { // Compara estrictamente
				  newResp[i] = resp[i];
				}
			  }
			}
	
			if (count === Object.keys(resp).length) { // Compara estrictamente
			  return newResp;
			}
	
			// Retorna 'newResp' por defecto (en caso de que la condición de arriba no sea suficiente)
			return newResp;
		  })
		);
	  }

	  getLimitData(startAt: string, limitToFirst: number): Observable<any[]> {
		return this.http.get<any[]>(`${this.api}products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`)
		  .pipe(
			map((resp: any[]) => { // Tipa la respuesta de la API como un array de 'any'
			  const newResp: any[] = []; // Define 'newResp' como un array de 'any'
			  let count = 0;
	
			  for (const i in resp) {
				if (resp.hasOwnProperty(i)) { // Verifica que 'i' es una propiedad de 'resp'
				  count++;
	
				  // Comprueba si el feedback es 'approved'
				  if (JSON.parse(resp[i].feedback).type === 'approved') {
					newResp[i] = resp[i];
				  }
				}
			  }
	
			  // Devuelve 'newResp' si se recorren todos los elementos de 'resp'
			  if (count === Object.keys(resp).length) {
				return newResp;
			  }
	
			  // Retorno por defecto si no se cumple la condición
			  return newResp;
			})
		  );
	  }

	getFilterData(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp:any = [];
				let count = 0;

				for(const i in resp){

					count ++;

					if(JSON.parse(resp[i].feedback).type == "approved"){

						newResp[i]=resp[i];

					}

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getFilterDataMyStore(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

	}

	getFilterDataWithLimit(orderBy:string, equalTo:string, limitToFirst:number){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp:any = [];
				let count = 0;

				for(const i in resp){

					count ++;

					if(JSON.parse(resp[i].feedback).type == "approved"){

						newResp[i]=resp[i];

					}

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getSearchData(orderBy:string, param:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&startAt="${param}"&endAt="${param}\uf8ff"&print=pretty`)
		.pipe(
			
			map((resp:any)=>{

				let newResp:any = [];
				let count = 0;

				for(const i in resp){

					count ++;

					if(JSON.parse(resp[i].feedback).type == "approved"){

						newResp[i]=resp[i];

					}

				}

				if(count == Object.keys(resp).length){

					return newResp;
				}

			})

		)

	}

	getFilterDataStore(orderBy:string, equalTo:string){

		return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`)

	}

	patchData(id:string, value:object){

		return this.http.patch(`${this.api}products/${id}.json`,value);

	}

	getUniqueData(value:string){

		return this.http.get(`${this.api}products/${value}.json`);

	}

	patchDataAuth(id:string, value:object, idToken:string){

		return this.http.patch(`${this.api}products/${id}.json?auth=${idToken}`,value);

	}

	/*=============================================
	Registro en Firebase Database
	=============================================*/

	registerDatabase(body: ProductsModel, idToken:string){

		return this.http.post(`${this.api}/products.json?auth=${idToken}`, body);

	}

	/*=============================================
	Eliminar registro en Firebase
	=============================================*/

	deleteDataAuth(id:string, idToken:string){

		return this.http.delete(`${this.api}products/${id}.json?auth=${idToken}`);

	}
}

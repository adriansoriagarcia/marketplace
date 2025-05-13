import { Component } from '@angular/core';
import { Path } from '../../config';
import { ProductsService } from '../../services/products.service';
import { ProductsModel } from '../../models/products.model';

interface TopBanner {
  'H3 tag': string;
  'P1 tag': string;
  'H4 tag': string;
  'P2 tag': string;
  'Span tag': string;
  'Button tag': string;
  'IMG tag': string;
}

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrl: './header-promotion.component.scss',
})
export class HeaderPromotionComponent {
  path: string = Path.url;
  top_banner!: TopBanner;
  category: object = {};
  url: object = {};
  preload: boolean = false;

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.preload = true;

    this.productsService.getData().subscribe((resp: Record<string, any>) => {
      //console.log("resp", resp);

      /*=============================================
			Tomar la longitud del objeto
			=============================================*/

      let i;
      let size = 0;

      for (i in resp) {
        size++;
      }

      /*=============================================
			Generar un número aleatorio 
			=============================================*/

      let index = Math.floor(Math.random() * size);

      /*=============================================
			Devolvemos a la vista un banner aleatorio
			=============================================*/

      this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);

      this.category = resp[Object.keys(resp)[index]].category;
      this.url = resp[Object.keys(resp)[index]].url;

      this.preload = false;
    });
  }
}

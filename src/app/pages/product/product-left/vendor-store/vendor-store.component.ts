import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../../../../config';

import { StoresService } from '../../../../services/stores.service';

@Component({
  selector: 'app-vendor-store',
  templateUrl: './vendor-store.component.html',
  styleUrls: ['./vendor-store.component.css']
})
export class VendorStoreComponent implements OnInit {

	@Input() childItem:any;
	path:String = Path.url;
	store:Array<any>= [];

  	constructor(private storesService: StoresService) { }

  	ngOnInit(): void {

  		this.storesService.getFilterData("store", this.childItem)
  		.subscribe((resp: any) => {
  			const storeList = Array.isArray(resp) ? resp : Object.values(resp ?? {});

  			for (const item of storeList) {
  				this.store.push(item);
  			}

  		});
  	}

}

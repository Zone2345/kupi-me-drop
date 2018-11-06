import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BaseHttpService } from '../baseHttpService.service';

@Injectable({
  providedIn: "root"
})
export class ProductService extends BaseHttpService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getProduct() {
    return this.httpClient.get(this.origin + "product").pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }
}

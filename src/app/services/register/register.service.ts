import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../baseHttpService.service';

@Injectable({
  providedIn: "root"
})
export class RegisterService extends BaseHttpService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  createCustomer(costumer: any) {
    return this.httpClient.post(this.origin + "register", costumer);
  }
}

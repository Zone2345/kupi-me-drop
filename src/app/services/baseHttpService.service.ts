import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class BaseHttpService {
  protected origin = "/api/";
  constructor(protected httpClient: HttpClient) {}
}

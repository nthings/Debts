import { Injectable } from '@angular/core';
import { Data } from '../data/data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeopleService extends Data {
  path = 'people';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}

import { Injectable } from '@angular/core';
import { Data } from '../data/data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeriodService extends Data {
  path = 'periods';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}

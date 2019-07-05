import { Injectable } from '@angular/core';
import { Data } from '../data/data';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class PeopleService extends Data {
  path = 'people';
  constructor(protected httpClient: HttpClient,
              protected authService: NbAuthService) {
    super(httpClient, authService);
  }
}

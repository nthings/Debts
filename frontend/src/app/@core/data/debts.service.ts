import { Injectable } from '@angular/core';
import { Data } from '../data/data';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class DebtsService extends Data {
  path = 'debts';
  constructor(protected httpClient: HttpClient,
              protected authService: NbAuthService) {
    super(httpClient, authService);
  }

  async insertBatch(data) {
    return this.httpClient.put(`/api/${this.path}/batch`, data, await this.buildOptions()).toPromise();
  }

  async clean(data) {
    return this.httpClient.post(`/api/${this.path}/duplicates`, data, await this.buildOptions()).toPromise();
  }

  async getByOwnerPeriod(ownerId, periodId) {
    return this.httpClient.get(`/api/${this.path}/getByOwnerPeriod/${ownerId}/${periodId}`,
     await this.buildOptions()).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { Data } from '../data/data';
import { HttpClient } from '@angular/common/http';

export abstract class PeopleData extends Data {}

@Injectable()
export class PeopleService extends PeopleData {
  data;

  constructor(private http: HttpClient) {
    super();
  }

  async getData() {
    return this.http.get('/api/people').toPromise();
  }

  async insert(people) {
    return this.http.put('/api/people', people).toPromise();
  }

  async update(id, people) {
    return this.http.post(`/api/people/${id}`, people).toPromise();
  }

  async get(id) {
    return this.http.get(`/api/people/${id}`).toPromise();
  }

  async delete(id) {
    return this.http.delete(`/api/people/${id}`).toPromise();
  }
}

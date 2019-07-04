import { HttpClient } from '@angular/common/http';

export abstract class Data {
    path;

    constructor(private http: HttpClient) {}

    async getData() {
        return this.http.get(`/api/${this.path}`).toPromise();
    }

    async insert(people) {
        return this.http.put(`/api/${this.path}`, people).toPromise();
    }

    async update(id, people) {
        return this.http.post(`/api/${this.path}/${id}`, people).toPromise();
    }

    async get(id) {
        return this.http.get(`/api/${this.path}/${id}`).toPromise();
    }

    async delete(id) {
        return this.http.delete(`/api/${this.path}/${id}`).toPromise();
    }
}

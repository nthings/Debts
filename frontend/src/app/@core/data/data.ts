import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

export abstract class Data {
    path;

    options = {};

    constructor(private http: HttpClient,
                private auth: NbAuthService) { }

    async buildOptions() {
        return this.options = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${await this.auth.getToken().toPromise()}`,
            }),
        };
    }

    async getData() {
        return this.http.get(`/api/${this.path}`, await this.buildOptions()).toPromise();
    }

    async insert(data) {
        return this.http.put(`/api/${this.path}`, data, await this.buildOptions()).toPromise();
    }

    async update(id, data) {
        return this.http.post(`/api/${this.path}/${id}`, data, await this.buildOptions()).toPromise();
    }

    async get(id) {
        return this.http.get(`/api/${this.path}/${id}`, await this.buildOptions()).toPromise();
    }

    async delete(id) {
        return this.http.delete(`/api/${this.path}/${id}`, await this.buildOptions()).toPromise();
    }
}


export abstract class Data {
    abstract async getData(): Promise<any>;
    abstract async insert(obj): Promise<any>;
    abstract async update(id, obj): Promise<any>;
    abstract async get(id): Promise<any>;
    abstract async delete(id): Promise<any>;
}

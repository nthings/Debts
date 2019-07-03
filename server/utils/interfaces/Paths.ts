export interface Paths {
    // Path of the foreign key
    path: String;
    // Nested foreign keys in the populate method
    populate?: Paths;
}

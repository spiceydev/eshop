export interface CRUD {
  list: (limit: number, page: number, userId: string) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<string>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: any) => Promise<string>;
}

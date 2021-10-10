import { CRUD } from '../../common/interfaces/crud.interface';
import ordersDao from '../daos/orders.dao';

class OrderService implements CRUD {
  async list(limit: number, page: number, userId: string) {
    return ordersDao.getOrders(limit, page, userId);
  }
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<string>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: any) => Promise<string>;
}

export default new OrderService();

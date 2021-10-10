import { debug } from 'debug';
import express from 'express';
import ordersService from '../services/orders.service';

const log: debug.IDebugger = debug('app:categories-controller');

class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const categories = await ordersService.list(100, 0, req.body.userId);
    res.status(200).send(categories);
  }
}

export default new OrdersController();

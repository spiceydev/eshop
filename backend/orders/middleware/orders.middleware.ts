import express from 'express';

class OrdersMiddleware {
  async extractOrderId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.orderId;
    next();
  }
  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.userId = req.params.userId;
    next();
  }
}

export default new OrdersMiddleware();

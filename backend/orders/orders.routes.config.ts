import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import usersMiddleware from '../users/middleware/users.middleware';
import ordersController from './controllers/orders.controller';

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }

  configureRoutes(): express.Application {
    this.app.param(`userId`, usersMiddleware.extractUserId);
    this.app
      .route(`/orders/:userId`)
      .get(
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ordersController.listOrders
      );

    return this.app;
  }
}

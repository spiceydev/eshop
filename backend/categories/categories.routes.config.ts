import express from 'express';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import categoriesController from './controllers/categories.controller';
import categoriesMiddleware from './middleware/categories.middleware';

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CategoriesRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/categories`)
      .get(categoriesController.listCategories)
      .post(
        body('name').notEmpty(),
        body('icon').isString().optional(),
        body('color').isString().optional(),
        body('products').isArray(),
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        categoriesMiddleware.validateSameNameDoesntExist,
        categoriesController.createCategory
      );

    this.app.param(`categoryId`, categoriesMiddleware.extractCategoryId);
    this.app
      .route(`/categories/:categoryId`)
      .get(
        categoriesMiddleware.validateCategoryExists,
        categoriesController.getCategoryById
      )
      .delete(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        categoriesMiddleware.validateCategoryExists,
        categoriesController.removeCategory
      )
      .put(
        body('name').isString().notEmpty(),
        body('icon').isString().notEmpty(),
        body('color').isString().notEmpty(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        categoriesMiddleware.validateCategoryExists,
        categoriesController.put
      )
      .patch(
        body('name').isString().optional(),
        body('icon').isString().optional(),
        body('color').isString().optional(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        categoriesMiddleware.validateCategoryExists,
        categoriesController.patch
      );

    return this.app;
  }
}

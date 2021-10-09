import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import productsController from './controllers/products.controller';
import { body } from 'express-validator';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import productsMiddleware from './middleware/products.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/products`)
      .get(productsController.listProducts)
      .post(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        body('name')
          .isLength({ min: 5 })
          .withMessage('Name must be 5+ characters'),
        body('description')
          .isLength({ min: 5 })
          .withMessage('Description must be 5+ characters'),
        body('richDescription')
          .isLength({ min: 5 })
          .withMessage('Rich description must be 5+ characters'),
        body('image').isURL(),
        body('images').isArray(),
        body('brand').notEmpty().isString(),
        body('price').notEmpty().isNumeric(),
        body('category').isMongoId(),
        body('countInStock').isNumeric(),
        body('rating').isNumeric(),
        body('numReviews').isNumeric(),
        body('isFeatured').isBoolean(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        productsMiddleware.validateSameNameDoesntExist,
        productsController.createProduct
      );

    this.app.param(`productId`, productsMiddleware.extractProductId);
    this.app
      .route(`/products/:productId`)
      .get(
        productsMiddleware.validateProductExists,
        productsController.getProductBydId
      )
      .delete(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        productsMiddleware.validateProductExists,
        productsController.removeProduct
      )
      .put(
        body('name')
          .isLength({ min: 5 })
          .withMessage('Name must be 5+ characters'),
        body('description')
          .isLength({ min: 5 })
          .withMessage('Description must be 5+ characters'),
        body('richDescription')
          .isLength({ min: 5 })
          .withMessage('Rich description must be 5+ characters'),
        body('image').isURL(),
        body('images').isArray(),
        body('brand').notEmpty().isString(),
        body('price').notEmpty().isNumeric(),
        body('category').isMongoId(),
        body('countInStock').isNumeric(),
        body('rating').isNumeric(),
        body('numReviews').isNumeric(),
        body('isFeatured').isBoolean(),

        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        productsMiddleware.validateProductExists,
        productsController.put
      )
      .patch(
        body('name')
          .isLength({ min: 5 })
          .withMessage('Name must be 5+ characters')
          .optional(),
        body('description')
          .isLength({ min: 5 })
          .withMessage('Description must be 5+ characters')
          .optional(),
        body('richDescription')
          .isLength({ min: 5 })
          .withMessage('Rich description must be 5+ characters')
          .optional(),
        body('image').isURL().optional(),
        body('images').isArray().optional(),
        body('brand').notEmpty().isString().optional(),
        body('price').notEmpty().isNumeric().optional(),
        body('category').isMongoId().optional(),
        body('countInStock').isNumeric().optional(),
        body('rating').isNumeric().optional(),
        body('numReviews').isNumeric().optional(),
        body('isFeatured').isBoolean().optional(),

        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        productsMiddleware.validateProductExists,
        productsController.patch
      );

    return this.app;
  }
}

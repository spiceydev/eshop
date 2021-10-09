import express from 'express';
import productsService from '../services/products.service';

class ProductsMiddleware {
  async validateSameNameDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productsService.getProductByName(req.body.name);
    if (product) {
      res.status(400).send({ errors: ['Product Name already exists'] });
    } else {
      next();
    }
  }

  async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await productsService.readById(req.body.id);
    if (category) {
      next();
    } else {
      res.status(404).send({
        errors: [`Product ${req.body.id} not found`],
      });
    }
  }

  async extractProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.productId;
    next();
  }
}
export default new ProductsMiddleware();

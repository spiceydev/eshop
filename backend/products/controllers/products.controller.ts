import debug from 'debug';
import express from 'express';
import categoriesService from '../../categories/services/categories.service';
import productsService from '../services/products.service';

const log: debug.IDebugger = debug('app:products-controller');

class ProductsController {
  async listProducts(req: express.Request, res: express.Response) {
    const products = await productsService.list();
    res.status(200).send(products);
  }

  async createProduct(req: express.Request, res: express.Response) {
    const productId = await productsService.create(req.body);
    // add product to category products
    await categoriesService.addProductToCategory(req.body.category, productId);
    res.status(201).send({ id: productId });
  }

  async getProductBydId(req: express.Request, res: express.Response) {
    const product = await productsService.readById(req.body.id);
    res.status(200).send(product);
  }

  async removeProduct(req: express.Request, res: express.Response) {
    // get products category Id
    const categoryId = await productsService.getProductsCategory(req.body.id);

    await categoriesService.removeProductFromCategory(categoryId, req.body.id);
    log(await productsService.deleteById(req.body.id));
    res.status(204).send();
  }

  async patch(req: express.Request, res: express.Response) {
    log(await productsService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await productsService.putById(req.body.id, req.body));
    res.status(204).send();
  }
}

export default new ProductsController();

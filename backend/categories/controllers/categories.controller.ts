import debug from 'debug';
import express from 'express';
import categoriesService from '../services/categories.service';

const log: debug.IDebugger = debug('app:categories-controller');

class CategoriesController {
  async listCategories(req: express.Request, res: express.Response) {
    const categories = await categoriesService.list();
    res.status(200).send(categories);
  }

  async createCategory(req: express.Request, res: express.Response) {
    const categoryId = await categoriesService.create(req.body);
    return res.status(201).send({ id: categoryId });
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    const category = await categoriesService.readById(req.body.id);
    res.status(200).send(category);
  }

  async removeCategory(req: express.Request, res: express.Response) {
    log(await categoriesService.deleteById(req.body.id));
    res.status(204).send();
  }

  async patch(req: express.Request, res: express.Response) {
    log(await categoriesService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await categoriesService.putById(req.body.id, req.body));
    res.status(204).send();
  }
}

export default new CategoriesController();

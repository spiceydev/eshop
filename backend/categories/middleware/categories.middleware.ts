import express from 'express';
import categoriesService from '../services/categories.service';

class CategoriesMiddleware {
  async validateSameNameDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.getCategoryByName(req.body.name);
    if (category) {
      res.status(400).send({ errors: ['Product Name already exists'] });
    } else {
      next();
    }
  }

  async validateCategoryExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.readById(req.body.id);
    if (category) {
      next();
    } else {
      res.status(404).send({
        errors: [`Category ${req.body.id} not found`],
      });
    }
  }

  async extractCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.categoryId;
    next();
  }
}
export default new CategoriesMiddleware();

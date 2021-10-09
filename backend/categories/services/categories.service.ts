import { CRUD } from '../../common/interfaces/crud.interface';
import categoriesDao from '../daos/categories.dao';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { PutCategoryDto } from '../dto/put.category.dto';

class CategoriesService implements CRUD {
  async list() {
    return categoriesDao.getCategories();
  }
  async create(resource: CreateCategoryDto) {
    return categoriesDao.addCategory(resource);
  }
  async getCategoryByName(categoryName: string) {
    return categoriesDao.getCategoryByName(categoryName);
  }
  async putById(id: string, resource: PutCategoryDto): Promise<any> {
    return categoriesDao.updateCategoryById(id, resource);
  }
  async readById(id: string) {
    return categoriesDao.getCategoryById(id);
  }
  async deleteById(id: string): Promise<any> {
    return categoriesDao.removeCategoryById(id);
  }
  async patchById(id: string, resource: PutCategoryDto): Promise<any> {
    console.log(`id`, id);
    return categoriesDao.updateCategoryById(id, resource);
  }

  async removeProductFromCategory(id: string, productId: string) {
    return categoriesDao.removeProductFromCategory(id, productId);
  }

  async addProductToCategory(id: string, productId: string) {
    return categoriesDao.addProductToCategory(id, productId);
  }
}

export default new CategoriesService();

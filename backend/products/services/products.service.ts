import { CRUD } from '../../common/interfaces/crud.interface';
import productsDao from '../daos/products.dao';
import { CreateProductDto } from '../dto/create.product.dto';
import { PutProductDto } from '../dto/put.product.dto';

class ProductsService implements CRUD {
  async list() {
    return productsDao.getProducts();
  }
  async create(resource: CreateProductDto) {
    return productsDao.addProduct(resource);
  }
  async getProductByName(productName: string) {
    return productsDao.getProductByName(productName);
  }
  async putById(id: string, resource: PutProductDto): Promise<any> {
    return productsDao.updateProductById(id, resource);
  }
  async readById(id: string) {
    return productsDao.getProductById(id);
  }
  async deleteById(id: string): Promise<any> {
    return productsDao.removeProductById(id);
  }
  async patchById(id: string, resource: PutProductDto): Promise<any> {
    return productsDao.updateProductById(id, resource);
  }

  async getProductsCategory(id: string) {
    const product = await productsDao.getProductById(id);

    return product.category;
  }
}

export default new ProductsService();

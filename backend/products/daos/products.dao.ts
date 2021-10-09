import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';
import { CreateProductDto } from '../dto/create.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';
import { PutProductDto } from '../dto/put.product.dto';

const log: debug.IDebugger = debug('app:users-dao');

class ProductsDao {
  Schema = mongooseService.getMongoose().Schema;

  productsSchema = new this.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: this.Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });

  Product = mongooseService
    .getMongoose()
    .model('Products', this.productsSchema);

  async getProducts() {
    return await this.Product.find().populate('category').exec();
  }

  async getProductById(productId: string) {
    return await this.Product.findOne({ _id: productId }).exec();
  }

  async addProduct(productFields: CreateProductDto) {
    const product = new this.Product({
      ...productFields,
    });
    await product.save();
    return product._id;
  }

  async getProductByName(productName: string) {
    return this.Product.findOne({ name: productName });
  }

  async updateProductById(
    productId: string,
    categoryFields: PatchProductDto | PutProductDto
  ) {
    const existingProduct = await this.Product.findOneAndUpdate(
      { _id: productId },
      { $set: categoryFields },
      { new: true }
    ).exec();

    return existingProduct;
  }

  async removeProductById(productId: string) {
    return this.Product.deleteOne({ _id: productId }).exec();
  }
}

export default new ProductsDao();

import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { PatchCategoryDto } from '../dto/patch.category.dto';
import { PutCategoryDto } from '../dto/put.category.dto';
import { ObjectId } from 'mongoose';
const log: debug.IDebugger = debug('app:categories-dao');

class CategoriesDao {
  Schema = mongooseService.getMongoose().Schema;

  categorySchema = new this.Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    products: [{ type: this.Schema.Types.ObjectId, ref: 'Products' }],
  });

  Category = mongooseService
    .getMongoose()
    .model('Categories', this.categorySchema);

  async getCategories() {
    return this.Category.find().populate('products').exec();
  }

  async addCategory(categoryFields: CreateCategoryDto) {
    const category = new this.Category({
      ...categoryFields,
    });
    await category.save();
    return category._id;
  }

  async getCategoryById(categoryId: string) {
    return this.Category.findOne({ _id: categoryId })
      .populate('products')
      .exec();
  }

  async removeCategoryById(category: string) {
    return this.Category.deleteOne({ _id: category }).exec();
  }

  async getCategoryByName(categoryName: string) {
    return this.Category.findOne({ name: categoryName });
  }

  async updateCategoryById(
    categoryId: string,
    categoryFields: PatchCategoryDto | PutCategoryDto
  ) {
    const existingCategory = await this.Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: categoryFields },
      { new: true }
    );
    console.log(`existingCategory`, existingCategory);
    return existingCategory;
  }

  async removeProductFromCategory(categoryId: string, productId: string) {
    return this.Category.updateOne(
      { _id: categoryId },
      { $pull: { products: productId } }
    );
  }

  async addProductToCategory(categoryId: string, productId: string) {
    return this.Category.updateOne(
      { _id: categoryId },
      { $addToSet: { products: productId } }
    );
  }
}

export default new CategoriesDao();

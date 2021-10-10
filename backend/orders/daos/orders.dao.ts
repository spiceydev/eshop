import mongooseService from '../../common/services/mongoose.service';

class OrdersDao {
  Schema = mongooseService.getMongoose().Schema;

  orderSchema = new this.Schema({
    orderItems: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: this.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    shippingAddress1: {
      type: String,
      required: true,
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: this.Schema.Types.ObjectId,
      ref: 'User',
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  });

  Order = mongooseService.getMongoose().model('Orders', this.orderSchema);

  async getOrders(limit: number, page: number, userId: string) {
    return await this.Order.find({ user: userId })
      .populate('user')
      .populate('product')
      .exec();
  }
}

export default new OrdersDao();

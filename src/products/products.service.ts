import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(prodId: string) {
    let product;
    try {
      product = await this.productModel.findById(prodId);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }

    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }

    return product.save();
  }

  async deleteProduct(prodId: string) {
  const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if(result.deletedCount===0){
      throw new NotFoundException('Could not find product');
    }
  }
}

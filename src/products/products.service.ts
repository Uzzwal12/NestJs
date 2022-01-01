import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.products.find((prod) => prod.id === prodId);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = this.products.find((prod) => prod.id === productId);
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productId,
    );
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

   return this.products[productIndex] = updatedProduct;
  }

  deleteProduct(prodId:string){
    const productIndex = this.products.findIndex((product)=>product.id===prodId)
    this.products.splice(productIndex,1)
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProducts(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedId };
  }
  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    return this.productsService.updateProduct(
      prodId,
      productTitle,
      productDescription,
      productPrice,
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}

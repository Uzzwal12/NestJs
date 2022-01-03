import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = process.env.DB_URL
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(dbUrl)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

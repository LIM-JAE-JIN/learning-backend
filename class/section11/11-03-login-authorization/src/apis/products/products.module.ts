import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productsTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag]),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductsSaleslocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productsSaleslocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocationInput } from './dto/product-saleslocation.input';
import { IProductSaleslocationCreate } from './interfaces/products-saleslocation.service.interface';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({
    productSaleslocation,
  }: IProductSaleslocationCreate): Promise<ProductSaleslocationInput> {
    return this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}

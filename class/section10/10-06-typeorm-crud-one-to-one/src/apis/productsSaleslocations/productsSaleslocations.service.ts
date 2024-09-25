import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productsSaleslocation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ productSaleslocation }) {
    return this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServieceCreate,
  IProductsServiceFindOne,
} from './interfaces/products.service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });
  }

  create({ createProductInput }: IProductsServieceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
    });
    // result = {
    //   id: 'sdkljflksdfj-fskldfj',
    //   name: '마우스',
    //   description: "좋은 마우스",
    //   price: 3000,
    //   ...
    // }

    return result;
  }
}

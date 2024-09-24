import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServieceCreate,
  IProductsServiceFindOne,
  IProductServiceUpdate,
  IProductServiceCheckSoldout,
  IProductServiceDelete,
} from './interfaces/products.service.interface';
import { Interface } from 'readline';

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

  // 1. checkSoldout을 함수로 만든 이유 => 수정, 삭제 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
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

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    // 기존 있는 내용 재사용으로 로직 통일
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 로직 구현
    this.checkSoldout({ product });

    // this.productsRepository.create(); // DB접속이랑 관련 없음. 등록을 위해 빈 껍데기 객체를 만들기 위함.
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정

    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
      ...updateProductInput,
    });
    return result;
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. 데이터 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt
    // this.productsRepository.update({ id: productId }, { deleteAt: new Date() });

    // 4. 소프트 삭제(typeORM) - softRemove
    // 단점: id로만 삭제 가능
    // 장점: 여러 ID 한번에 지우기 가능
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(typeORM) - softDelete
    // 단점: 여러 ID 한번에 지우기 불가능
    // 장점: 다른 컬럼으로도 삭제 가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServieceCreate,
  IProductsServiceFindOne,
  IProductServiceUpdate,
  IProductServiceCheckSoldout,
  IProductServiceDelete,
} from './interfaces/products.service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'prductCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id: productId,
      },
      relations: ['productSaleslocation', 'prductCategory'],
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

  async create({
    createProductInput,
  }: IProductsServieceCreate): Promise<Product> {
    // 1. 상품 테이블만 등록할 때
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // });
    // result = {
    //   id: 'sdkljflksdfj-fskldfj',
    //   name: '마우스',
    //   description: "좋은 마우스",
    //   price: 3000,
    //   ...
    // }

    // 2. 상품과 상품거래위치 테이블 같이 등록
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    // 서비스를 타고 가야하는 이유?
    // 레파지토리에 직접 접근하면 검증 로직을 통일 시킬 수 없음
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    });

    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
        // name도 받고 싶을 경우
        // => createProductInput에 name까지 포함해서 받아오기
      },
      // 직접 나열하는 방식
      // name: product:name,
      // description: product.description,
      // price: product.price,
      // productSaleslocation: {
      //   id: result.id
      // }
    });

    return result2;
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

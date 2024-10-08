import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServieceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductServiceCheckSoldout {
  product: Product;
}

export interface IProductServiceDelete {
  productId: string;
}

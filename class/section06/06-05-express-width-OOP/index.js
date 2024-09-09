import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매 API
app.post('/products/buy', (req, res) => {
  // 1. 가진 돈 검증코드
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  // 2. 판매여부 검증코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  // 3. 상품 구매코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매 완료");
  }
});

// 상품 환불 API
app.post('/product/refund', (req, res) => {
  // 1. 판매여부 검증코드
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  // 2. 상품 환불코드
  if (isSoldout) {
    res.send("상품 환불 완료");
  }
});

app.listen(3000);
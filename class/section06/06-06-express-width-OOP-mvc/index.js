import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js"

const app = express();

// 상품 API
const productController = new ProductController();
app.post('/products/buy', productController.buyProduct); // 상품 구매 API
app.post('/product/refund', productController.refuncProduct); // 상품 환불 API

// 게시판 API
// app.get("/boards/...")

app.listen(3000);
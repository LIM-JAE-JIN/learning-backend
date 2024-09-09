import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js"
import { CouponController } from "./mvc/controllers/coupon.controller.js"
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js"

const app = express();

// 의존성 주입으로 발생하는 장점
// 1. new 한번으로 모든 곳에서 재사용 가능(싱글톤패턴)
// 2. 의존성 주입으로 서비스로직 한꺼번에 변경 가능(안전성)

// [부가설명]
// 1. ProductController가 CashService에 의존하고 있음 (CashService => 의존성)
//    => 강하게 결합되어 있음 - tight-coupling

// 2. 이를 개선하기 위해 느슨한 결합으로 변경할 필요가 있음
//    => loose-coupling
//    => 이를 "의존성 주입"으로 해결 (의존성 주입 - Dependency-Injection(DI))
//    => 이 역할을 대신 해주는 NestJS 기능 = 제어역전(IoC: Inversion-of-Control) 컨테이너 (알아서 new해서 넣어줌 -> 의존성주입(DI)을 해줌)

// 3. "의존성주입"으로 싱글톤패턴 구현 가능해짐
//    => "의존성주입"이면, "싱글톤패턴"인가? 그건 아님!
const productService = new ProductService();
const cashService = new CashService();
const pointService = new PointService();

// 상품 API
const productController = new ProductController(cashService, productService);
app.post('/products/buy', productController.buyProduct); // 상품 구매 API
app.post('/products/refund', productController.refuncProduct); // 상품 환불 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 상품권 구매 API

// 게시판 API
// app.get("/boards/...")

app.listen(3000);
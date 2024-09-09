export class CouponController {
  cashService;

  constructor(cashService) {
    this.cashService = cashService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진 돈 검증 코드
    // const cashService = new CashService(); // 강한결합(tight-coupling)
    const hasMoney = this.cashService.checkValue();

    // 2. 상품권 구매 코드
    if (hasMoney) {
      res.send("상품권 구매 완료!");
    }
  }
}
// const express = require('express') // commonjs
import express from "express"; // module, export default 가져오기
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // export 가져오기
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(express.json()); // 이전은 bodyParser
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목입니다", contents: "내용입니다만" },
    { number: 2, writer: "영희", title: "영희입니다", contents: "영희입니다만" },
    { number: 3, writer: "훈이", title: "훈이입니다", contents: "훈이입니다만" }
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)
  res.send(result);
});

app.post('/boards', function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인
  console.log('req', req);
  console.log('req.body', req.body);

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response)
  res.send('게시물 등록에 성공하였습니다.');
});

app.post('/tokens/phone', function (req, res) {
  // 1. 휴대폰번호 자릿 수 맞는지 확인 (10~11자리)
  const pNum = req.body.phoneNumber;
  const isValid = checkPhone(pNum);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 생성
  const token = getToken();

  // 3. 핸드폰번호에 토큰 전송
  sendTokenToSMS(pNum, token);

  res.send("전송완료");
})

app.listen(3000);
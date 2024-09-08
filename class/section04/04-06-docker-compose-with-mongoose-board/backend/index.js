// const express = require('express') // commonjs
import express from "express"; // module, export default 가져오기
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // export 가져오기
import { checkEmail, getWelcomeTemplate, sendTemplate } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

const app = express();
app.use(express.json()); // 이전은 bodyParser
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', async function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // const result = [
  //   { number: 1, writer: "철수", title: "제목입니다", contents: "내용입니다만" },
  //   { number: 2, writer: "영희", title: "영희입니다", contents: "영희입니다만" },
  //   { number: 3, writer: "훈이", title: "훈이입니다", contents: "훈이입니다만" }
  // ];
  const result = await Board.find();

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)
  res.send(result);
});

app.post('/boards', async function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인
  console.log('req', req);
  console.log('req.body', req.body);

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })
  await board.save();

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

  res.send("인증 완료");
});

app.post('/users', function (req, res) {
  const { name, age, school, email } = req.body;

  // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@"포함여부)
  const isEmail = checkEmail(email);
  if (isEmail === false) return;

  // 2. 가입환영 템플릿
  const template = getWelcomeTemplate({ name, age, school });

  // 3. 이메일 가입환영 템플릿 전송
  sendTemplate(email, template);

  res.send("이메일 전송 완료");
});

mongoose.connect("mongodb://database:27017/docker")
  .then(() => console.log('DB접속 성공'))
  .catch(() => console.log('DB접속 실패'))

app.listen(3000);
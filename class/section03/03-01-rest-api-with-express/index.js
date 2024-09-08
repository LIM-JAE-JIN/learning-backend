// const express = require('express') // commonjs
import express from "express"; // module

const app = express();

app.get('/qqq', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
// commit 확인용

//꼭 풀어야 한다!
// require('./models/sync')(); 
require('dotenv').config();

const express = require('express');
const morgan = require('morgan'); //Morgan은 Node.js Express 애플리케이션에서 사용하는 HTTP 요청 로깅 미들웨어입니다.
const port = process.env.PORT || 3000;
const app = express();

const memberRouter = require('./routers/memberRouter');
const saleRouter = require('./routers/saleRouter');
const imageRouter = require('./routers/imageRouter');
const authorization = require('./routers/authorization');
const errorHandler = require('./routers/errorHandler');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/sales', authorization);
app.use('/sales', saleRouter);
app.use('/members', memberRouter);
app.use('/members', errorHandler);

// app.use('/images', imageRouter);
app.use((_, res) => {
  res.status(404).json({
    message: '존재하지 않은 API입니다. path와 method를 확인하십시오.',
  });
});
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

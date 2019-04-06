let express = require('express');
let body = require('body-parser'); // 여러 본문 유형과 압축을 지원하는 body-parser module
let route = express.Router();
let app = express();
let stack = [];

app.use(body.text({ type: '*/*' }));

route.post('/stack', (req, res, next) => {
  stack.push(req.body);

  return next();
});

route.delete('/stack', (req, res, next) => {
  stack.pop();

  return next();
});

route.get('/stack/:index', (req, res) => {
  if (req.params.index >= 0 && req.params.index < stack.length) {
    return res.end('' + stack[req.params.index]);
  }
  res.status(404).end();
});

app.use('/stack', route);

app.listen(3000);

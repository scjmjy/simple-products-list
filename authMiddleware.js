const jwt = require('jsonwebtoken');

const APP_SECRET = 'myappsecret';
const USERNAME = 'admin';
const PASSWORD = 'secret';

function requireAuth( url, method ) {
  if ( (((url.startsWith('/api/products') || url.startsWith('/products')) || (url.startsWith('/api/categories') || url.startsWith('/categories')))
            && method != 'GET')
      || (( url.startsWith('/api/orders') || url.startsWith('/orders') ) 
            && method != 'POST' ) ) {
    return true;
  } else {
    return false;
  }
}

module.exports = function (req, res, next) {
  if ((req.url == '/api/login' || req.url == '/login') && req.method == 'POST') {
    if (req.body != null && req.body.name == USERNAME && req.body.password == PASSWORD) {
      let token = jwt.sign( { data: USERNAME, expiresIn: '1h' }, APP_SECRET );
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false });
    }
    res.end();
    return;
  } else if( requireAuth( req.url, req.method ) ) {
    let token = req.headers['authorization'];
    if (token != null && token.startsWith('Bearer<')) {
      token = token.substring(7, token.length-1); 

      try {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      } catch (error) {
        
      }
    }

    res.statusCode = 401;
    res.end();
    return;
  }
  next();
}


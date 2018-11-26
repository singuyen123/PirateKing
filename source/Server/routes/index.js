var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res) {
  res.sendfile(dirname+'/PirateKing/source/html/signin.html');
});
router.get('/play', function (req, res) {
  res.sendfile(dirname+'/PirateKing/source/html/index.html');
});
//app.listen(3000, function () {
  //console.log('Example app listening on port 3000!')
//})

router.post('/submit', function (req, res) {
  checkLoginAccount(username, pass, function (result) {
      if (result) {
          res.redirect('/play');
      }else{
        res.sendfile(dirname+'/PirateKing/source/html/signin_wrong.html')
      }
  });
});

function checkLoginAccount(username, password, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
      assert.equal(null, err);

      var querryObj = { 'username': username };

      db.collection("user").findOne(querryObj, function (err, result) {
          assert.equal(null, err);

          if ((result) && (result.pass == password)) {
              callback(true);
          } else {
              callback(false);
          }

          db.close();
      });
  });
}


module.exports = router;

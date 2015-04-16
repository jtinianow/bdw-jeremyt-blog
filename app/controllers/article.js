var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  posts = require('../../config/posts');

module.exports = function (app) {
  app.use('/article', router);
};

// localhost:3000/article/
router.get('/', function (req, res, next) {

    // console.log('posts: ', posts);

    Article.find( function(err, articles){
        if(err) return next(err);
        res.render('article/list', {
          title: 'Jerms',
          articles: articles
        });

    });

});

// localhost:3000/article/:id
router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  Article.findOne({ _id: id }, function (err, post) {
    if (err) return next(err);
    // res.json(post);
    res.render('article/show', {
      articles: post
    });
  });
});

// localhost:3000/article/:id/edit
router.get("/:id/edit", function(req, res, next) {
  var id = req.params.id;
  Article.findOne({ _id: id }, function (err, edit) {
    if (err) return next(err);
    res.render('article/edit', {
      articles: edit
    });
  });
});

// localhost:3000/article/:id/update
router.post('/:id/update', function (req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  Article.findOne({_id: id}, function (err, p) {
    if (err) {
      res.send('error');
    } else {
      Article.findOneAndUpdate({_id: id}, {title: title, description: description}, function (err, update) {
        if (err) {
          res.send('error');
        } else {
          Article.findOne({_id: id}, function (err, post) {
            if (err) return next(err);
            res.render('article/show', {
              articles: post
            });
          });
        }
      });
    }
  });
});




// INFO: hitting localhost:3000/article/bootstrap will push posts into MongoLab
// router.get('/bootstrap', function (req, res, next) {

//     Article.create(posts.posts, function(err, articles){
//       if(err) return next(err);
//       res.send(articles);

//     });

// });

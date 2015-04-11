var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  posts = require('../../config/posts');

module.exports = function (app) {
  app.use('/article', router);
};

// Get list of all articles
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

// Get a single post by it's id
router.get("/:id", function(req, res, next) {
  Article.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    // res.json(post);
    res.render('article/article', {
      articles: post
    });
  });
});


// INFO: hitting localhost:3000/article/bootstrap will push posts into MongoLab
// router.get('/bootstrap', function (req, res, next) {

//     Article.create(posts.posts, function(err, articles){
//       if(err) return next(err);
//       res.send(articles);

//     });

// });

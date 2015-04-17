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

    // find all the articles in mongo db

    Article.find( function(err, articles){

        res.render('article/list', {
          title: 'Jerms',
          articles: articles // return all the articles to list.swig
        });

    });

});

// localhost:3000/article/:id - show the article
router.get("/:id", function(req, res, next) {

  var id = req.params.id;

  // find all the articles in mongo db
  Article.findOne({ _id: id }, function (err, article) {

    res.render('article/show', {
      title: 'Jerms',
      article: article // return the article to show.swig
    });
  });
});

// localhost:3000/article/:id/edit
router.get("/:id/edit", function(req, res, next) {

  var id = req.params.id;

  // find all the articles in mongo db
  Article.findOne({ _id: id }, function (err, article) {

    res.render('article/edit', {
      title: 'Jerms',
      article: article // return the article to edit.swig
    });
  });
});

// localhost:3000/article/:id/update
router.post('/:id', function (req, res) {

  var id = req.params.id;
  console.log(req.body);

  Article.findOneAndUpdate({_id: id}, req.body, function (err, article) {
    console.log(article);
    if(err) return next(err);
    res.redirect('/article/' + article._id);
    
  });
});




// INFO: hitting localhost:3000/article/bootstrap will push posts into MongoLab
// router.get('/bootstrap', function (req, res, next) {

//     Article.create(posts.posts, function(err, articles){
//       if(err) return next(err);
//       res.send(articles);

//     });

// });

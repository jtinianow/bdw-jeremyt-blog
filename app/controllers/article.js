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

    Article.find().sort({'createdAt': -1}).exec( function(err, articles){

        res.render('article/list', {
          title: 'Jerms',
          articles: articles // return all the articles to list.swig
        });

    });



});


// localhost:3000/article/create/new
router.get('/create', function (req, res, next) {
  res.render('article/create', {
      title: 'Jerms',
      article: new Article({}) //create an empty Article object
  });
});

// localhost:3000/article/create/new - post
router.post('/create', function (req, res, next) {

  var data = {
    title: req.body.title,
    description: req.body.description
  };

  // add new article to mongo db
  Article.create(data, function (err, article) {
    if (err) return next(err);
    res.redirect('/article');
  });
});


// localhost:3000/article/:id - show the article
router.get("/:id", function(req, res, next) {

  var id = req.params.id;

  // find all the articles in mongo db
  Article.findOne({ _id: id }, function (err, article) {
    if (req.user) { 
      res.render('article/show-edit', {
        title: 'Jerms',
        article: article // return the article to show.swig
      });
    } else { 
      res.render('article/show', {
        title: 'Jerms',
        article: article // return the article to show.swig
      });
    }


  });
});

// localhost:3000/article/:id/edit
// router.get("/:id/edit", function(req, res, next) {

//   var id = req.params.id;

//   // find all the articles in mongo db
//   Article.findOne({ _id: id }, function (err, article) {

//     res.render('article/edit', {
//       title: 'Jerms',
//       article: article // return the article to edit.swig
//     });
//   });
// });

router.get("/:id/edit", function (req, res, next) {

  var id = req.params.id;

  if (req.user) {
    Article.findOne({ _id: id }, function (err, article) {

      res.render('article/edit', {
        title: 'Jerms',
        article: article // return the article to edit.swig
      });
    });
  } else {
    res.redirect('/');
  }
});

// localhost:3000/article/:id/update
router.post('/:id', function (req, res, next) {

  var id = req.params.id;

  var data = {
    title: req.params.title,
    description: req.params.description
  };

  console.log(req.body);

  Article.findOneAndUpdate({_id: id}, req.body, function (err, article) {
    console.log(article);
    if(err) return next(err);
    res.redirect('/article/' + article._id);
    
  });
});

// localhost:3000/article/:id/delete
router.post('/:id/delete', function (req, res, next) {

  var id = req.params.id;

  Article.remove({_id: id}, function (err, article) {
    if(err) return next(err);
    res.redirect('/article')
  });
});



// INFO: hitting localhost:3000/article/bootstrap will push posts into MongoLab
// router.get('/bootstrap', function (req, res, next) {

//     Article.create(posts.posts, function(err, articles){
//       if(err) return next(err);
//       res.send(articles);

//     });

// });

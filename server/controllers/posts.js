const Post = require('../models/post');


exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts = [];

  if(pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
      .sort('-createdAt');
  }

  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'Sent Posts Success',
      posts: fetchedPosts,
      maxPosts: count
    });
  }).catch(error => {
    res.status(500).json({ message: error.message });
  });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        // console.log('Post missing');
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

exports.createPost = (req, res, next) => {
  const post =  new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: '/images/posts/' + req.file.filename,
    user: req.userData.userId
  });

  post.save().then(result => {
    res.status(201).json({
      message: 'Success',
      postId: result._id,
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        createdAt: result.createdAt,
        imagePath: result.imagePath
      }
    });
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    imagePath = '/images/posts/' + req.file.filename;
  }

  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    user: req.userData.userId
  });

  delete post.createdAt; // do not update the date

  Post.updateOne({_id: req.params.id, user: req.userData.userId}, post).then(result => {
    if(result.n > 0) {
      res.status(200).json({ message: 'Update Successful' });
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({_id: req.params.id, user: req.userData.userId}).then(result => {
    if(result.n > 0) {
      res.status(200).json({ message: 'Post Deleted' });
    } else {
      res.status(401).json({ message: 'Not Authorized' });
    }
  })
  .catch(err => {
    res.status(200).json({ message: 'Failed to delete Post' });
  });
};



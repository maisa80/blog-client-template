const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
    // Post.find()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(error => {
    //     res.json({message: error});
    // });
                    
    try {
        res.json(await Post.find());
    } catch(error) {
        res.json({message: error});
    }
});

// GET specific posts
// router.get('/specific', (req, res) => {
//     res.send('Specific posts');
// });

router.get('/:postId', async (req, res) => {
    // res.send(req.params.postId);

    try {
        res.json(await Post.findById(req.params.postId));
    } catch(error) {
        res.json({message: error});
    }
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: req.body.image,
        tags: req.body.tags
    });

    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(error => {
    //     res.json({message: error});
    // })


    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(error) {
        res.json({message: error});
    }
});

// Delete post
router.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await Post.deleteOne({_id : req.params.postId});
        res.json(deletedPost);
    } catch(error) {
        res.json({message: error});
    }
});

// Update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id : req.params.postId}, 
            {$set: { 
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                    image: req.body.image,
                    tags: req.body.tags
                }
            }
        );
        res.json(updatedPost);
    } catch(error) {
        res.json({message: error});
    }
});

module.exports = router;
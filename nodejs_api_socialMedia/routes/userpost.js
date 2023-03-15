const router = require("express").Router();
const Userpost = require("../models/userposts");
const User = require("../models/user");
const Post = require("../models/userposts");
const { json } = require("express");
const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "da82eybwn",
//   api_key: "237953862418852",
//   api_secret: "1kYg1c5K0IUyoj-UZVXa2akWt-8",
//   secure: true,
// });
// router.post("/create", async (req, res) => {
//   const Post = new Userpost(req.body);
//   try {
//     const savenewpost = await Post.save();
//     res.send(savenewpost);
//   } catch (err) {
//     res.send(err);
//   }
// });

router.put("/update/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      post = new Post(req.body);
      await post.save();
      res.send("the post has been updated");
    } else {
      res.send("you can update only your post");
    }
  } catch (err) {
    res.send(err);
  }
});
router.put("/create", async (req, res) => {
  // console.log(req.body);
  // const file = req.body.photo; //input type file ka name = photo_post
  // cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
  // console.log(result);
  const post = new Post({
    userId: req.body.userId,
    desc: req.body.desc,
    img: req.body.posturl,
    likes: [],
  });
  try {
    await post.save();
    res.send("successFully uploaded and saved");
  } catch (err) {
    console.log(err.message);
  }
});
// });

router.delete("/delete/:id", async (req, res) => {
  try {
    const objid = new Mongo.ObjectID(req.params.id);
    const post = await Post.findById(objid);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.send("the post has been deleted");
    } else {
      res.send("you can delete only your post");
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/allPostWithUser", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followinzgs.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/myallPosts", async (req, res) => {
  // const post = await Post.find({}, (err, data) => {
  let x = "";
  const posts = await Post.find();
  if (posts) {
    // const data = posts.map(async (post) => {
    //   let usr = await User.findById(post.userId);
    //   x = usr.name;
    //   console.log(x);
    //   return {
    //     userName:  x
    //   }
    // });
    let data = [];
    for (let i = 0; i < posts.length; i++) {
      const x = await User.findById(posts[i].userId);
      // console.log(x.name);

      data.push({
        id: posts[i]._id,
        userImg : x.profilePicture,
        userId : posts[i].userId,
        username: x.name, 
        img: posts[i].img, 
        likes: posts[i].likes.length, 
        desc: posts[i].desc,
        
        isLiked: (posts[i].likes.includes(posts[i].userId)) ? 1 : 0, 
        date: posts[i].createdAt
      });
    }
    res.json(data);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.id });
    

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/postById/:id', async (req, res) => {
  const posts = await Post.findById(req.params.id);
  res.json(posts);
  // console.log(posts)
})
module.exports = router;

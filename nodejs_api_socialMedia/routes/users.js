const user = require("../models/user");
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
router.put("/update/profilepic/:userid", async (req, res) => {
 try{
const user = await User.findById(req.params.userid);
if (user && req.body.userId == req.params.userid) {
  user.profilePicture = req.body.imageurl;
  await user.save();
  res.send("profile pic updated");
} else res.send("user not found");
  }catch(e){
    console.log(e);

 
  }
});
router.put("/update/:userid", async (req, res) => {
  try {
    if (req.body.userid === req.params.userid || req.body.isAdmin) {
      if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, 12);
      const updateresult = await User.findByIdAndUpdate(req.params.userid, {
        $set: req.body,
      });
      if (updateresult) res.send("updated successfully");
      else res.send("not updated");
    }
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete/:userid", async (req, res) => {
  try {
    if (req.body.userid === req.params.userid || req.body.isAdmin) {
      const delteresult = await User.findByIdAndDelete(req.params.userid);
      if (!delteresult) res.send("not deleted");
      else res.send("deleted successfully");
    } else res.send("you can delete only your account");
  } catch (e) {
    console.log(e);
  }
});

router.get("/find/:userid", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
    if (!user) res.send("no user found ");
  } catch (e) {
    res.send("No User Found");
  }
});

router.put("/follow/:userid", async (req, res) => {
  if (req.body.userId !== req.params.userid) {
    try {
      const user = await User.findById(req.params.userid);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followinzgs: req.params.userid },
        });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});


router.put("/unfollow/:userid", async (req, res) => {
  if (req.body.userId !== req.params.userid) {
    try {
      const user = await User.findById(req.params.userid);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        user.followers = user.followers.filter((id) => id != req.body.userId);
        currentUser.followinzgs = currentUser.followinzgs.filter(
          (id) => id != req.params.userid
        );
        await user.save();
        await currentUser.save();
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});
router.get('/friends/:userid', async (req, res) => {
  try {
    console.log(req.params.userid)
    const x = await User.findById(req.params.userid);
console.log(x)
    let result = [];
   let frnds = x.followers; 
  frnds = [ ...frnds,...x.followinzgs];
for(let i  = 0; i < frnds.length; i++){
  const user = await User.findById(frnds[i]);
  const { password, updatedAt, ...other } = user._doc;
 let frind = other;
  result.push({
    name : frind.name,
    id : frind._id,
    profilePicture : frind.profilePicture
  });
  console.log(frind)
}
res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

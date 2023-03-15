const router = require("express").Router();
const Conversation = require("../models/Conversation");
const axios = require("axios");
// create new conversation
router.post("/searchandcreate", async (req, res) => {
  const senderId = req.body.senderId;
  receiverId = req.body.receiverId;
 //if conversation already exists then return that conversation else create new conversation
  try {
    const conversation_user = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (conversation_user) {
      res.status(200).json(conversation_user);
    } else {
      const newCon = new Conversation({
        members: [senderId, receiverId],
      });
      try {
        const savedCon = await newCon.save();
        res.status(200).json(savedCon);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/new", async (req, res) => {
  let a = [];
  a.push(req.body.senderId);
  a.push(req.body.receiverId);
  const newCon = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedCon = await newCon.save();
    res.status(200).json(savedCon);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get conversation of a user if members array contains userId in any index of array
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const conversation_user = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation_user);
  } catch (e) {
    console.log(e);
  }
});
// find conversation of two users if members array contains both usersId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  const firstUserId = req.params.firstUserId;
  const secondUserId = req.params.secondUserId;
  try {
    const conversation_user = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    if (conversation_user.length > 0) res.status(200).json(conversation_user);
  } catch (e) {
    console.log(e);
  }
});
router.get('/getconversation/:conversationId', async (req, res) => {
  const conversationId = req.params.conversationId;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.status(200).json(conversation);
  } catch (e) {
    console.log(e);
  }
});

router.get("/Allconversation/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversation_user = await Conversation.find({
      members: { $in: [userId] },
    });
    let arr = [];

    for (let i = 0; i < conversation_user.length; i++) {
      let a = conversation_user[i].members;
      let b = a.filter((item) => {
        return item != userId;
      });
      const x = await axios.get(`http://localhost:3000/api/users/find/${b[0]}`);
      const y = x.data;
      if (y)
        arr.push({
          name: y.name,
          profilePicture: y.profilePicture,
          conversationId: conversation_user[i]._id,
        });
      console.log(y);
    }
    function removeDuplicates(arr) {
      return [...new Set(arr)];
    }
    arr = removeDuplicates(arr);
    res.json(arr);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

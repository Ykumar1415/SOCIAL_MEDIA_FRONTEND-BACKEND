const router = require("express").Router(); 
const Conversation = require("../models/Conversation");

// create new conversation
router.post('/new', async(req, res)=>{
    let a = [] ; 
    a.push(req.body.senderId);
    a.push(req.body.receiverId);
    const newCon = new Conversation({
        members:a
    });
    try{
        const savedCon = await newCon.save();
        res.status(200).json(savedCon);
    }catch(err){
        res.status(500).json(err);
    }
})
// get conversation of a user if members array contains userId in any index of array
router.get('/:userId', async(req, res)=>{
    const userId = req.params.userId; 
    console.log(userId)
    try{
        const conversation_user = await Conversation.find({
            members:{$in:[userId]}
        })
        res.status(200).json(conversation_user)
    }
    catch(e){
        console.log(e) 
    }
})
// find conversation of two users if members array contains both usersId 
router.get('/find/:firstUserId/:secondUserId', async(req, res)=>{
    const firstUserId = req.params.firstUserId; 
    const secondUserId = req.params.secondUserId; 
    try{
        const conversation_user = await Conversation.findOne({
            members:{$all:[firstUserId, secondUserId]}
        })
        res.status(200).json(conversation_user)
    }
    catch(e){
        console.log(e) 
    }
})

module.exports =  router;
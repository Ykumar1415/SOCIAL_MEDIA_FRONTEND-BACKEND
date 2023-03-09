const router = require('express').Router(); 
const Message = require('../models/Message')
// create new message
router.post('/newMsg', async (req, res)=>{
const newmsg = new Message({
    text:req.body.text, 
    sender: req.body.sender,
    conversationId : req.body.conversationId
})

try{
   const savedmsg =  await newmsg.save(); 
   res.status(200).json(savedmsg)
}
catch(e){
console.log(e)
}


})
// get all messages using conversation id 
router.get('/:conversationId', async (req,res)=>{
    try{
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        res.status(200).json(messages)

    }
    catch(e){
        res.json(error)
        console.log(e)
    }
})





module.exports = router ; 
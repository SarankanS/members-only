
const db = require("../models/message.js");


async function createMessage(req, res){
    try{
        const {title, content} = req.body;
        await db.createMessage(title,content, req.user.id)
        res.redirect('/');

    }catch(err){
        console.error(err);
        res.status(500).send('Error creating message')
    }
}

async function renderMessageForm(req, res) {
    res.render("message", {title: "Create Message"});
}

module.exports = {
    createMessage,
    renderMessageForm,
}
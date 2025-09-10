const db = require('../models/message'); 
async function renderHome(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; 
  const offset = (page - 1) * limit;

  try {
    const messages = await db.getMessages(limit, offset); 
    const totalMessages = await db.getMessageCount();
    const totalPages = Math.ceil(totalMessages / limit);

    res.render('home', {
      title: 'Members Only',
      messages,
      currentUser: req.user || null,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading messages');
  }
}


module.exports = { renderHome };
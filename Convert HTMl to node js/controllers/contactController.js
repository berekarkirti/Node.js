const Contact = require('../models/contact');

function getContactPage(req, res) {
    res.render('contact');
}

async function postContactForm(req, res) 
{
    try 
    {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.redirect('/');
    } 
    catch (error) 
    {
        res.status(500).send('Server Error');
    }
}


module.exports = { getContactPage, postContactForm };

const fs = require('fs');

function addID(req, res, next) 
{
    fs.readFile('./db.json', 'utf8', (err, data) => 
    {
        if (err) 
        {
            return res.status(500).json({ error: 'Failed to read database' });
        }

        const db = JSON.parse(data);
        const heroes = db.heroes;
        const newID = heroes.length ? heroes[heroes.length - 1].id + 1 : 1;

        req.body.id = newID;
        next();
    });
}

module.exports = addID;
const express = require('express');
const fs = require('fs');
const addID = require('./middleware/addID');
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);

app.get('/heroes', (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read database' });
        
        const db = JSON.parse(data);
        res.json(db.heroes);
    });
});


app.post('/add/hero', addID, (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read database' });

        const db = JSON.parse(data);
        db.heroes.push(req.body);

        fs.writeFile('./db.json', JSON.stringify(db), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write to database' });
            res.json(db.heroes);
        });
    });
});


app.patch('/update/villain/:hero_id', (req, res) => {
    const { hero_id } = req.params;
    const newVillain = req.body;

    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read database' });

        const db = JSON.parse(data);
        const hero = db.heroes.find(hero => hero.id === parseInt(hero_id));

        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        hero.villains.push(newVillain);

        fs.writeFile('./db.json', JSON.stringify(db), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write to database' });
            res.json(hero);
        });
    });
});


app.delete('/delete/hero/:hero_id', auth, (req, res) => {
    const { hero_id } = req.params;

    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read database' });

        let db = JSON.parse(data);
        const heroIndex = db.heroes.findIndex(hero => hero.id === parseInt(hero_id));

        if (heroIndex === -1) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        db.heroes.splice(heroIndex, 1);

        fs.writeFile('./db.json', JSON.stringify(db), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write to database' });
            res.json(db.heroes);
        });
    });
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();
// app.use('/restaurants/:rid', express.static(path.resolve(__dirname, '../public')));
// console.log('got here');
app.get('/api/restaurants/:rid', (req, res) => {
    db.getMenus(req.params.rid, (err, docs) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.status(200).send(docs);
    });
});

app.get('/', (req, res) => {
  res.send({'hello': 'world'})
  // res.send(db[0]);
})

module.exports = app;
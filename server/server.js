const express = require('express')
const app = express()
const port = 3000
const path = require('path')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// followed https://mongoosejs.com/docs/index.html

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to mongodb!!")
    // we're connected!
});

var itemSchema = new Schema({
  type: String,
  name: String,
  description: String,
  offers: [{description: String, price: String}]
});

var menuSchema = new Schema({
    type: String,
    name: String,
    description: String,
    sections: [],
    items: [itemSchema]
});

var Menu = mongoose.model('Menu', menuSchema);
var Item = mongoose.model('Item', itemSchema);

var testR = new Menu({ 
    type: 'menu', 
    name: 'dinner', 
    description: '', 
    items: [{
      type: 'item', 
      name: 'Oysters', 
      description: 'chefs selection changes frequently',
      offers: [{ description: 'ea', price: '5.50' }, { description: 'ea', price: '4.50' },]
    }, {
        type: 'item',
        name: 'Oysters',
        description: 'chefs selection changes frequently',
        offers: [{ description: 'you will puke', price: '5.50' }, { price: '4.50' },]
      }]
});
console.log(testR.name);
testR.save(function (err){
  if (err) return handleError(err);
  console.log('save successful!')
});

// console.log(testR.items[1].offers[0].description);
var testRA = [];
for (var i = 1; i <= 25; i++) {
  testRA[i] = new Menu({
    type: 'menu'+i,
  })
  testRA[i].save(function (err) {
    if (err) return handleError(err);
    console.log('save successful!')
  });
}

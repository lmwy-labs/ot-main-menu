const mongoose = require('mongoose');
const faker = require('faker');
var Schema = mongoose.Schema;

// followed https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to mongodb!!")
  // we're connected!
});
  
  var itemSchema = new Schema({
    type: String,
    name: String,
    description: String,
    offers: [{ description: String, price: String }]
  });

  var menuSchema = new Schema({
    restaurantId: String,
    type: String,
    name: String,
    description: String,
    sections: [],
    items: [itemSchema]
  });

  var Menu = mongoose.model('Menu', menuSchema);
  var Item = mongoose.model('Item', itemSchema);

  function makeFakeData(quantity) {

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let meals = ['breakfast', 'lunch', 'dinner'];
    // console.log(getRandomInt(3));
    // expected output: 0, 1, or 2

    // 'abc'.padStart(10);         // "       abc"
    // 'abc'.padStart(10, "foo");  // "foofoofabc"
    // 'abc'.padStart(6, "123465"); // "123abc"
    // 'abc'.padStart(8, "0");     // "00000abc"
    // 'abc'.padStart(1);          // "abc"

    var testRA = [];
    for (var rid = 1; rid <= quantity; rid++) {
      console.log('r' + (rid.toString().padStart(3, '0')));
      testRA[rid] = new Menu({
        restaurantId: 'r'+(rid.toString().padStart(3,'0')),
        type: 'menu',
        name: meals[getRandomInt(meals.length)],
        description: '',
        items: [{
                type: 'item',
                // name: 'Oysters',
                name: faker.lorem.words()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '), //makes sentence case words
                description: faker.lorem.sentence(), //makes words with a period.
                offers: [{ description: 'ea', price: faker.commerce.price() }, { description: 'ea', price: faker.commerce.price() },]
            },
            {
                type: 'item',
                // name: 'Oysters',
                name: faker.lorem.words().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                description: faker.lorem.sentence(),
                offers: [{ description: 'ea', price: faker.commerce.price() }, { description: 'ea', price: faker.commerce.price() },]
              }
            ]
          });
          
          testRA[rid].save(function (err) {
            if (err) {
              return handleError(err);
            } 
            console.log('save successful!')
          });
      
    }
  }
  console.log('Im here');
  makeFakeData(100);
  // mongoose.disconnect();

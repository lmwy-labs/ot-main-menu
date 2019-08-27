const mongoose = require('mongoose');

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

const getMenus = (rid, cb) => {
  Menu.find({ restaurantId: rid }, (err, docs) => {
    if (err) {
        cb(err, null);
    } else {
        cb(null, docs);
    }
  })
};

module.exports.getMenus = getMenus;

// makeFakeData(100);
    // function makeFakeData(quantity) {
    
    //     function getRandomInt(max) {
    //         return Math.floor(Math.random() * Math.floor(max));
    //     }
    //     let meals = ['breakfast', 'lunch', 'dinner'];
    //     // console.log(getRandomInt(3));
    //     // expected output: 0, 1, or 2
    
    //     var testRA = [];
    //     for (var i = 1; i <= quantity; i++) {
    //         testRA[i] = new Menu({
    //             type: 'menu',
    //             name: meals[getRandomInt(meals.length)],
    //             description: '',
    //             items: [{
    //                 type: 'item',
    //                 // name: 'Oysters',
    //                 name: faker.lorem.words()
    //                     .split(' ')
    //                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //                     .join(' '), //makes sentence case words
    //                 description: faker.lorem.sentence(), //makes words with a period.
    //                 offers: [{ description: 'ea', price: faker.commerce.price() }, { description: 'ea', price: faker.commerce.price() },]
    //             },
    //             {
    //                 type: 'item',
    //                 // name: 'Oysters',
    //                 name: faker.lorem.words().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    //                 description: faker.lorem.sentence(),
    //                 offers: [{ description: 'ea', price: faker.commerce.price() }, { description: 'ea', price: faker.commerce.price() },]
    //             }
    //             ]
    //         });
    
    
    //         testRA[i].save(function (err) {
    //             if (err) return handleError(err);
    //             console.log('save successful!')
    //         });
    //     }
    // }
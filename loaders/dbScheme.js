
const {MongoClient} = require('mongodb'),
      config = require('../config');
      var Container = require("typedi").Container;
var products = [
    {
        "pId":1,
        "name": 'Milk',
        "price":25,       
        "currency":"rupees",
        "category":"Diary",
        "remainingCount":15
    },
    {
        "pId":2,
        "name": 'Carrot',
        "price":100,        
        "currency":"rupees",
        "category":"Vegtables",
        "remainingCount":0
    },
    {
        "pId":3,
        "name": 'Apple',
        "price":120,
        "currency":"rupees",
        "category":"Fruits",
        "remainingCount":10
    },
    {
        "pId":4,
        "name": 'Oats',
        "price":50,
        "currency":"rupees",
        "category":"Grain",
        "remainingCount":5
    },
    {
        "pId":5,
        "name": 'Orange',
        "price":90,
        "currency":"rupees",
        "category":"Fruit",
        "remainingCount":8
    }

]

module.exports = async()=>{

    const connection = new MongoClient(config.mongoURL)
    
    Container.set("mongoConnection",connection)
    Container.set('products',products)
    return connection;
}

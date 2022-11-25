
const {MongoClient} = require('mongodb'),
      config = require('../config');
      var Container = require("typedi").Container;


module.exports = async()=>{

    const connection = new MongoClient(config.mongoURL)
    
    Container.set("mongoConnection",connection)
    
    return connection;
}

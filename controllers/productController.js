
var Container = require("typedi").Container;
module.exports.listProducts = async()=>{

    return await new Promise((resolve,reject)=>{

        var db = Container.get('mongoConnection').db('OnlinePurchase')
        db.collection('products').aggregate([{$match:{"remainingCount":{$gt:0}}},{$project:{"_id":0}}]).toArray()
        .then((list)=>{
            resolve({"statusCode":200,"response":list})
        })
    })
}
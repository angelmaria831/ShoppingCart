var Container = require("typedi").Container;



module.exports.addItemToCart = async(userId,reqDTO)=>{

    return new Promise((resolve,reject)=>{

        let pId = parseInt(reqDTO.pId);
        var db = Container.get('mongoConnection').db('OnlinePurchase')

        
        db.collection('products').find({"pId":pId}).toArray()
        .then(async(list)=>{
            if(list.length==0) resolve({"statusCode":404,"response":"No such Product Found"})//No such productid
            else if(list[0].remainingCount==0)resolve({"statusCode":404,"response":"Out of Stock"})//No product available
            else{
          
                let cartCount = await db.collection('userCart').find({"userId":userId,"cart.pId":pId}).count(); //check for the cart count with respective userId & pId
                
                if(cartCount==0){
                    await db.collection('userCart').updateOne({"userId":userId},{$addToSet:{"cart":{"pId":pId,"count":1}}}) //push item to cart
                }else{
                    await db.collection('userCart').updateOne( {"userId":userId,"cart.pId":pId},{$inc:{"cart.$.count":1}})//update count(qty) in cart for specified pId
                }

                resolve({"statusCode":200,"response":"Cart Updated Successfully"})
                               
            }
        })


    })
}

module.exports.removeItemFromCart = async(userId,reqDTO)=>{

    return new Promise((resolve,reject)=>{

        let pId = parseInt(reqDTO.pId);
        var db = Container.get('mongoConnection').db('OnlinePurchase')

        db.collection('products').find({"pId":pId}).toArray()
        .then(async(list)=>{
            if(list.length==0) resolve({"statusCode":404,"response":"No such Product Found"})//No such product
            else{
                
                let cartCount = await db.collection('userCart').find({"userId":userId,"cart.pId":pId}).count();

                if(cartCount==0){
                    resolve({"statusCode":404,"response":"No such Product in Cart"})//No such product in cart
                }else{
                    await db.collection('userCart').updateOne( {"userId":userId,"cart.pId":pId},{$pull:{"cart":{"pId":pId}}}) //Remove item from cart
                    resolve({"statusCode":200,"response":"Cart Updated Successfully"})
                }

               
                               
            }
        })


    })
}


module.exports.getUserCartList = async(userId)=>{
    return new Promise((resolve,reject)=>{

        const db = Container.get('mongoConnection').db('OnlinePurchase');

        db.collection('userCart').aggregate([{$match:{"userId":userId}}, {"$unwind":"$cart"},
        {$lookup:{
            "from":"products",
            "localField":"cart.pId",
            "foreignField":"pId",
            "as":"items"
        }},
        {$project:{
            "pId":"$cart.pId",
            "name":{$first:"$items.name"},
            "category":{$first:"$items.category"},
            "count":"$cart.count",
            "price":{$first:"$items.price"},
            "amtToPay": {$multiply:[{$first:"$items.price"},"$cart.count"]}
        }}]
        ).toArray().then((list)=>{
            resolve({"statusCode":200,"response":list})
        })
    })
}
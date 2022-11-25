var Container = require("typedi").Container;



module.exports.addItemToCart = async(userId,reqDTO)=>{

    return new Promise((resolve,reject)=>{

        let pId = parseInt(reqDTO.pId);
        var db = Container.get('mongoConnection').db('OnlinePurchase')

        console.log({userId,pId})
        db.collection('products').find({"pId":pId}).toArray()
        .then(async(list)=>{
            if(list.length==0) resolve({"statusCode":401,"response":"Invalid productId"})//No such productid
            else if(list[0].remainingCount==0)resolve({"statusCode":401,"response":"Out of Stock"})//no product available
            else{
                let cartCount=0
                cartCount = await db.collection('userCart').find({"userId":userId,"cart.pId":pId}).count();
                if(cartCount==0){
                    await db.collection('userCart').updateOne({"userId":userId},{$addToSet:{"cart":{"pId":pId,"count":1}}})
                }else{
                    await db.collection('userCart').updateOne( {"userId":userId,"cart.pId":pId},{$inc:{"cart.$.count":1}})
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

        console.log({userId,pId})
        db.collection('products').find({"pId":pId}).toArray()
        .then(async(list)=>{
            if(list.length==0) resolve({"statusCode":401,"response":"Invalid productId"})//No such product
            else{
                let cartCount=0
                cartCount = await db.collection('userCart').find({"userId":userId,"cart.pId":pId}).count();
                if(cartCount==0){
                    resolve({"statusCode":401,"response":"No such Product in Cart"})
                }else{
                    await db.collection('userCart').updateOne( {"userId":userId,"cart.pId":pId},{$pull:{"cart":{"pId":pId}}})
                    resolve({"statusCode":200,"response":"Cart Updated Successfully"})
                }

               
                               
            }
        })


    })
}


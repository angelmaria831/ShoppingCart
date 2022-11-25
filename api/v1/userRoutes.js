/**
 * 
 * Routes to define user cart related APIs
 * 
 */

 const express = require('express'),
 router = express.Router(),
 userController = require('../../controllers/userController');

 /**
 * 
 * Name : /api/v1/updateCart/:operation/:pId
 * Definition : API to add or remove item to cart
 * Input (params):operation = "add/remove",pId = productId to be added
 * Output : String message of success or failure
 * 
 */

router.patch('/updateCart/:operation/:pId',async(req,res)=>{

    let userId = req.headers.userid;
    let reqDTO = req.params;

    if(reqDTO.operation == "add"){
        await userController.addItemToCart(userId,reqDTO).then((apiresponse)=>{
            res.status(apiresponse.statusCode)
                .send(apiresponse.response)
         })
    }else if(reqDTO.operation == "remove"){
        await userController.removeItemFromCart(userId,reqDTO).then((apiresponse)=>{
            res.status(apiresponse.statusCode)
                .send(apiresponse.response)
         })
    }else res.status().send("Invalid payload")

})



router.get('/getUserCartList',async(req,res)=>{
    let userId = req.headers.userid;
    await userController.getUserCartList(userId).then((apiresponse)=>{
        res.status(apiresponse.statusCode)
        .send(apiresponse.response)
    })
})

module.exports = router;
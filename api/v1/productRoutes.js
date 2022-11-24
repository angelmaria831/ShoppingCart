/**
 * Routes to define all product related APIs
 */
const express = require('express'),
      router = express.Router(),
      productController = require('../../controllers/productController');

/**
 * 
 * Name : /api/v1/listProducts
 * Definition : API to list all products available
 * Input : not required
 * Output : List of products in array
 * 
 */
router.get('/listProducts',async(req,res)=>{
    
    
    await productController.listProducts().then((apiResponse)=>{
        res.status(apiResponse.statusCode)
            .send(apiResponse.response)
    })

})

module.exports = router;
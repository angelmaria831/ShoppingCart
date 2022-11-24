/**
 * Version 1 APIs
 */

const express = require('express'),
      router = express.Router(),
      productRoutes = require('../v1/productRoutes');


router.use(productRoutes);

module.exports = router;
/**
 * Version 1 APIs
 */

const express = require('express'),
      router = express.Router(),
      productRoutes = require('../v1/productRoutes'),
      userRoutes = require('../v1/userRoutes');

router.use(productRoutes);
router.use(userRoutes)

module.exports = router;
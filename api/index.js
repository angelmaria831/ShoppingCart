const express = require('express'),
      router = express.Router(),
      v1 = require('../api/v1');

router.use('/api/v1',v1);

module.exports = router;


const express = require('express');
const router = express.Router();

// import apirouter connect it to the router
const apiRouter = require('./api');

// import spotsRoouter connect it to the router
const spotsRouter = require('./spots');

// import spotsRoouter connect it to the router
const usersRouter = require('./users')



router.use('/api', apiRouter);

router.use('/spots', spotsRouter);

router.use('/users', usersRouter);


router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});






module.exports = router;
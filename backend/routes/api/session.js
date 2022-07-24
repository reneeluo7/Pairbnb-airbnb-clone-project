const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// router.use((req, res, next) => {
//   console.log('something in session')
//   next()
// })

//make a middleware called validateLogin
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Login failed';
      // err.errors = ['Invalid credentials'];
      // console.log(err)
      return next(err);
    }


    const token = await setTokenCookie(res, user);



    const loginUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    }

    return res.json(
      loginUser

    );
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {

      const token = setTokenCookie(res, user);



      const currentUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      };


      return res.json(
        currentUser
      );
    } else return res.json(null);
  }
);




module.exports = router;
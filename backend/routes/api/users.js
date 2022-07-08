const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Validation Middlewares
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),

  // check('username')
  //   .exists({ checkFalsy: false })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),

  handleValidationErrors
];

// Check user
const verifyUser = (req, _res, next) => {

  const requestuserId = req.user.id
  const paramsId = req.params.id

  if (Number(requestuserId) !== Number(paramsId)) {
    const err = new Error('Forbidden');
    err.status = 403;
    next(err)
  }

  next();
}


// to check if the email is been used

const emailExist = async (req, _res, next) => {

  const email = req.body.email;
  const user = await User.findOne({ where: { email } });

  if (user) {
    const err = new Error('User with that email already exists');
    err.status = 403;
    err.errors = {
      "email": "User with that email already exists"
    }
    err.message = "User already exists";
    next(err);
  };
  next();
};



// Sign up
router.post(
  '/',
  validateSignup,

  emailExist,

  async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.signup({ email, firstName, lastName, password });

    const token = await setTokenCookie(res, user);

    const signupUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    };

    return res.json(
      signupUser
    );
  }
);

// get all spots from current user
router.get('/:id/spots',
  requireAuth,
  verifyUser,
  async (req, res) => {

    const spots = await Spot.findAll({
      where: {
        ownerId: req.params.id
      }
    });
    res.json({ spots });
  });

// get all reviews from current user
router.get('/:id/reviews',
  requireAuth,
  verifyUser,
  async (req, res) => {

    const reviews = await Review.findAll({
      where: {
        userId: req.params.id
      },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }, {
        model: Spot,
        attributes: { exclude: ["previewImage", "description", "createdAt", "updatedAt"] }
      }, {
        model: Image,
        attributes: ['url']
      }
      ]
    });
    res.json({ Reviews: reviews });
  });

// get all bookings from current user
router.get('/:id/bookings',
  requireAuth,
  verifyUser,
  async (req, res) => {

    const bookings = await Booking.findAll({
      where: {
        userId: req.params.id
      },
      include: [{
        model: Spot,
        attributes: { exclude: ["description", "createdAt", "updatedAt"] }
      }]
    });
    res.json({ Bookings: bookings });
  });



module.exports = router;
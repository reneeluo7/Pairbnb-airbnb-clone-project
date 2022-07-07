const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');


const { Spot, sequelize, Review, Image, User } = require('../../db/models');




// Get details of a Spot from an id
router.get('/:id', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err)
    };

    const reviews = await spot.getReviews();
    const avgStarRating = reviews.map(el => el.star).reduce((a, b) => a + b, 0) / reviews.length;

    const Owner = await spot.getOwner();

    const allimages = await spot.getImages();
    const images = allimages.map(el => el.url);

    const spotdetail = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        lat: spot.lat,
        lng: spot.lng,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviews.length,
        avgStarRating,
        images,
        Owner
    };
    res.json(spotdetail);

});




//get all spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll();
    res.json({ spots });
});

//Create a Spot
const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Country is required'),
    check('lat')
        .exists()
        .isFloat({min:-90, max:90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .isFloat({min:-180, max:180})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt()
        .withMessage('Description is required'),
    handleValidationErrors
];

router.post('/',
    requireAuth,
    validateCreateSpot,

    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        console.log(req.user)
        const ownerId = req.user.id
        const newspot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })

        res.json(newspot)
    });





module.exports = router;
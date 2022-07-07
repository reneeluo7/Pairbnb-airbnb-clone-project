const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');


const { Spot, sequelize, Review, Image, User } = require('../../db/models');


//Validate Middlewares
// to check if a spot is valid
const validateSpot = async (req, _res, next) => {
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    };
    next();
};
// create spot validation
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
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .isFloat({ min: -180, max: 180 })
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
// to check if manipulate by spot owner
const verifySpotOwner = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const spot = await Spot.findByPk(req.params.id)

    if (Number(requestuserId) !== spot.ownerId) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    };

    next();
};
// create review validation 
const validateCreateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// to check if the review is created by the exist user
const reviewExist = async (req, _res, next) => {
    const userId = req.user.id;
    const spotId = req.params.id;
    const review = await Review.findOne({ where: { userId, spotId } });
    // console.log(review)
    if (review) {
        const err = new Error('User already has a review for this spot');
        err.status = 403;
        next(err);
    };
    next();
};



// Get all Reviews by a Spot's id
router.get('/:id/reviews', validateSpot, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.id
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: Image,
            attributes: ['url']
        }]
    });
    res.json({ Reviews: reviews })
})




// Get details of a Spot from an id
router.get('/:id', validateSpot, async (req, res) => {

    const spot = await Spot.findByPk(req.params.id);

    const reviews = await spot.getReviews();
    const avgStarRating = reviews.map(el => el.stars).reduce((a, b) => a + b, 0) / reviews.length;

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


// Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, validateSpot, reviewExist, validateCreateReview, async (req, res) => {
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spotId = req.params.id;
    const newReview = await Review.create({
        userId, spotId, review, stars
    });
    res.json(newReview);
});



//Create a Spot
router.post('/',
    requireAuth,
    validateCreateSpot,

    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const ownerId = req.user.id;
        const newspot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

        res.json(newspot);
    });






// Edit a Spot
router.put('/:id',
    requireAuth,
    validateSpot,
    verifySpotOwner,
    validateCreateSpot,

    async (req, res) => {
        const updatespot = await Spot.findByPk(req.params.id);
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        updatespot.address = address;
        updatespot.city = city;
        updatespot.state = state;
        updatespot.country = country;
        updatespot.lat = lat;
        updatespot.lng = lng;
        updatespot.name = name;
        updatespot.description = description;
        updatespot.price = price;

        await updatespot.save();

        res.json(updatespot);
    });

// Delete a Spot
router.delete('/:id',
    requireAuth,
    validateSpot,
    verifySpotOwner,

    async (req, res) => {
        const spot = await Spot.findByPk(req.params.id);

        await spot.destroy();

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    });




module.exports = router;
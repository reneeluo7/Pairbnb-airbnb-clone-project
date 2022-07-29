const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, sequelize, Review, Image, User, Booking } = require('../../db/models');
const { Op, where } = require("sequelize");

/* Middlewares */
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
        .isInt({ min: 0 })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

// to check if manipulate by spot owner
const verifySpotOwner = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const spot = await Spot.findByPk(req.params.id)

    if (requestuserId !== spot.ownerId) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    };
    next();
};

// to check if booking by spot owner
const SpotOwnerbooking = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const spot = await Spot.findByPk(req.params.id)

    if (requestuserId == spot.ownerId) {
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
    const review = await Review.findAll({ where: { userId, spotId } });

    if (review.length) {
        const err = new Error('User already has a review for this spot');
        err.status = 403;
        next(err);
    };
    next();
};

// create booking validation
const validateCreateBooking = (req, _res, next) => {
    const { startDate, endDate } = req.body;
    const err = new Error('Validation Error');
    err.status = 400;
    err.errors = {};
    const today = new Date().toISOString().slice(0, 10)
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
        err.errors.startDate = "Valid start date is required";
        err.errors.endDate = "Valid end date is required";
        next(err);
    }
    if (startDate < today) {
        err.errors.startDate = "Start should not be in the past";
        next(err);
    };
    if (startDate > endDate) {
        err.errors.endDate = "endDate cannot come before startDate";
        next(err);
    }
    next();
};

// check booking date
const validBookingDate = async (req, _res, next) => {
    const { startDate, endDate } = req.body;

    const allbookings = await Booking.findAll({
        where: { spotId: req.params.id }
    });

    const err = new Error("Sorry, this spot is already booked for the specified dates");
    err.status = 403;
    err.errors = {};

    for (let booking of allbookings) {
        if ((booking.startDate < endDate && booking.endDate > startDate) || (booking.startDate == startDate && booking.endDate == endDate)) {
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            };
            next(err);
        }
    }
    next();
};

// check query validate
const validQuery = [
    check('page')
        .custom(v => v == undefined || (v >= 0))
        .withMessage('Page must be greater than or equal to 0'),
    check('size')
        .custom(v => v == undefined || (v >= 0))
        .withMessage('Size must be greater than or equal to 0'),
    check('maxLat')
        .custom(v => v == undefined || ( v >= -90 && v <= 90))
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .custom(v => v == undefined || ( v >= -90 && v <= 90))
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .custom(v => v == undefined || ( v >= -180 && v <= 180))
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .custom(v => v == undefined || ( v >= -180 && v <= 180))
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')        
        .custom(v => v == undefined || ( v > 0))
        .withMessage('Minimum price must be greater than 0'),
    check('maxPrice')
        .custom(v => v == undefined || ( v > 0))
        .withMessage('Maximum price must be greater than 0'),
    handleValidationErrors
];


/* GET method route */
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
    res.json({ Reviews: reviews });
});


// Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', validateSpot, async (req, res) => {
    const requestuserId = req.user.id;
    const spot = await Spot.findByPk(req.params.id)
    if (requestuserId !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.id
            },
            attributes: {
                exclude: ["userId", "createdAt", "updatedAt", "id"]
            }
        });
        res.json({ Bookings: bookings });
    };
    const bookings = await Booking.findAll({
        where: { spotId: req.params.id },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    });

    res.json({ Bookings: bookings });

});


// Get details of a Spot from an id
router.get('/:id', validateSpot, async (req, res) => {

    const spot = await Spot.findByPk(req.params.id);

    // const reviews = await spot.getReviews();
    // // console.log(reviews[0].stars)
    // const avgStarRating = reviews.map(el => el.stars).reduce((a, b) => a + b, 0) / reviews.length;

    // const Owner = await spot.getOwner();

    // const allimages = await spot.getImages();
    // const images = allimages.map(el => el.url);
    const stars = await Review.findAll({
        where: { spotId: req.params.id },
        attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']]
    });
    
    const numReviews = await Review.count({
        where:{ spotId: req.params.id }        
    })

    const images = await Image.findAll({
        where:{ spotId: req.params.id },
        attributes: ['url']  
    })

    const owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName'] 
    })       
    
    
    const spotdetail = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,        
        description: spot.description,
        price: spot.price,
        previewImage: spot.previewImage,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews,
        avgStarRating: parseFloat(stars[0].dataValues.avgStarRating),
        images,
        Owners: owner
    };
    res.json(spotdetail);

});


//get all spots
router.get('/', validQuery, async (req, res) => {
    let query = {
        where: {}
    };
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    if (!page || isNaN(page) || page < 0) {
        page = 0;
    };
    if (!size || isNaN(size) || size < 0 || size > 20) {
        size = 20;
    };
    if ( page > 10 ) page = 10;
   
    page = parseInt(page);
    size = parseInt(size);
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    };

    // lat
    if (maxLat && minLat) {
        query.where.lat = { [Op.between]: [minLat, maxLat] }
    }
    if (!maxLat && minLat) {
        query.where.lat = { [Op.gte]: minLat }
    }
    if (maxLat && !minLat) {
        query.where.lat = { [Op.lte]: maxLat }
    }
    // lng
    if (maxLng && minLng) {
        query.where.lng = { [Op.between]: [minLng, maxLng] }
    }
    if (!maxLng && minLng) {
        query.where.lng = { [Op.gte]: minLng }
    }
    if (maxLng && !minLng) {
        query.where.lng = { [Op.lte]: maxLng }
    }
    // price 
    if (maxPrice && minPrice) {
        query.where.price = { [Op.between]: [minPrice, maxPrice] }
    }
    if (!maxPrice && minPrice) {
        query.where.price = { [Op.gte]: minPrice }
    }
    if (maxPrice && !minPrice) {
        query.where.price = { [Op.lte]: maxPrice }
    }

    const spots = await Spot.findAll(query);
    res.json({ Spots: spots, page, size });
});

/* POST method route */
// Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews',
    requireAuth,
    validateSpot,
    reviewExist,
    validateCreateReview,
    async (req, res) => {
        const { review, stars } = req.body;
        const userId = req.user.id;
        const spotId = req.params.id;
        const newReview = await Review.create({
            userId, spotId, review, stars
        });
        const createdReview = Review.findByPk(newReview.id, {
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: Image,
                attributes: ['url']
            }]
        }) 
        res.json(createdReview);
    });


//Create a Booking from a Spot based on the Spot's id
router.post('/:id/bookings', requireAuth, validateSpot, SpotOwnerbooking, validateCreateBooking, validBookingDate, async (req, res) => {
    const spotId = req.params.id;
    const userId = req.user.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const newbooking = await Booking.create({ spotId, userId, startDate, endDate });
    res.json(newbooking);
});


// Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, validateSpot, verifySpotOwner, async (req, res) => {
    const { url } = req.body;

    const spotId = req.params.id;
    const imageableType = "Spot";
    const spotimage = await Image.create({
        spotId, imageableType, url
    });
    res.json(await Image.findByPk(spotimage.id, {
        attributes: [
            'id',
            ['spotId', 'imageableId'],
            'imageableType',
            'url'
        ]
    }));
});


//Create a Spot
router.post('/',
    requireAuth,
    validateCreateSpot,

    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

        const ownerId = req.user.id;
        const newspot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price, previewImage });

        res.json(newspot);
    });

/* PUT method route */
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

/* DELETE method route */
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
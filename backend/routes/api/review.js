const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, sequelize, Review, Image, User } = require('../../db/models');



// Validationg Middlewares
// to check is the review valide
const validateReview = async (req, _res, next) => {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        next(err);
    };
    next();
};
// to check if manipulate by review owner
const verifyReviewOwner = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const review = await Review.findByPk(req.params.id)

    if (requestuserId !== review.userId) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    }

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
// check  less then 10 imgages for a review
const imageCount = async (req, _res, next) => {
    const totalImages = await Image.findAll({
        where: {
            imageableType: 'Review',
            reviewId: req.params.id
        }
    });
    if (totalImages.length >= 10) {
        const err = new Error('Maximum number of images for this resource was reached');
        err.status = 400;
        next(err);
    };
    next();
}




// Get a review by review id
router.get('/:id', validateReview, async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    res.json(review);
});

// Get all reviews 
router.get('/', async (req, res) => {
    const reviews = await Review.findAll();
    res.json(reviews);
});

// Edit a Review
router.put('/:id',
    requireAuth,
    validateReview,
    verifyReviewOwner,
    validateCreateReview,

    async (req, res) => {
        const updateReview = await Review.findByPk(req.params.id);
        const { review, stars } = req.body;
        updateReview.review = review;
        updateReview.stars = stars;

        await updateReview.save();

        res.json(updateReview);
    });

// Delete a Review
router.delete('/:id',
    requireAuth,
    validateReview,
    verifyReviewOwner,

    async (req, res) => {
        const review = await Review.findByPk(req.params.id);

        await review.destroy();

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    });

// Add an Image to a Review based on the Review's id
router.post('/:id/images',
    requireAuth,
    validateReview,
    verifyReviewOwner,
    imageCount,
    async (req, res) => {
        const { url } = req.body;
        const reviewId = req.params.id;
        const imageableType = "Review";
        const reviewimage = await Image.create({
            reviewId, imageableType, url
        });
        res.json(await Image.findByPk(reviewimage.id, {
            attributes: [
                'id',
                ['reviewId', 'imageableId'],
                'imageableType',
                'url'
            ]
        }));
    });



module.exports = router;
const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');

const router = express.Router();

// to check is the review valide
const validateImage = async (req, _res, next) => {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        next(err);
    };
    next();
};

// to check if authorized user to delete an image
const authorizedDelete = async (req, _res, next) => {
    const requestuserId = req.user.id;
    const image = await Image.findByPk(req.params.id);
    const spot = await Spot.findByPk(image.spotId);
    const review = await Review.findByPk(image.reviewId);

    if (((review) && (requestuserId == review.userId)) || ((spot) && (requestuserId == spot.ownerId))) {
        next();
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    }
};


// Delete an Image
router.delete('/:id',
    requireAuth,
    validateImage,
    authorizedDelete,

    async (req, res) => {
        const image = await Image.findByPk(req.params.id);
        await image.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    });


module.exports = router;
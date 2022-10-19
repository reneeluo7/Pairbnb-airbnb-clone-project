const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');

/* Middlewares */
// to check is the review valid
const validateImage = async (req, _res, next) => {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
        const err = new Error("Image couldn't be found");
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

// to check if a spot is valid
const validateSpot = async (req, _res, next) => {
    console.log('333333', req.params.id)
    const spot = await Spot.findByPk(req.params.id);
  
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      next(err);
    }
    next();
  };



// GET all Image by spotID
router.get('/spot/:id', validateSpot, async(req, res) => {
    const images = await  Image.findAll({
        where: { spotId: req.params.id}, 
        attributes:['url']
    })
    const previmg = await Spot.findByPk(req.params.id,{
        attributes:['previewImage']
    })
    const prevurl = previmg["previewImage"]
    images.unshift({'url': prevurl})

    const allImages = {
        // previmg,
        images
        
    }
    res.json(allImages)
})



/* DELETE method route */
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
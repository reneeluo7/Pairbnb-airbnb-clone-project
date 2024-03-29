import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, editOneReview, getSpotsReviews } from '../../store/reviews'
import { getOneSpot } from '../../store/spots'
import StarRatings from 'react-star-ratings';

function ReviewForm({ onClose, reviewId, formUsage, spotId }) {
    const dispatch = useDispatch();
    const editReview = useSelector(state => state.reviews[reviewId])
    const [review, setReview] = useState(editReview ? editReview.review : '');
    const [stars, setstars] = useState(editReview ? editReview.stars : '');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const newReview = {
            review,
            stars            
        }
        if (reviewId) {
            return dispatch(editOneReview(reviewId, newReview))
                .then(() => onClose())
                .catch(async (res) => {
                    const data = await res.json();
                    
                    if (data && data.errors) setErrors(Object.values(data.errors))
                })
        }
        else {
            return dispatch(createReview(spotId, newReview))
                .then(() => onClose())
                .then(() => dispatch(getOneSpot(spotId)))
                .then(() => dispatch(getSpotsReviews(spotId)))
                .catch(async (res) => {
                    const data = await res.json();
                   
                    if (data && data.message) setErrors(Object.values(data.message))
                })
        }
    }; 

    return (
        <div className='Review-form-container'>
            <div className='formtitle'>
                Review Form
            </div>
            <div className="review-form">
                <form onSubmit={handleSubmit}>
                <ul>
                { errors.length > 0 &&<li >{errors}</li>}
                    </ul>
                    <label className='review-content-input-create'>
                        Review
                        <textarea
                            type="text"
                            value={review}                            
                            onChange={(e) => setReview(e.target.value)}
                            required
                            placeholder='Write something for the listing...'
                        />
                    </label>
                    <label>
                        Stars
                        {/* <input
                            type="number"
                            value={stars}
                            min="1"
                            max="5"
                            onChange={(e) => setstars(e.target.value)}
                            required
                        /> */}
                        <StarRatings
                            rating={stars}
                            numberOfStars={5}
                            starDimension="34px"
                            starSpacing="0px"
                            starRatedColor="yellow"
                            changeRating={setstars}
                            // name='star'
                        />
                    </label>
                    <button type="submit" id="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm
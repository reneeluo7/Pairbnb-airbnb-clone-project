import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsReviews } from '../../store/reviews';


function SpotReviewList({ spotId }) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false)
    const reviews = useSelector(state => Object.values(state.reviews))
    const spotReviews = reviews.filter(review => review.spotId === Number(spotId))
    
    useEffect(() => {
        dispatch(getSpotsReviews(spotId)).then(() => setIsloaded(true))
    }, [dispatch, spotId])
    return (
        isloaded && (
            spotReviews.map(review => (
                <div key={review.id} className='review-info-container'>
                    <div className="review-info-title-container">
                        <div className="review-info-title-reviewername">{review.User.firstName}</div>
                        <div className="review-info-title-createtime">{
                             review.createdAt.split('-')[1] + " - " + review.createdAt.split('-')[0]
                        }
                        </div>
                    </div>
                    <div className="review-content-container">
                        {review.review}
                    </div>
                </div>))
        )
    )
}

export default SpotReviewList
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsReviews } from '../../store/reviews';
// import ReviewFormModal from '../ReviewFormModal';



function SpotReviewList({ spotId }) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false)
    const reviews = useSelector(state => Object.values(state.reviews))
    const spotReviews = reviews.filter(review => review.spotId === Number(spotId))
    const dateToString = (data) => {
        const date = new Date(data);
        const dateParams = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, dateParams);
      };

    useEffect(() => {
        dispatch(getSpotsReviews(spotId)).then(() => setIsloaded(true))
    }, [dispatch, spotId])
    return (
        <div className='review-info-wrap'>

        {isloaded && 
            spotReviews?.map(review => (
                <div key={review.id} className='review-info-container'>
                    <div className="review-info-title-container">
                        <div className="review-info-title-reviewername">{review.User.firstName}</div>
                        <div className="review-info-title-createtime">
                             {dateToString(review.updatedAt)}
                        
                        </div>
                    </div>
                    <div className="review-content-container">
                        {review.review}
                    </div>
                </div>))}
            {/* <div className="create-review-componemt">
                <ReviewFormModal spotId={spotId} reviewId='' formUsage='Create New Review' />
            </div> */}
        </div>


             
      
      
       
         
    )
}

export default SpotReviewList
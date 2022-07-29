import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews, deleteReview } from '../../store/reviews'
import ReviewFormModal from '../ReviewFormModal';

function MyReviews({ id }) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const reviews = useSelector(state => Object.values(state.reviews));
    const myreviews = reviews.filter(review => review.userId === Number(id));

    const dateToString = (data) => {
        const date = new Date(data);
        const dateParams = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, dateParams);
      };

    useEffect(() => {
        dispatch(getUserReviews(id)).then(() => setIsloaded(true))
    }, [dispatch, id])
  return (
    <div className='reviews-cards-container'>
        {isloaded && (
            myreviews.map(review => (
                <div key={review.id} className='review-card'>
                        <div className="review-title"> Review for {review.Spot.name}
                        {/* {review.images && review.images.length > 0 ? review.Images.map((image, index) => (<img key={index} src={image.url} alt='eachImage' />)) : ''} */}
                        </div>
                        <div className="review-info">
                            <div className="review-time-info">
                                <span>Most Recent Update At: {dateToString(review.updatedAt)}</span>
                            </div>
                            <div className="review-star">
                                <span><i className="fa-solid fa-star"></i></span>
                                Stars: {review.stars}</div>
                            <div className="review-content">{review.review}</div>                            
                        </div>
                        <div className="review-manage-btns">
                            <span className="review-edit">
                                <ReviewFormModal reviewId={review.id} formUsage='Edit' />
                            </span>
                            <span className="review-delete"
                                onClick={() => dispatch(deleteReview(review.id))}
                            >
                                <button>Delete</button>
                            </span>
                        </div>
                    </div>
            ))
        )}
    </div>
  )
}

export default MyReviews
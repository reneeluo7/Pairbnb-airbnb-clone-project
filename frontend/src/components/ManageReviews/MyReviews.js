import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews, deleteReview } from '../../store/reviews'
import ReviewFormModal from '../ReviewFormModal';

function MyReviews({ id }) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const reviews = useSelector(state => Object.values(state.reviews));
    const myreviews = reviews.filter(review => review.userId === Number(id));

    useEffect(() => {
        dispatch(getUserReviews(id)).then(() => setIsloaded(true))
    }, [dispatch, id])
  return (
    <div className='reviews-cards-container'>
        {isloaded && (
            myreviews.map(review => (
                <div key={review.id} className='review-card'>
                        <div className="review-image">
                        {review.Images && review.Images.length > 0 ? review.Images.map((image, index) => (<img key={index} src={image.url} alt='eachImage' />)) : ''}
                        </div>
                        <div className="review-info">
                            <div className="review-star">{review.stars}</div>
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
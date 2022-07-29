import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getSpotsReviews } from '../../store/reviews'

function DisplayAveStar({spotId}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => Object.values(state.reviews));
    const spotReviews = reviews.filter(review => review.spotId === Number(spotId));
    const avgStarRating = spotReviews.map(el => el.stars).reduce((a, b) => a + b, 0) / spotReviews.length;

    useEffect(() => {
        dispatch(getSpotsReviews(spotId))
    }, [dispatch, spotId]);

  return (
     <span key={spotId}>{avgStarRating ? (`${avgStarRating.toFixed(2)}`) : (`New`) }</span>
  )
}

export default DisplayAveStar;
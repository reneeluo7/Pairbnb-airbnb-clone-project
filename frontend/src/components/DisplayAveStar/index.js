import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
// import { getOneSpot } from '../../store/spots';
import{ getSpotsReviews } from '../../store/reviews';

function DisplayAveStar({ spotId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  const spotReviews = reviews.filter(review => review.spotId === Number(spotId));
  const avgStarRating = spotReviews.map(el => el.stars).reduce((a, b) => a + b, 0) / spotReviews.length;
  // const spot = useSelector(state => state.spots[spotId]);
  // const [isLoaded, setIsLoaded] = useState(false);
  console.log("reviews======", reviews)
  console.log("avestars======", avgStarRating)
  


  useEffect(() => {
    dispatch(getSpotsReviews(spotId))
  }, [dispatch, spotId]);

  return (
    <>
      
        <span key={spotId}>{avgStarRating ? (`${avgStarRating.toFixed(2)}`) : (`New`)}</span>
      
    </>
  )
}

export default DisplayAveStar;
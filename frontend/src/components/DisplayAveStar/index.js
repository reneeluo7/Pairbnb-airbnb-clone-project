import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getOneSpot } from '../../store/spots'

function DisplayAveStar({spotId}) {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId]);    
    
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])
  return (
     <div key={spotId}>{spot.avgStarRating ? (`${spot.avgStarRating.toFixed(2)}`) : (`New`) }</div>
  )
}

export default DisplayAveStar;
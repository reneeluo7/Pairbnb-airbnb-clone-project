import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';
import SpotReviewList from '../SpotReviewList';
import ReviewFormModal from '../ReviewFormModal';

const SpotDetail = () => {
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);
    // console.log("Spot return by SpotDrtail", spot)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneSpot(id)).then(() => setIsLoaded(true))
    }, [dispatch, id])

    return (
        isLoaded && <div className="spot-detail-title-box">
            <div className="spot-detail-title-content-box">
                <div className="spot-detail-title-upper">
                    <h2>{spot.name}</h2>
                </div>
                <div className="spot-detail-title-lower">
                    <div className="spot-detail-title-lower-left">

                        <span className="review-detail">
                            <i className="fa-solid fa-star"></i>                            
                            <span className="review-ave-scor">{spot.avgStarRating ? (`${spot.avgStarRating.toFixed(2)}`) : (`New`) }</span>                            
                            <span>・</span>
                            <span className="review-counts">{spot.numReviews}</span> <span>{(spot.numReviews > 1) ? `reviews` : `review`}</span>
                        </span>
                        <span> ・ </span>
                        <span className="location-detail">{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
                    </div>
                    <div className="spot-detail-title-lower-right"></div>
                </div>
            </div>
            <div className="spot-detail-whole-box">
                <div className="spot-detail-photos-box">
                    <div className="spot-detail-previewImg">
                        <img src={spot.previewImage} alt="spot-previewImage" />
                    </div>
                    <div className="spot-detail-imges">
                        {/* {console.log("spot images", spot.images)} */}
                        {spot.images && (
                            spot.images.map((img, idx) => (
                                <img key={idx} src={img} alt="spot-imges" />
                            ))
                        )}
                    </div>
                </div>
                <div className="spot-detail-info-whole-box">
                    <div className="spot-detail-info-host">
                        Hosted by {spot.Owner.firstName}
                    </div>
                    <div className="spot-detail-info-description">{spot.description}</div>
                    <div className="spot-detail-info-reviews-container">
                        <div className="spot-detail-info-reviews-topbar">
                            <i className="fa-solid fa-star"></i> 

                            <span className="review-ave-scor">{spot.avgStarRating ? (`${spot.avgStarRating}`) : (`New`) }</span>
                            <span> ・ </span>      
                            <span className="review-counts">{spot.numReviews}</span> <span>{(spot.numReviews > 1) ? `reviews` : `review`}</span>
                        </div>
                        <div className="spot-detail-info-reviews-list">
                            
                             <SpotReviewList spotId={id} />
                        </div>
                     <div className="add-review">
                          { user &&                             
                            <ReviewFormModal spotId={id} reviewId='' formUsage='Create New Review' />}
                    </div> 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SpotDetail;
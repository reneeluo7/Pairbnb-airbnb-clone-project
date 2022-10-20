import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';
import SpotReviewList from '../SpotReviewList';
import ReviewFormModal from '../ReviewFormModal';
import './SpotDetail.css';
import ListingImages from '../ListingImages';


const SpotDetail = () => {
    const { id } = useParams();
    const spot = useSelector(state => state.spots[id]);
    console.log("11", spot?.images)
    const imageArr = spot.images.slice()
    imageArr.unshift(spot.previewImage)
    
    const history = useHistory()
    const dispatch = useDispatch();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)

    const seeImages = () => {
        // history.push(`/spots/${id}/images`)
        <ListingImages imageArr={imageArr} />
    }

    useEffect(() => {
        dispatch(getOneSpot(id)).then(() => setIsLoaded(true))
    }, [dispatch, id])

    return (
        isLoaded &&
        <div className="spot-detail-page-container">


            <div className="spot-detail-title-box">
                {/* <div className="spot-detail-title-content-box"> */}
                    <div className="spot-detail-title-upper">
                        <h2>{spot.name}</h2>
                    </div>
                    <div className="spot-detail-title-lower">
                        <div className="spot-detail-title-lower-left">

                            <span className="review-detail">
                                <i className="fa-solid fa-star"></i>
                                <span className="review-ave-scor">{spot.avgStarRating ? (`${spot.avgStarRating.toFixed(2)}`) : (`New`)}</span>
                                <span>・</span>
                                <span className="review-counts">{spot.numReviews}</span> <span>{(spot.numReviews > 1) ? `reviews` : `review`}</span>
                            </span>
                            <span> ・ </span>
                            <span className="location-detail">{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
                        </div>
                        <div className="spot-detail-title-lower-right"></div>
                    </div>
                {/* </div> */}

            </div>
          
            <div className="spot-detail-photos-box">
                <div className="spot-detail-previewImg" >
                    {/* <Link to={`/spots/${id}/images`}> */}
                        
                    <img onClick= {seeImages} src={spot.previewImage} alt="spot-previewImage" />
                    {/* </Link> */}
                </div>
                <div className="spot-detail-imges">
                {/* <Link to={`/spots/${id}/images`}> */}
                        
                    {spot.images && (
                        spot.images.map((img, idx) => (
                            <img onClick= {seeImages} key={idx} src={img.url} alt="spot-imges" />
                        ))
                    )}
                        {/* </Link> */}
                </div>
            </div>
            <div className="spot-detail-info-whole-box">
                <div className="spot-detail-info-host">
                    Hosted by {spot.Owner.firstName}
                </div>
                <div className="spot-detail-info-description">{spot.description}
                </div>
                <div className="spot-detail-info-reviews-container">
                    <div className="spot-detail-info-reviews-topbar">
                        <i className="fa-solid fa-star"></i>

                        <span className="review-ave-scor">{spot.avgStarRating ? (`${spot.avgStarRating.toFixed(2)}`) : (`New`)}</span>
                        <span> ・ </span>
                        <span className="review-counts">{spot.numReviews}</span> <span>{(spot.numReviews > 1) ? `reviews` : `review`}</span>
                    </div>
                    <div className="spot-detail-info-reviews-list">

                        <SpotReviewList spotId={id} />
                    </div>
                    <div className="add-review">
                        {user &&
                            <ReviewFormModal spotId={id} reviewId='' formUsage='Create New Review' />}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default SpotDetail;
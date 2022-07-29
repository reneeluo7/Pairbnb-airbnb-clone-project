import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './SpotsBrowser.css';
import DisplayAveStar from '../DisplayAveStar';

const SpotsBrowser = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots))
    // console.log("spots from useSelector -----",spots)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    return (

        <div className='spots-cards-session'>
            {spots && (
                spots.map(spot => (
                    <Link key={spot.id} to={`/spots/${spot.id}`}>
                        <div className='spot-card'>
                            <div className="spot-image">
                                <img src={spot.previewImage} alt="previewImage" />
                            </div>
                            <div className="spot-info">
                                <div className="spot-info-topline">

                                    <span className="spot-location">{`${spot.city}, ${spot.state}`}</span>
                                    <span className="spot-avgstar">
                                        <span> <i className="fa-solid fa-star"></i></span>

                                        <span className="star-number">
                                          <DisplayAveStar spotId={spot.id} />
                                         </span>
                                    </span>
                                </div>
                                <div className="spot-price"><span>${spot.price}</span> night</div>
                            </div>
                        </div>

                    </Link>
                ))
            )

            }

        </div>

    )
}

export default SpotsBrowser;
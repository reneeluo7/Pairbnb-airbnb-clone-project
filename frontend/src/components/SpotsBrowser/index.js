import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './SpotsBrowser.css';

const SpotsBrowser = () => {
  
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots))
    // console.log("spots from useSelector -----",spots)

    useEffect(() => {
        dispatch(getSpots())
    },[dispatch])
    return (
        <main>
            <div className='spots-cards-session'>
                {spots && (
                    spots.map(spot => (
                        <Link key={spot.id} to={`/spots/${spot.id}`}>
                            <div className='spot-card'>
                                <div className="spot-image">
                                    <img src={spot.previewImage} alt="previewImage" />
                                </div>
                                <div className="spot-info">
                                    <div className="spot-location">{`${spot.city}, ${spot.state}`}</div>
                                    <div className="spot-avgstar">
                                         <i className="fa-solid fa-star"></i>
                                    </div>
                                    <div className="spot-price"><span>${spot.price}</span> night</div>
                                </div>
                            </div>

                        </Link>
                    ))
                )

                }
                
            </div>
        </main>
    )
}

export default SpotsBrowser;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser, deleteSpot } from '../../store/spots';
import ListingFormModal from '../ListingFormModal'


function MyListings({id}) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false)
    const spots = useSelector(state => Object.values(state.spots));
    const myspots = spots.filter(spot => spot.ownerId === Number(id));

    useEffect(() => {
        dispatch(getSpotsByUser(id)).then(() => setIsloaded(true))
    },[dispatch, id])
  return (
    <div className='listings-cards-container'>
        {isloaded && (
                    myspots.map(spot => (
                        // <Link key={spot.id} to={`/spots/${spot.id}`}>
                            <div key={spot.id} className='spot-card'>
                                <div className="spot-image">
                                    <img src={spot.previewImage} alt="previewImage" />
                                </div>
                                <div className="spot-info">
                                    <div className="spot-name">{spot.name}</div>
                                    <div className="spot-location">{`${spot.city}, ${spot.state}`}</div>                                   
                                    <div className="spot-descptrition">{spot.description}</div>                                   
                                    <div className="spot-price"><span>${spot.price}</span> night</div>
                                </div>
                                <div className="spot-manage-btns">
                                    <span className="spot-edit">
                                        <ListingFormModal spotId={spot.id} formUsage='Edit' />
                                    </span>
                                    <span className="spot-delete"
                                        onClick={() => dispatch(deleteSpot(spot.id))}
                                    >
                                        <button>Delete</button>
                                    </span>
                                </div>
                            </div>

                        // </Link>
                    ))
                )}
    </div>
  )
}

export default MyListings
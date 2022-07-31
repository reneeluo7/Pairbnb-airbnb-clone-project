import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUser, deleteSpot } from '../../store/spots';
import ListingFormModal from '../ListingFormModal';
import { Link } from 'react-router-dom';
import { deleteReviewbySpotId } from '../../store/reviews';


function MyListings({ id }) {
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false)
    const spots = useSelector(state => Object.values(state.spots));
    const myspots = spots.filter(spot => spot.ownerId === Number(id));

    const handleDelete = (id) => {
        dispatch(deleteSpot(id))
        dispatch(deleteReviewbySpotId(id))
    }

    useEffect(() => {
        dispatch(getSpotsByUser(id)).then(() => setIsloaded(true))
    }, [dispatch, id])
    return (
        <div className='listings-cards-container'>
            {isloaded && (
                myspots.map(spot => (
                    <div key={spot.id} className='myspot-lists'>
                        <div className="myspot-image">
                        <Link key={spot.id} to={`/spots/${spot.id}`}>
                            <img src={spot.previewImage} alt="previewImage" />
                            </Link>
                        </div>
                        <div className="myspot-info">
                            <div className="myspot-name">{spot.name}</div>
                            <div className="myspot-location">{`${spot.address}, ${spot.city}, ${spot.state} ・ ${spot.country}`}</div>
                            <div className="myspot-descptrition">{spot.description}</div>
                            <div className="myspot-price"><span>${spot.price} /</span>  night</div>
                             <div className="myspot-manage-btns">
                            <span className="myspot-edit">
                                <ListingFormModal spotId={spot.id} formUsage='Edit' />
                            </span>
                            <span className="myspot-delete"
                                // onClick={() => dispatch(deleteSpot(spot.id))}
                                onClick={() => handleDelete(spot.id)}
                            >
                                <button>Delete</button>
                            </span>
                            </div>
                        </div>
                    </div>

                ))
            )}
        </div>
    )
}

export default MyListings
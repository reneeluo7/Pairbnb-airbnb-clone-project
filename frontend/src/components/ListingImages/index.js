import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotImages } from '../../store/images';
import { useHistory, useParams } from 'react-router-dom';
import './ListingImages.css'

export default function ListingImages() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isloaded, setIsloaded] = useState(false);
    const images = useSelector(state => Object.values(state.images))
    // console.log("images in components", images)

    useEffect(() => {
        dispatch(getOneSpotImages(id)).then(() => setIsloaded(true))
    }, [dispatch, id ])

    return (
        isloaded && 
        <div className="all-image-page-container">
            <div className="topbar-back-arrow">
                <div className="back-arrow" onClick={() => history.push(`/spots/${id}`)}>
                <i className="fa-solid fa-chevron-left"></i>
                </div>
            </div>
            <div className="all-images">
                {images && (
                    images.map((image, idx) => (
                        <div className="each-image" key={idx}>

                            <img src={image.url}  />
                        </div>
                    ))
                )

                }
            </div>
        </div>
    )
}
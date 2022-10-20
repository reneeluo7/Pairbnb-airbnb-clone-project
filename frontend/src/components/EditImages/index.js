import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getImagesToEdit } from '../../store/images';
import './EditImages.css'
import UploadImageModal from '../UploadImageModal';
import { removeImage } from '../../store/images';

function EditImages(){
    const {id} = useParams()
 
    const dispatch = useDispatch()
    const [isloaded, setIsloaded] = useState(false);
    const [showBox, setShowBox] = useState(false) 
    const images = useSelector(state => Object.values(state.images))
    const editSpotImages = images.filter(image => image.spotId === Number(id))
      

    useEffect(() => {
        dispatch(getImagesToEdit(id)).then(() => setIsloaded(true))
    }, [dispatch, id ])


    return(
        isloaded && 
        <div className="review-page-container">
            <div className="my-reviews">
            <div className="my-reviews-title"> Manage Images </div>
            </div>
            <div className="show-images-container">
                {
                    editSpotImages && editSpotImages.map((image, idx) => (
                        <div className="each-image-card" key={idx}>
                            <img src={image.url} key={image.id} />
                            <button className="delete-image-btn"
                                onClick={(e) => {
                                    dispatch(removeImage(image.id))
                                }}
                                // onClick={setShowBox(true)}
                            >
                                <i className="fa-sharp fa-solid fa-trash"></i>
                                {/* <i className="fa-regular fa-circle-xmark"></i> */}
                            </button>
                            {/* {
                                showBox && (
                                    <div className="confirm-delete">
                                        <div className='confirm-delete-word'>Are you sure to delete this image?</div>
                                        <div className="confirm-delete-btns">
                                            <button className='confirm-delete'>Delete</button>
                                            <button className="not-to-delete">Cancel</button>
                                        </div>
                                    </div>
                                )
                            } */}
                        </div>
                    ))
                }
                {/* <div className="each-image-card">
                <i className="fa-solid fa-upload"></i>
                </div> */}
                <UploadImageModal spotId={id}/>
            </div>

        </div>
    )

}

export default EditImages
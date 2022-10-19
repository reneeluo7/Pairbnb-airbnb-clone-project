import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getOneSpotImages } from '../../store/images';

function EditImages(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const [isloaded, setIsloaded] = useState(false);
    const images = useSelector(state => Object.values(state.images))
    const editableImages = images.slice(1)
    console.log("after slice", editableImages)

    useEffect(() => {
        dispatch(getOneSpotImages(id)).then(() => setIsloaded(true))
    }, [dispatch, id ])


    return(
        <div className="review-page-container">
            <div className="my-reviews">
            <div className="my-reviews-title"> Manage Images </div>
            </div>

        </div>
    )

}

export default EditImages
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../store/images";

export default function UploadImageForm({onClose, spotId}) {
    const dispatch = useDispatch();
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
        // console.log('previewImg after upload', file)
      };
    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors([]);
        const newImage = {
            image
        }
        return dispatch(addImage(newImage, spotId))
        .then(() => onClose())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(Object.values(data.errors));
        });
        
    }


    return(
        <div className="listing-form-container">
            <div className="formtitle">Upload An Image</div>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Image *
                     <input type='file' 
                    //  value={image}
                     required
                     onChange={updateFile}
                     />
                </label>
                <button type="submit" id="submit-btn">
                     Upload
                </button>
                {/* <button id="cancel-btn" onClick={onClose} >
                     Cancel
                </button> */}
            </form>
        </div>
    )
}
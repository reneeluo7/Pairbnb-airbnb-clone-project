import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import spotsReducer, { creasteSpot } from '../../store/spots';


export default function ListingForm({ onClose }) {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const newList = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }
        return dispatch(creasteSpot(newList))
            .then(()=> onClose())
            .catch(async (res) => {
                const data = await res.json();
                // console.log("Data from backend ",data)
            if(data && data.errors) setErrors(Object.entries(data.errors))
        })
    
    
};


return (
    <div className="listing-form-container">

        <div className='listing-form-title'>
            <h2>ListingForm</h2>
        </div>
        <div className="listing-form">
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{`${error[0]}: ${error[1]} `}</li>)}
                </ul>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude
                    <input
                        type="number"
                        value={lat}
                        min={-90}
                        max={90}
                        step={0.0000001}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="number"
                        value={lng}
                        min={-180}
                        max={180}
                        step={0.0000001}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Listing Name
                    <input
                        type="text"
                        value={name}
                        maxLength={50}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Listing Description
                    <input
                        type="text"
                        value={description}
                        maxLength={250}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Preview Image
                    <input
                        type="url"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
)
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { creasteSpot, editOneSpot } from "../../store/spots";

export default function ListingForm({ onClose, spotId, formUsage }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const editSpot = useSelector((state) => state.spots[spotId]);
  const [address, setAddress] = useState(editSpot ? editSpot.address : "");
  const [city, setCity] = useState(editSpot ? editSpot.city : "");
  const [state, setState] = useState(editSpot ? editSpot.state : "");
  const [country, setCountry] = useState(editSpot ? editSpot.country : "");
  const [lat, setLat] = useState(editSpot ? editSpot.lat : "");
  const [lng, setLng] = useState(editSpot ? editSpot.lng : "");
  const [name, setName] = useState(editSpot ? editSpot.name : "");
  const [description, setDescription] = useState(
    editSpot ? editSpot.description : ""
  );
  const [price, setPrice] = useState(editSpot ? editSpot.price : "");
  const [previewImage, setPreviewImage] = useState(
    editSpot ? editSpot.previewImage : ""
  );
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
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
      previewImage,
    };
    if (spotId) {
      return dispatch(editOneSpot(spotId, newList))
        .then(() => onClose())
        // .then(() => history.push(`/users/${user.id}/spots`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    } else {
      return dispatch(creasteSpot(newList))
        .then(() => onClose())
        // .then(() => history.push(`/users/${user.id}/spots`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(file);
    // console.log('previewImg after upload', file)
    
  };

  return (
    <div className="listing-form-container">
      <div className="formtitle">Listing Form</div>
      <div className="listing-form">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Address
            <input
              type="text"
              value={address}
              maxLength={50}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              maxLength={30}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              maxLength={30}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              type="text"
              value={country}
              maxLength={30}
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
          <label id="listing-description">
            Listing Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={price}
              min={0}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Preview Image
            <input
              type="file"
              // value={previewImage}
              onChange={updateFile}
              required
            />
          </label>
          <button type="submit" id="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

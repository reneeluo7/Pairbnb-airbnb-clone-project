import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotImages } from "../../store/images";
import { useHistory, useParams, useLocation } from "react-router-dom";
import "./ListingImages.css";

export default function ListingImages() {
  const location = useLocation();

  const history = useHistory();

  const images = location.state?.imageArr;

  return (
    <div className="all-image-page-container">
      <div className="topbar-back-arrow">
        <div className="back-arrow" onClick={() => history.goBack()}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
      <div className="all-images">
        {images &&
          images.map((image, idx) => (
            <div className="each-image" key={idx}>
              <img src={image.url} />
            </div>
          ))}
      </div>
    </div>
  );
}

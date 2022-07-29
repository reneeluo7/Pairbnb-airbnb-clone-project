import React from 'react'
import { useParams } from 'react-router-dom'
import MyReviews from './MyReviews'
import './ManageReviews.css'
// import ListingFormModal from '../ListingFormModal'

function ManageReviews() {
    const {id} = useParams()
  return (
    <div className="review-page-container">
        {/* <div className="review-page-container"> */}
        <h1>Manage My Reviews</h1>
        {/* <div className="create-new-listing-btn">
         <ListingFormModal spotId='' formUsage='Create New Listing'/>
        </div> */}
        <div className="my-reviews">
            <h2>My Reviews</h2>
           <MyReviews id={id} />
        </div>



        {/* </div> */}
    </div>
  )
}

export default ManageReviews
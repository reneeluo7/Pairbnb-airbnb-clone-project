import React from 'react'
import { useParams } from 'react-router-dom'
import MyListings from './MyListings'
import ListingFormModal from '../ListingFormModal'
import './ManageListings.css'

function ManageListings() {
    const {id} = useParams()
  return (
    <div className="listing-page-container">
        <div className="listing-page-title-box">
        {/* <h1>Manage My Listings</h1> */}
          <span className="my-listing-title">My Listings</span>
        <span className="create-new-listing-btn">
         <ListingFormModal spotId='' formUsage='Create New Listing'/>
        </span>
        </div>
        <div className="my-listings-cards">          
           <MyListings id={id} />     
        </div>
    </div>
  )
}

export default ManageListings
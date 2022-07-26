import React from 'react'
import { useParams } from 'react-router-dom'
import MyListings from './MyListings'

function ManageListings() {
    const {id} = useParams()
  return (
    <div>
        <div className="listing-page-container">
        <h1>Manage My Listings</h1>
        <div className="create-new-listing-btn">
            <button onClick={() => console.log('create')}>Create New Listing</button>
        </div>
        <div className="my-listings">
            <h2>My Listings</h2>
           <MyListings id={id} />
        </div>



        </div>
    </div>
  )
}

export default ManageListings
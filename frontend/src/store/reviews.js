import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
const DELETE = 'reviews/DELETE';
const ADD_ONE = 'reviews/ADD_ONE';
const DELETE_BY_SPOT_ID = 'reviews/DELETE_BY_SPOT_ID';

const load = (reviews) => ({
    type: LOAD,
    reviews
})

const deleteOne = (id) => ({
    type: DELETE,
    id
})

const addOne = (review) => ({
    type: ADD_ONE,
    review
})

export const deleteReviewbySpotId = (spotId) => ({
    type: DELETE_BY_SPOT_ID,
    spotId
})

export const getSpotsReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const data = await response.json();
       
        dispatch(load(data.Reviews));
        return response;
    }
}
export const getUserReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}/reviews`);
    if (response.ok) {
        const data = await response.json();
 
        dispatch(load(data.Reviews));
        return response;
    }
}

export const createReview = (spotId, newReview) => async dispatch => {
    const { review, stars } = newReview
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
        })
    });
    if (response.ok) {
        const data = await response.json();
        
        dispatch(addOne(data));
        
        return response;
    }
}

export const editOneReview = (reviewId, newReview) => async dispatch => {
    const { review, stars } = newReview
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            stars,
        })
    });
    if (response.ok) {
        const data = await response.json();
      
        dispatch(addOne(data));
       
        return response;
    }
}


export const deleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    dispatch(deleteOne(id));
    return response;
}



const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD:  
            newState = {...state} 
            
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;
        
        case DELETE:
            newState = { ...state }
            delete newState[action.id]           
            return newState;

        case ADD_ONE:
            newState = { ...state }
            newState[action.review.id] = {...newState[action.review.id],...action.review}
            return newState;

        case DELETE_BY_SPOT_ID:
            newState = {}
            let stateArr = Object.values(state);
            
            let filteredState = stateArr.filter(review => review.spotId !== action.spotId)
           
            filteredState.forEach(review => {
                newState[review.id] = review
            })
            return newState;

        default:
            return state;
    }
}

export default reviewReducer;
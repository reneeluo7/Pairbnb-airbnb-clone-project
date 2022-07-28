import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
const DELETE = 'reviews/DELETE';
const ADD_ONE = 'reviews/ADD_ONE';

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


export const getSpotsReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const data = await response.json();
        // console.log('fetch from backend getReviewsbySpot data----', data)
        dispatch(load(data.Reviews));
        return response;
    }
}
export const getUserReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}/reviews`);
    if (response.ok) {
        const data = await response.json();
        // console.log('fetch from backend getReviewsbySpot data----', data)
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
            newState = { ...state }
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
            newState[action.review.id] = action.review
            return newState;

        default:
            return state;
    }
}

export default reviewReducer;
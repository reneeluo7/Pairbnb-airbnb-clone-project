import { csrfFetch } from "./csrf";

const LOAD = 'images/LOAD';

// actions
const load = (images) => ({
    type: LOAD,
    images,
  });

// thunk action creators

export const getOneSpotImages = (id) => async (dispatch) => {
    const response = await fetch(`/api/images/spot/${id}`);
    if (response.ok) {
        const data = await response.json();
    
        dispatch(load(data.images));
        return response;
      }
}

const imageReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:  
        newState = {...state} 
        
        action.images.map((image, index )=> {
            newState[index] = image
        })
        return newState;
        
        
        default:
            return state;
    }
};

export default imageReducer
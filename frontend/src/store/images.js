import { csrfFetch } from "./csrf";

const LOAD = 'images/LOAD';
const List = 'images/List'
const ADD = 'images/ADD'
const DELETE = 'images/DELETE'

// actions
const load = (images) => ({
    type: LOAD,
    images,
  });
const list = (images) => ({
    type: List,
    images,
  });
const add = (image) => ({
    type: ADD,
    image,
  });
const remove = (id) => ({
    type: DELETE,
    id,
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

export const getImagesToEdit = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/images/spot/${id}/edit`);
    if (response.ok) {
        const data = await response.json();
    
        dispatch(list(data.images));
        return response;
    }
}

export const addImage = (newImage, spotId) => async(dispatch) => {
    const { image } =  newImage;
    const formData = new FormData();
    formData.append('url', image);
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        // console.log("data", data)
        dispatch(add(data))
        
        return response;
    }
}

export const removeImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
    });
    dispatch(remove(id));
    return response;
};


// Reducer
const imageReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:  
        newState = {...state} 
        
        action?.images?.map((image, index )=> {
            newState[index] = image
        })
        return newState;

        case List:  
        newState = {...state} 
        
        action.images.forEach(image=> {
            newState[image.id] = image
        })
        return newState;

        case ADD:  
        newState = {...state} 
        newState[action.image.id] = action.image;
        return newState;

        case DELETE:
            newState = {...state};
            delete newState[action.id];
            return newState;
        
        
        default:
            return state;
    }
};

export default imageReducer
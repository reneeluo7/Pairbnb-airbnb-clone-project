

const LOAD = 'spots/LOAD';
const GET_ONE = 'spots/GET_ONE';

// actions
const load = (spots) => ({
    type: LOAD,
    spots
})

const loadOne = (payload) => ({
    type: GET_ONE,
    payload
})


// thunk action creators

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const data = await response.json();
        // console.log('fetch from backend data----', data)
        dispatch(load(data.Spots));
        return response;
    }
}

export const getOneSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const data = await response.json();
        console.log('fetch from backend get1spot data----', data)
        dispatch(loadOne(data));
        return response;
    }
}




const spotsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD: 
            newState = {...state}
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            })
        return newState;

        case GET_ONE: 
            newState = {...state}
            newState[action.payload.id] = action.payload
        return newState;
        
        default:
        return state;
    }
}

export default spotsReducer;
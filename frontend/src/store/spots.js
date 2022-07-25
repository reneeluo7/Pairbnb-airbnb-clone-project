

const LOAD = 'spots/LOAD';

// actions
const load = (spots) => ({
    type: LOAD,
    spots
})

// thunk action creators
export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const data = await response.json();
        console.log('fetch from backend data----', data)
        dispatch(load(data.Spots));
        return response;
    }
}

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD: 
            const newState = {...state}
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            })
        return newState;
        
        default:
        return state;
    }
}

export default spotsReducer;
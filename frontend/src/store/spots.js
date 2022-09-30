import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const GET_ONE = "spots/GET_ONE";
const DELETE = "spots/DELETE";
const ADD_ONE = "spots/ADD_ONE";

// actions
const load = (spots) => ({
  type: LOAD,
  spots,
});

const loadOne = (payload) => ({
  type: GET_ONE,
  payload,
});
const deleteOne = (id) => ({
  type: DELETE,
  id,
});
const addOne = (spot) => ({
  type: ADD_ONE,
  spot,
});

// thunk action creators

export const getSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const data = await response.json();

    dispatch(load(data.Spots));
    return response;
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`);
  if (response.ok) {
    const data = await response.json();

    dispatch(loadOne(data));
    return response;
  }
};

export const getSpotsByUser = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}/spots`);
  if (response.ok) {
    const data = await response.json();

    dispatch(load(data.spots));
    return response;
  }
};

export const deleteSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  dispatch(deleteOne(id));
  return response;
};
export const creasteSpot = (newList) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = newList;
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(addOne(data));

    return response;
  }
};

export const editOneSpot = (spotId, newList) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = newList;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addOne(data));

    return response;
  }
};

const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;

    case GET_ONE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE:
      newState = { ...state };

      delete newState[action.id];

      return newState;

    case ADD_ONE:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;

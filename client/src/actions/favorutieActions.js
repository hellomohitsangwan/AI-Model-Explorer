import axios from "axios";
import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_DELETE_ITEM,
} from "../constants/favouriteConstatnts";

export const addToFavourite = (id, qty) => async (dispatch, getState) => {
  //getState is just toState of whatever reducer we want preset in our state
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: FAVOURITE_ADD_ITEM,
    payload: {
      product: data.product._id,
      name: data.product.name,
      images: data.product.images,
    },
  });
  localStorage.setItem("favouriteItems", JSON.stringify(getState().cart.favouriteItems));
};
export const removeFromFavourite = (id) => async (dispatch, getState) => {
  dispatch({
    type: FAVOURITE_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem("favouriteItems", JSON.stringify(getState().cart.favouriteItems));
};
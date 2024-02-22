import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_DELETE_ITEM,
} from "../constants/cartConstatnts";

export const cartReducer = (
  state = { favouriteItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case FAVOURITE_ADD_ITEM:
      const item = action.payload;

      // check if the item exists in the cart already
      const existItem = state.favouriteItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }
    case FAVOURITE_DELETE_ITEM:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter((i) => i.product !== action.payload),
      };
    default:
      return state;
  }
};

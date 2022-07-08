import actionTypes from "./actionTypes";

export const addFavorite = (myWeather) => {
  return {
    type: actionTypes().favorite.addFavorite,
    payload: myWeather
  }
}

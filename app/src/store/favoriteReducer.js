import actionTypes from "./actionTypes";

const initState = {
  myFavoriteWeather: []
}

const favoriteReducer = (state = initState, action) => {

  switch(action.type) {
    case actionTypes().favorite.addFavorite:
      try {
        let _myWeather = {
          ...action.payload
        }

        state.myFavoriteWeather = [...state.myFavoriteWeather, _myWeather]
      } catch (err) {
        console.log(err)
      }
      return state;
      
      
    default:
      return state;
  }
  
}

export default favoriteReducer
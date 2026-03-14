export const favouriteReducer = (state, action) => {

  const photo = action.payload;

  const exists = state.find((item) => item.id === photo.id);

  if (exists) {
    return state.filter((item) => item.id !== photo.id);
  }

  return [...state, photo];
};
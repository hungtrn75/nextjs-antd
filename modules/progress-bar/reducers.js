const SHOW_LOADING_BAR = "SHOW_LOADING_BAR";
const HIDE_LOADING_BAR = "HIDE_LOADING_BAR";

export const showProgressBar = () => ({
  type: SHOW_LOADING_BAR
});
export const hideProgressBar = () => ({
  type: HIDE_LOADING_BAR
});

export default function(state = 0, action) {
  switch (action.type) {
    case SHOW_LOADING_BAR:
      return 100;
    case HIDE_LOADING_BAR:
      return 1;
    default:
      return state;
  }
}

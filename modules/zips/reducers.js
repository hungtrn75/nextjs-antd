import { GET_ZIPS_SUCCESS, GET_ZIPS_FAILED } from "./types";

export default function(
  state = {
    docs: [],
    page: 1,
    limit: 50,
    totalPages: null,
    error: ""
  },
  action
) {
  switch (action.type) {
    case GET_ZIPS_SUCCESS:
      return {
        ...state,
        docs: action.payload.docs,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages
      };
    case GET_ZIPS_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

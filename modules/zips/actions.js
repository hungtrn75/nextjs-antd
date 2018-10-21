import { GET_ZIPS } from "./types";

//Login user - Set User token
export const getZips = (page, limit) => ({
  type: GET_ZIPS,
  payload: { page, limit }
});

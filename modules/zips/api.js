import API from "../../utils/apiV2";
import { Api } from "../../constants/ApiRequests";

export function fetchZips(page, limit) {
  return API.request({
    url: `${Zip.URL_RESTFUL}?page=${page}&limit=${limit}`,
    method: "get"
  });
}

import axios from "axios";

const url = process.env.API_URL;
function addPostApi(postData) {
  return axios.request({
    url: `${url}/posts`,
    method: "post",
    data: postData
  });
}
function addCommentApi(id, commentData) {
  return axios.request({
    url: `${url}/posts/comment/${id}`,
    method: "post",
    data: commentData
  });
}
function getPostsApi() {
  return axios.request({
    url: `${url}/posts`,
    method: "get"
  });
}

function getPostApi(id) {
  return axios.request({
    url: `${url}/posts/${id}`,
    method: "get"
  });
}

function deletePostApi(id) {
  return axios.request({
    url: `${url}/posts/${id}`,
    method: "delete"
  });
}
function addLikeApi(id) {
  return axios.request({
    url: `${url}/posts/like/${id}`,
    method: "get"
  });
}
function removeLikeApi(id) {
  return axios.request({
    url: `${url}/posts/unlike/${id}`,
    method: "get"
  });
}
function deleteCommentApi(comment_id, post_id) {
  return axios.request({
    url: `${url}/posts/${post_id}/comments/${comment_id}`,
    method: "delete"
  });
}

function registerUserApi(userData) {
  return axios.request({
    url: `${url}/users/register`,
    method: "post",
    data: userData
  });
}

function loginUserApi(userData) {
  return axios.request({
    url: `${url}/users/login`,
    method: "post",
    data: userData
  });
}
//PROFILE
function getCurrentProfileApi() {
  return axios.request({
    url: `${url}/profile`,
    method: "get"
  });
}

function getProfilesApi() {
  return axios.request({
    url: `${url}/profile/all`,
    method: "get"
  });
}

function getProfileByHandleApi(handle) {
  return axios.request({
    url: `${url}/profile/handle/${handle}`,
    method: "get"
  });
}

function createProfileApi(profileData) {
  return axios.request({
    url: `${url}/profile`,
    method: "post",
    data: profileData
  });
}

function addExperienceApi(expData) {
  return axios.request({
    url: `${url}/profile/experience`,
    method: "post",
    data: expData
  });
}

function addEducationApi(eduData) {
  return axios.request({
    url: `${url}/profile/education`,
    method: "post",
    data: eduData
  });
}

function deleteExperienceApi(id) {
  return axios.request({
    url: `${url}/profile/experience/${id}`,
    method: "delete"
  });
}

function deleteEducationApi(id) {
  return axios.request({
    url: `${url}/profile/education/${id}`,
    method: "delete"
  });
}

function deleteAccountApi() {
  return axios.request({
    url: `${url}/profile`,
    method: "delete"
  });
}

function loadZips(page, limit) {
  try {
    return axios
      .get(`${url}/zips?page=${page}&limit=${limit}`)
      .then(res => res.data);
  } catch (error) {
    return error;
  }
}
function fetchZips({ page, limit }) {
  return axios.request({
    url: `${url}/zips?page=${page}&limit=${limit}`,
    method: "get"
  });
}

export const Api = {
  addPostApi,
  addCommentApi,
  getPostApi,
  getPostsApi,
  deleteCommentApi,
  deletePostApi,
  addLikeApi,
  removeLikeApi,
  registerUserApi,
  loginUserApi,
  getCurrentProfileApi,
  getProfilesApi,
  getProfileByHandleApi,
  createProfileApi,
  addExperienceApi,
  addEducationApi,
  deleteExperienceApi,
  deleteEducationApi,
  deleteAccountApi,
  loadZips,
  fetchZips
};

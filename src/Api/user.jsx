import axios from "axios";
import { b64toBlob } from "../Utils/convert";

export async function postUserOfKakao({ formData, access }) {
  try {
    const res = await axios.post("/users/kakao", formData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response.status;
  }
}

export function postUserOfApple(signUpForm) {
  return axios.post("/users/apple", signUpForm).then((res) => {
    return res.data;
  });
}

export function getUser() {
  return axios.get(`/users/me`).then((res) => {
    if (res.data.profileImage) {
      const file = b64toBlob(res.data.profileImage, "image/png");
      res.data.profileImage = URL.createObjectURL(file);
    }
    return res.data;
  });
}

export function patchUser(formData) {
  return axios.patch(`/users`, formData).then((res) => {
    if (res.data.profileImage) {
      const file = b64toBlob(res.data.profileImage, "image/png");
      res.data.profileImage = URL.createObjectURL(file);
    }
    return res.data;
  });
}

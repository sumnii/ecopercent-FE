import axios from "axios";
import { b64toBlob } from "../Utils/convert";

export function getItem(id) {
  return axios.get(`/items/${id}`).then((res) => {
    return res.data;
  });
}
export function postItem(formData) {
  return axios.post(`/items`, formData).then((res) => {
    return res.data;
  });
}

export function patchItem({
  itemId,
  itemImage,
  itemNickname,
  itemType,
  itemBrand,
  itemPrice,
  itemPurchaseDate,
}) {
  return axios
    .patch(`/items/${itemId}`, {
      image: itemImage,
      nickname: itemNickname,
      type: itemType,
      brand: itemBrand,
      price: itemPrice,
      purchaseDate: itemPurchaseDate,
    })
    .then((res) => {
      return res.data;
    });
}

export function getItemList(category) {
  return axios.get(`/items?category=${category}`).then((res) => {
    return res.data.map((item) => {
      if (item.image) {
        const file = b64toBlob(item.image, "image/png");
        return {
          ...item,
          image: URL.createObjectURL(file),
        };
      }
      return item;
    });
  });
}

export function deleteItem(itemId) {
  return axios.delete(`/items/${itemId}`).then((res) => {
    return res.data;
  });
}

export function patchUsageCountUp(itemId) {
  return axios.patch(`/items/${itemId}/up`).then((res) => {
    return res.data;
  });
}

export async function getTitleItem(category) {
  try {
    const res = await axios.get(`/users/me/title-${category}`);
    return res.data;
  } catch (e) {
    return null;
  }
}

export function patchTitleItem({ itemId, category }) {
  return axios.patch(`/items/${itemId}/title-${category}`).then((res) => {
    return res.data;
  });
}

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { useAxiosInterceptor } from "@hooks/useAxiosInterceptor";

const Main = loadable(() => {
  return import("@layout/Main/Main");
});
const ItemEdit = loadable(() => {
  return import("@pages/ItemModification/ItemEdit/ItemEdit");
});
const ItemAdd = loadable(() => {
  return import("@pages/ItemModification/ItemAdd/ItemAdd");
});
const TokenExpiration = loadable(() => {
  return import("@layout/Error/TokenExpiration");
});

export default function PrivateRouter() {
  useAxiosInterceptor();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:page" element={<Main />} />
        <Route path="/:page/:subPage" element={<Main />} />
        <Route path="/:page/:subPage/:accountDeletePage" element={<Main />} />
        <Route path="/item/edit" element={<ItemEdit />} />
        <Route path="/item/add" element={<ItemAdd />} />
        <Route path="/signout" element={<TokenExpiration />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

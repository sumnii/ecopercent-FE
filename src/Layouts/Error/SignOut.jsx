import React, { useContext, useEffect } from "react";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { Navigate, useNavigate } from "react-router-dom";
import { PcPageWrap } from "@layout/Main/style";
import * as S from "./style";

export default function SignOut() {
  const state = localStorage.getItem("out");
  if (!state) return <Navigate to="/" />;

  const { authenticated, signOut } = useContext(AuthenticatedContext);
  const navigate = useNavigate();

  if (authenticated) signOut();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("out");
      navigate("/");
    }, 5000);
  });

  return (
    <PcPageWrap style={{ height: "100vh", padding: "0" }}>
      <S.PageLayout>
        <S.WarningIcon />
        <S.Headline>세션이 만료되었습니다.</S.Headline>
        <S.NotificationText>잠시 후 메인으로 이동합니다.</S.NotificationText>
        <S.GoHomeBtn
          onClick={() => {
            navigate("/");
          }}
        >
          메인 화면
        </S.GoHomeBtn>
      </S.PageLayout>
    </PcPageWrap>
  );
}

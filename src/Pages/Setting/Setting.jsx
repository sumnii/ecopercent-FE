import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountInfo from "./AccountInfo";
import Error from "@layout/Error/Error";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import * as S from "./style";

const Setting = () => {
  const { subPage } = useParams();
  const navigate = useNavigate();

  const appArr = [
    {
      label: "앱 소개",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
    {
      label: "개발팀",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
    {
      label: "도움말",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
  ];

  const notificationArr = [
    {
      label: "운영방침",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
    {
      label: "개인정보처리방침",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
    {
      label: "문의처",
      style: S.HoverPlain,
      onClickHandler: () => {
        console.log("노션 페이지로 리디렉션");
      },
    },
  ];

  const { signOut } = useContext(AuthenticatedContext);
  const logOut = async () => {
    try {
      await axios.post("/signout");
      signOut();
    } catch (err) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  if (subPage) {
    return subPage === "accountInfo" ? <AccountInfo /> : <Error />;
  }

  return (
    <S.SettingWrap>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.Category>계정</S.Category>
      <S.HoverPlain
        onClick={() => {
          navigate("accountInfo");
        }}
      >
        회원 정보
      </S.HoverPlain>
      <hr />
      <S.Category>앱</S.Category>
      {appArr.map((element) => {
        return (
          <element.style key={element.label} onClick={element.onClickHandler}>
            {element.label}
          </element.style>
        );
      })}
      <hr />
      <S.Category>안내</S.Category>
      {notificationArr.map((element) => {
        return (
          <element.style key={element.label} onClick={element.onClickHandler}>
            {element.label}
          </element.style>
        );
      })}
      <hr />
      <S.Logout onClick={logOut}>로그아웃</S.Logout>
    </S.SettingWrap>
  );
};

export default Setting;

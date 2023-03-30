import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export function getLogin() {
  return localStorage.getItem("userId");
}

const Login = () => {
  const navigate = useNavigate();
  const userId = useRef();

  return (
    <S.LoginLayout>
      <S.TmpLogo>로고</S.TmpLogo>
      <S.LoginBox>
        <S.Line />
        <S.ContinueWith>Continue With</S.ContinueWith>
        {/* 소셜 로그인 버튼들 들어갈 곳 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("userId", userId.current.value);
            navigate("/main/home");
          }}
        >
          <input type="number" ref={userId} />
          <button type="submit">로그인</button>
        </form>
        <S.Line />
      </S.LoginBox>
      <S.SloganSpan>에코퍼센트 슬로건 한줄.</S.SloganSpan>
    </S.LoginLayout>
  );
};
export default Login;

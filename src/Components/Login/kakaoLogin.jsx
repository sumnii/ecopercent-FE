import axios from "axios";
import cookie from "react-cookies";
import { scriptLoad } from "../../Utils/script";

export async function kakaoLogin() {
  const name = "KAKAO";
  const src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
  const crossOrigin = "anonymous";

  try {
    await scriptLoad({ name, src, crossOrigin });
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    window.Kakao.Auth.authorize({
      redirectUri: process.env[`REACT_APP_${name}_REDIRECT_URI`],
    });
  } catch (error) {
    // 카카오 서버 안될 때
    console.error(error);
  }

  return null;
}

async function postKakaoToken({ kakaoAccessToken, navigate }) {
  try {
    const response = await axios.get("/login/oauth2/kakao", {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });
    if (response.status === 200) {
      navigate("/home");
    }
  } catch (err) {
    if (err.response.status === 404) {
      cookie.save("email", err.response.data, { path: "/signup" });
      navigate("/signup");
    } else {
      // 서버 안될 때
      navigate("/");
    }
  }
}

export async function getKakaoToken({ authCode, navigate }) {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: `${process.env.REACT_APP_KAKAO_JS_KEY}`,
        redirect_uri: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
        code: `${authCode}`,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    if (response.status === 200) {
      postKakaoToken({
        kakaoAccessToken: response.data.access_token,
        navigate,
      });
    } else {
      navigate("/");
    }
  } catch (err) {
    // 유저가 취소했을 때
    navigate("/");
  }
}

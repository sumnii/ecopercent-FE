import React, { useRef, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { getUser, patchUser } from "../../../../Api/user";
import ProfileImg from "./ProfileImg";
import ProfileText from "./ProfileText";
import ProfileBtns from "./ProfileBtns";
import * as S from "./style";

export default function ProfileEditor({ setIsEditing }) {
  const isMobile = useMediaQuery({
    query: "(max-width:470px)",
  });
  const queryClient = useQueryClient();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  if (userQuery.isError) console.log(JSON.stringify(userQuery.error));

  const [userData, setUserData] = useState({
    nickname: userQuery.data.nickname,
    profileMessage: userQuery.data.profileMessage,
  });
  const [userImgFile, setUserImgFile] = useState(userQuery.data.profileImage);
  const [preview, setPreview] = useState(null);
  const imgUrl = useRef(userQuery.data.profileImage);

  const profileEditMutation = useMutation({
    mutationFn: patchUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.refetchQueries(["user"]);
      URL.revokeObjectURL(imgUrl);
      setIsEditing();
    },
  });

  function handleSubmit() {
    const formData = new FormData();
    formData.append(
      "userData",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    );
    if (preview)
      formData.append("profileImage", new File([userImgFile], "profileImage"));
    else formData.append("profileImage", null);
    profileEditMutation.mutate(formData);
    return profileEditMutation.mutateAsync;
  }

  return (
    <S.ProfileContainer isMobile={isMobile}>
      <S.ProfileImgTextWrapper isMobile={isMobile}>
        <ProfileImg
          imgFile={userImgFile}
          setImgFile={setUserImgFile}
          preview={preview}
          setPreview={setPreview}
        />
        <ProfileText
          userData={userData}
          setUserData={setUserData}
          isMobile={isMobile}
        />
      </S.ProfileImgTextWrapper>
      <ProfileBtns
        setIsEditing={setIsEditing}
        handleSubmit={() => {
          return handleSubmit();
        }}
      />
    </S.ProfileContainer>
  );
}

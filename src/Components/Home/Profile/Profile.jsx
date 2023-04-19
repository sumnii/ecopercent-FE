import React, { useState } from "react";
import ProfileViewer from "./ProfileViewer/ProfileViewer";
import ProfileEditor from "./ProfileEditor/ProfileEditor";
import { getUserId } from "../../../Layouts/Login/Login";

export default function Profile() {
  const userId = getUserId();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing)
    return (
      <ProfileEditor
        userId={userId}
        setIsEditing={() => {
          return setIsEditing(!isEditing);
        }}
      />
    );

  return (
    <ProfileViewer
      userId={userId}
      setIsEditing={() => {
        return setIsEditing(!isEditing);
      }}
    />
  );
}

import { useEffect } from "react";
import MainInfoProfile from "../components/MainInfoProfile";
import ProfileTabs from "../components/ProfileTabs";

export default function UserProfile () {

  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <>
      <MainInfoProfile />
      <ProfileTabs />
    </>
  )
}
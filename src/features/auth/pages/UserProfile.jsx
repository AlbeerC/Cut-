import { useEffect } from "react";
import MainInfoProfile from "../components/MainInfoProfile";
import ProfileTabs from "../components/ProfileTabs";
import { signOut } from "../lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function UserProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()

  const logout = () => {
    signOut();
    navigate("/login")
  };

  return (
    <>
      <MainInfoProfile />
      <ProfileTabs />

      <Button
        variant="default"
        size="sm"
        onClick={logout}
        className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 m-8"
      >
        <LogOut className="h-4 w-4" />
        <span className="font-medium">Cerrar sesión</span>
      </Button>
    </>
  );
}

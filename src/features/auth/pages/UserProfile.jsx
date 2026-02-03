import { useEffect, useState } from "react";
import MainInfoProfile from "../components/MainInfoProfile";
import ProfileTabs from "../components/ProfileTabs";
import { signOut } from "../lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useProfileStats } from "../hooks/useProfileStats";
import { useAuth } from "../context/AuthContext";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProfileNotFound from "../components/ProfileNotFound";

export default function UserProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setProfileData(null);
        } else {
          setProfileError(error);
        }
      } else {
        setProfileData(data);
      }

      setProfileLoading(false);
    };

    fetchProfile();
  }, [username]);

  const { user } = useAuth();

  const userId = profileData ? profileData.id : null;

  const { data, loading, error } = useProfileStats(userId);

  const isOwnProfile = user?.id === profileData?.id;

  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  if (profileLoading || loading || !data || !data.stats) return <ProfileSkeleton />;

  if (profileError || error) {
    return <div>Error al cargar perfil</div>;
  }

  if (!profileData) {
    return <ProfileNotFound />;
  }

  return (
    <>
      <MainInfoProfile
        stats={data.stats}
        profileStats={data.profile}
        recentGames={data.recentGames}
        achievements={data.achievements}
        profile={profileData}
        isOwnProfile={isOwnProfile}
      />
      <ProfileTabs
        activity={data.activity}
        games={data.gamesByType}
        stats={data.stats}
        general={data.generalStats}
      />

      {isOwnProfile && (
        <Button
          variant="default"
          size="sm"
          onClick={logout}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 m-8"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Cerrar sesión</span>
        </Button>
      )}
    </>
  );
}

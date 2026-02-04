import { useEffect, useState } from "react";
import {
  fetchProfileBase,
  fetchProfileStats,
  fetchRecentGames,
  fetchActivityFeed,
  fetchGameTypeStats,
  fetchTimelineAccuracy,
  fetchGeneralStats,
  fetchAchievements,
} from "../api/profileStats.api";
import { mapRecentGamesToUI } from "../helpers/profileMappers";
import { mapActivityToUI } from "../helpers/activityMapper";
import { mapGamesStatsToUI } from "../helpers/gamesMapper";
import { mapGeneralStatsToUI } from "../helpers/generalStatsMapper";
import { mapAchievementsToUI } from "../helpers/achievementsMapper";

const EMPTY_PROFILE_STATS = {
  profile: {},
  stats: {},
  recentGames: [],
  activity: [],
  gamesByType: [],
  timelineAccuracy: null,
  generalStats: {},
  achievements: [],
};

export function useProfileStats(userId) {
  const [data, setData] = useState(EMPTY_PROFILE_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setData(EMPTY_PROFILE_STATS);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProfileData() {
      setLoading(true);

      try {
        const [
          profileRes,
          statsRes,
          recentRes,
          activityRes,
          gameTypeRes,
          timelineRes,
          generalRes,
          achievementsRes,
        ] = await Promise.all([
          fetchProfileBase(userId),
          fetchProfileStats(userId),
          fetchRecentGames(userId),
          fetchActivityFeed(userId),
          fetchGameTypeStats(userId),
          fetchTimelineAccuracy(userId),
          fetchGeneralStats(userId),
          fetchAchievements(userId),
        ]);

        if (cancelled) return;

        setData({
          profile: profileRes.data ?? {},
          stats: statsRes.data ?? {},
          recentGames: mapRecentGamesToUI(recentRes.data ?? []),
          activity: mapActivityToUI(activityRes.data ?? []),
          gamesByType: mapGamesStatsToUI(
            gameTypeRes.data ?? [],
            timelineRes?.data ?? null,
          ),
          timelineAccuracy: timelineRes?.data ?? null,
          generalStats: mapGeneralStatsToUI(generalRes?.data ?? {}),
          achievements: mapAchievementsToUI(achievementsRes?.data ?? []),
        });
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData(EMPTY_PROFILE_STATS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfileData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { data, loading, error };
}

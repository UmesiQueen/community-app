import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { safeObj } from "~/lib/data.helpers";
import type { Profile } from "~/types/models";

export function useProfile() {
  const profile = useQuery(api.profiles.getProfile);
  const isLoading = profile === undefined;

  const safeProfile: Profile | null = safeObj(profile);

  return {
    profile: safeProfile,
    isLoading,
  };
}

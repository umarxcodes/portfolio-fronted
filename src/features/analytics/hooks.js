import { useMutation, useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/features/analytics/api";
import { queryKeys } from "@/constants/queryKeys";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: queryKeys.analytics.overview,
    queryFn: analyticsApi.overview,
    refetchOnWindowFocus: true,
  });
}

export function useAnalyticsMonthly(months = 6) {
  return useQuery({
    queryKey: queryKeys.analytics.monthly(months),
    queryFn: () => analyticsApi.monthly(months),
  });
}

export function useAnalyticsTopProjects() {
  return useQuery({
    queryKey: queryKeys.analytics.projects,
    queryFn: analyticsApi.projects,
  });
}

export function useAnalyticsTopBlogs() {
  return useQuery({
    queryKey: queryKeys.analytics.blogs,
    queryFn: analyticsApi.blogs,
  });
}

export function useAnalyticsContact() {
  return useQuery({
    queryKey: queryKeys.analytics.contact,
    queryFn: analyticsApi.contact,
  });
}

export function useTrackAnalytics() {
  return useMutation({
    mutationFn: (payload) => analyticsApi.track(payload),
  });
}

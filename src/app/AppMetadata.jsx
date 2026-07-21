import { useEffect } from "react";
import { useProfile } from "@/features/profile";
import { useSettings } from "@/features/settings";
import { getIdentityProfile, getIdentitySettings, identity } from "@/config/identity";

function setMeta(selector, attrs) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    Object.entries(attrs.create || {}).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  }
  Object.entries(attrs.update || {}).forEach(([key, value]) => node.setAttribute(key, value));
}

export function AppMetadata() {
  const { data: profileData } = useProfile({ retry: false });
  const { data: settingsData } = useSettings({ retry: false });

  useEffect(() => {
    const profile = getIdentityProfile(profileData?.profile);
    const settings = getIdentitySettings(settingsData?.settings);
    const title = settings.seoTitle || profile.name || identity.name;
    const description = settings.seoDescription || settings.siteDescription || profile.bio;
    const url = window.location.origin;

    document.title = title;
    setMeta('meta[name="description"]', {
      create: { name: "description" },
      update: { content: description },
    });
    setMeta('meta[property="og:title"]', {
      create: { property: "og:title" },
      update: { content: title },
    });
    setMeta('meta[property="og:description"]', {
      create: { property: "og:description" },
      update: { content: description },
    });
    setMeta('meta[property="og:site_name"]', {
      create: { property: "og:site_name" },
      update: { content: identity.name },
    });
    setMeta('meta[property="og:url"]', {
      create: { property: "og:url" },
      update: { content: url },
    });
    setMeta('meta[name="twitter:title"]', {
      create: { name: "twitter:title" },
      update: { content: title },
    });
    setMeta('meta[name="twitter:description"]', {
      create: { name: "twitter:description" },
      update: { content: description },
    });
  }, [profileData, settingsData]);

  return null;
}

export default AppMetadata;

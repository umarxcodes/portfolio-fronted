export function getInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "MU";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const identity = {
  name: "Muhammad Umar",
  monogram: "MU",
  email: "muhammadumar.codes@gmail.com",
  location: "Peshawar, Pakistan",
  profileImage:
    "https://res.cloudinary.com/dlul8f6xz/image/upload/v1784509172/Fresh-compressed_sabqhc.png",
  github: "https://github.com/umarxcodes",
  linkedin: "https://www.linkedin.com/in/umarxcodes",
  whatsappNumber: "+923010568885",
  whatsappUrl: "https://wa.me/923010568885",
  title: "Full Stack Developer",
  siteDescription:
    "Muhammad Umar builds production-grade web applications with thoughtful interfaces, reliable APIs, and clear engineering tradeoffs.",
};

export function getIdentityProfile(profile) {
  return {
    ...profile,
    name: profile?.name || identity.name,
    email: profile?.email || identity.email,
    location: profile?.location || identity.location,
    profileImage: profile?.profileImage || identity.profileImage,
    title: profile?.title || identity.title,
    bio: profile?.bio || identity.siteDescription,
    shortBio: profile?.shortBio || identity.siteDescription,
    socialLinks: {
      github: profile?.socialLinks?.github || identity.github,
      linkedin: profile?.socialLinks?.linkedin || identity.linkedin,
      portfolio: profile?.socialLinks?.portfolio || "",
      twitter: profile?.socialLinks?.twitter || "",
    },
  };
}

export function getIdentitySettings(settings) {
  return {
    ...settings,
    siteTitle: settings?.siteTitle || identity.name,
    siteDescription: settings?.siteDescription || identity.siteDescription,
    seoTitle: settings?.seoTitle || identity.name,
    seoDescription: settings?.seoDescription || identity.siteDescription,
    contactEmail: settings?.contactEmail || identity.email,
    contactPhone: settings?.contactPhone || identity.whatsappNumber,
    socialLinks: {
      github: settings?.socialLinks?.github || identity.github,
      linkedin: settings?.socialLinks?.linkedin || identity.linkedin,
      twitter: settings?.socialLinks?.twitter || "",
      youtube: settings?.socialLinks?.youtube || "",
    },
  };
}

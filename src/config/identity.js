const PLACEHOLDER_EMAIL_DOMAINS = ["example.com", "example.org", "test.com", "mailinator.com"];
const PLACEHOLDER_HOSTS = ["example.com", "test.com", "localhost"];
const PLACEHOLDER_LOCATION_HINTS = [
  "karachi",
  "lahore",
  "islamabad",
  "new york",
  "london",
  "tokyo",
  "paris",
];

function isPlaceholderEmail(email) {
  const v = String(email || "")
    .trim()
    .toLowerCase();
  if (!v || v === "undefined" || v === "null") return true;
  return PLACEHOLDER_EMAIL_DOMAINS.some((d) => v.endsWith(`@${d}`) || v.includes(d));
}

function isPlaceholderUrl(url) {
  const v = String(url || "")
    .trim()
    .toLowerCase();
  if (!v || v === "undefined" || v === "null") return true;
  return PLACEHOLDER_HOSTS.some((h) => v.includes(h));
}

function isPlaceholderLocation(location) {
  const v = String(location || "")
    .trim()
    .toLowerCase();
  if (!v || v === "undefined" || v === "null") return true;
  return PLACEHOLDER_LOCATION_HINTS.some((hint) => v.includes(hint));
}

function pick(apiValue, fallback, checker) {
  const v = apiValue;
  if (v == null || String(v).trim() === "") return fallback;
  if (checker && checker(v)) return fallback;
  return v;
}

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
  title: "Full-Stack Engineer",
  siteDescription:
    "Building scalable web applications, distributed backend systems, and AI-powered products with modern technologies.",
  yearsOfExperience: 2,
};

export function getIdentityProfile(profile) {
  return {
    ...profile,
    name: profile?.name || identity.name,
    email: pick(profile?.email, identity.email, isPlaceholderEmail),
    location: pick(profile?.location, identity.location, isPlaceholderLocation),
    profileImage: pick(profile?.profileImage, identity.profileImage, isPlaceholderUrl),
    title: profile?.title || identity.title,
    bio: profile?.bio || identity.siteDescription,
    shortBio: profile?.shortBio || identity.siteDescription,
    yearsOfExperience: profile?.yearsOfExperience ?? identity.yearsOfExperience,
    socialLinks: {
      github: pick(profile?.socialLinks?.github, identity.github, isPlaceholderUrl),
      linkedin: pick(profile?.socialLinks?.linkedin, identity.linkedin, isPlaceholderUrl),
      portfolio: pick(profile?.socialLinks?.portfolio, "", isPlaceholderUrl),
      twitter: pick(profile?.socialLinks?.twitter, "", isPlaceholderUrl),
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
    contactEmail: pick(settings?.contactEmail, identity.email, isPlaceholderEmail),
    contactPhone: settings?.contactPhone || identity.whatsappNumber,
    socialLinks: {
      github: pick(settings?.socialLinks?.github, identity.github, isPlaceholderUrl),
      linkedin: pick(settings?.socialLinks?.linkedin, identity.linkedin, isPlaceholderUrl),
      twitter: pick(settings?.socialLinks?.twitter, "", isPlaceholderUrl),
      youtube: pick(settings?.socialLinks?.youtube, "", isPlaceholderUrl),
    },
  };
}

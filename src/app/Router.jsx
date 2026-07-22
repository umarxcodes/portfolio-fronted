import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PrivateRoute, GuestRoute } from "@/routes/Guards";
import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";
import { RouteFallback } from "@/app/RouteFallback";
import { PageTransition } from "@/motion";
import { routes } from "@/constants/routes";

// Public pages
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const ProjectsPage = lazy(() => import("@/features/projects/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/features/projects/pages/ProjectDetailPage"));
const BlogPage = lazy(() => import("@/features/blogs/pages/BlogPage"));
const BlogDetailPage = lazy(() => import("@/features/blogs/pages/BlogDetailPage"));
const SearchPage = lazy(() => import("@/features/search/pages/SearchPage"));
const ContactPage = lazy(() => import("@/features/contact/pages/ContactPage"));

// Auth
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const AccountPage = lazy(() => import("@/features/auth/pages/AccountPage"));

// Admin pages
const DashboardPage = lazy(() => import("@/features/analytics/pages/DashboardPage"));
const ProfileAdminPage = lazy(() => import("@/features/profile/pages/ProfileAdminPage"));
const ProjectsAdminPage = lazy(() => import("@/features/projects/pages/ProjectsAdminPage"));
const ProjectFormPage = lazy(() => import("@/features/projects/pages/ProjectFormPage"));
const SkillsAdminPage = lazy(() => import("@/features/skills/pages/SkillsAdminPage"));
const ExperienceAdminPage = lazy(() => import("@/features/experience/pages/ExperienceAdminPage"));
const EducationAdminPage = lazy(() => import("@/features/education/pages/EducationAdminPage"));
const CertificatesAdminPage = lazy(
  () => import("@/features/certificates/pages/CertificatesAdminPage")
);
const BlogsAdminPage = lazy(() => import("@/features/blogs/pages/BlogsAdminPage"));
const BlogFormPage = lazy(() => import("@/features/blogs/pages/BlogFormPage"));
const ContactAdminPage = lazy(() => import("@/features/contact/pages/ContactAdminPage"));
const ContactDetailPage = lazy(() => import("@/features/contact/pages/ContactDetailPage"));
const UploadsAdminPage = lazy(() => import("@/features/uploads/pages/UploadsAdminPage"));
const SettingsAdminPage = lazy(() => import("@/features/settings/pages/SettingsAdminPage"));
const NotFoundPage = lazy(() => import("@/features/misc/pages/NotFoundPage"));

export function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.projects} element={<ProjectsPage />} />
            <Route path={routes.projectCategory} element={<ProjectsPage />} />
            <Route path={routes.projectDetail} element={<ProjectDetailPage />} />
            <Route path={routes.blog} element={<BlogPage />} />
            <Route path={routes.blogCategory} element={<BlogPage />} />
            <Route path={routes.blogTag} element={<BlogPage />} />
            <Route path={routes.blogDetail} element={<BlogDetailPage />} />
            <Route path={routes.search} element={<SearchPage />} />
            <Route path={routes.contact} element={<ContactPage />} />
          </Route>

          {/* Auth */}
          <Route
            path={routes.login}
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfileAdminPage />} />
            <Route path="projects" element={<ProjectsAdminPage />} />
            <Route path="projects/new" element={<ProjectFormPage />} />
            <Route path="projects/:id" element={<ProjectFormPage />} />
            <Route path="skills" element={<SkillsAdminPage />} />
            <Route path="experience" element={<ExperienceAdminPage />} />
            <Route path="education" element={<EducationAdminPage />} />
            <Route path="certificates" element={<CertificatesAdminPage />} />
            <Route path="blogs" element={<BlogsAdminPage />} />
            <Route path="blogs/new" element={<BlogFormPage />} />
            <Route path="blogs/:id" element={<BlogFormPage />} />
            <Route path="contact" element={<ContactAdminPage />} />
            <Route path="contact/:id" element={<ContactDetailPage />} />
            <Route path="uploads" element={<UploadsAdminPage />} />
            <Route path="analytics" element={<DashboardPage />} />
            <Route path="settings" element={<SettingsAdminPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

export default AppRoutes;

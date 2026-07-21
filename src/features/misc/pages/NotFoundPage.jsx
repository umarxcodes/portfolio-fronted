import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui";
import { routes } from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-4 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
        <Compass className="h-8 w-8" />
      </span>
      <p className="font-heading text-6xl font-bold text-content-primary">404</p>
      <h1 className="mt-2 font-heading text-2xl font-semibold text-content-primary">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-content-secondary">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-7 flex gap-3">
        <Button as={Link} to="/">
          Go home
        </Button>
        <Button as={Link} to={routes.projects} variant="secondary">
          View projects
        </Button>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { Button, Field, Input } from "@/components/ui";
import { loginSchema } from "@/features/auth/validation";
import { useLogin } from "@/features/auth";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { routes } from "@/constants/routes";
import { identity } from "@/config/identity";

export default function LoginPage() {
  const login = useLogin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || routes.admin.dashboard;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      await login.mutateAsync(values);
      toast.success("Signed in");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="surface-grid absolute inset-0 opacity-30" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 font-heading text-sm font-bold text-brand-fg">
              MU
            </span>
            <span className="font-heading text-xl font-bold text-content-primary">
              {identity.name}
            </span>
          </Link>
          <h1 className="mt-6 font-heading text-2xl font-bold text-content-primary">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Access the control center to manage your content.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
        >
          <Field label="Email" required error={errors.email?.message}>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
              <Input
                type="email"
                placeholder="admin@example.com"
                className="pl-10"
                error={errors.email}
                {...register("email")}
              />
            </div>
          </Field>
          <Field label="Password" required error={errors.password?.message}>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                error={errors.password}
                {...register("password")}
              />
            </div>
          </Field>
          <Button type="submit" fullWidth isLoading={login.isPending} loadingText="Signing in…">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-content-muted">
          <Link to="/" className="text-brand-500 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

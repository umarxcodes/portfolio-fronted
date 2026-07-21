import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { Button, Field, Input, Card, CardHeader, CardTitle, CardBody } from "@/components/ui";
import { useAuthProfile, useChangePassword } from "@/features/auth";
import { changePasswordSchema } from "@/features/auth/validation";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";

export default function AccountPage() {
  const { data } = useAuthProfile();
  const changePassword = useChangePassword();
  const { toast } = useToast();
  const admin = data?.admin;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = async (values) => {
    try {
      await changePassword.mutateAsync(values);
      toast.success("Password changed successfully");
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-content-primary">Account</h1>
        <p className="mt-1 text-sm text-content-secondary">
          Manage your admin profile and password.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-2xs uppercase tracking-wide text-content-muted">Name</p>
            <p className="text-sm text-content-primary">{admin?.name}</p>
          </div>
          <div>
            <p className="text-2xs uppercase tracking-wide text-content-muted">Email</p>
            <p className="text-sm text-content-primary">{admin?.email}</p>
          </div>
          <div>
            <p className="text-2xs uppercase tracking-wide text-content-muted">Role</p>
            <p className="text-sm capitalize text-content-primary">{admin?.role}</p>
          </div>
          <div>
            <p className="text-2xs uppercase tracking-wide text-content-muted">Last login</p>
            <p className="text-sm text-content-primary">
              {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "—"}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-brand-500" /> Change password
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="Current password" required error={errors.currentPassword?.message}>
              <Input
                type="password"
                error={errors.currentPassword}
                {...register("currentPassword")}
              />
            </Field>
            <Field
              label="New password"
              required
              error={errors.newPassword?.message}
              hint="8+ chars, with uppercase, lowercase, number, and special character."
            >
              <Input type="password" error={errors.newPassword} {...register("newPassword")} />
            </Field>
            <Field label="Confirm new password" required error={errors.confirmNewPassword?.message}>
              <Input
                type="password"
                error={errors.confirmNewPassword}
                {...register("confirmNewPassword")}
              />
            </Field>
            <Button
              type="submit"
              isLoading={changePassword.isPending}
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              Update password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

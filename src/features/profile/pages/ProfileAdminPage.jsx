import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Save } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/BrandIcons";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Field,
  Input,
  Textarea,
  Switch,
  ErrorState,
} from "@/components/ui";
import { useProfile, useUpdateProfile } from "@/features/profile";
import { updateProfileSchema } from "@/features/profile/validation";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";

export default function ProfileAdminPage() {
  const { data, isLoading, isError, error } = useProfile();
  const update = useUpdateProfile();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    const p = data?.profile;
    if (p) {
      reset({
        name: p.name || "",
        title: p.title || "",
        bio: p.bio || "",
        shortBio: p.shortBio || "",
        email: p.email || "",
        phone: p.phone || "",
        location: p.location || "",
        profileImage: p.profileImage || "",
        resumeUrl: p.resumeUrl || "",
        availability: Boolean(p.availability),
        yearsOfExperience: p.yearsOfExperience || 0,
        socialLinks: {
          github: p.socialLinks?.github || "",
          linkedin: p.socialLinks?.linkedin || "",
          portfolio: p.socialLinks?.portfolio || "",
          twitter: p.socialLinks?.twitter || "",
        },
      });
    }
  }, [data, reset]);

  const availability = watch("availability");

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      yearsOfExperience: Number(values.yearsOfExperience),
      socialLinks: values.socialLinks,
    };
    try {
      await update.mutateAsync(payload);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <div className="py-20 text-center text-content-muted">Loading…</div>;
  if (isError) return <ErrorState message={getErrorMessage(error)} />;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-content-primary">Profile</h1>
        <p className="mt-1 text-sm text-content-secondary">
          This information powers your public home page.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required error={errors.name?.message}>
                <Input error={errors.name} {...register("name")} />
              </Field>
              <Field label="Title" required error={errors.title?.message}>
                <Input error={errors.title} {...register("title")} />
              </Field>
              <Field label="Email" required error={errors.email?.message}>
                <Input type="email" error={errors.email} {...register("email")} />
              </Field>
              <Field label="Years of experience" required error={errors.yearsOfExperience?.message}>
                <Input
                  type="number"
                  min={0}
                  error={errors.yearsOfExperience}
                  {...register("yearsOfExperience")}
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <Input error={errors.phone} {...register("phone")} />
              </Field>
              <Field label="Location" error={errors.location?.message}>
                <Input error={errors.location} {...register("location")} />
              </Field>
            </div>
            <Field label="Short bio" error={errors.shortBio?.message} hint="Max 160 characters">
              <Input maxLength={160} error={errors.shortBio} {...register("shortBio")} />
            </Field>
            <Field label="Bio" required error={errors.bio?.message}>
              <Textarea rows={5} error={errors.bio} {...register("bio")} />
            </Field>
            <div className="flex items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
              <div>
                <p className="text-sm font-medium text-content-primary">
                  Available for opportunities
                </p>
                <p className="text-2xs text-content-muted">
                  Shown as a status badge on your home page.
                </p>
              </div>
              <Switch checked={availability} onChange={(v) => setValue("availability", v)} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <FileUploadField
              folder="profile"
              value={watch("profileImage") || ""}
              onChange={(v) => setValue("profileImage", v)}
              label="Profile image"
              acceptHint="JPG, PNG, or WebP · up to 5 MB"
            />
            <Field
              label="Resume URL"
              error={errors.resumeUrl?.message}
              hint="Upload a PDF to the Uploads section, or paste a link."
            >
              <Input
                placeholder="https://…/resume.pdf"
                error={errors.resumeUrl}
                {...register("resumeUrl")}
              />
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social links</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="GitHub" error={errors.socialLinks?.github?.message}>
              <div className="relative">
                <GithubIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input
                  className="pl-10"
                  placeholder="https://github.com/…"
                  {...register("socialLinks.github")}
                />
              </div>
            </Field>
            <Field label="LinkedIn" error={errors.socialLinks?.linkedin?.message}>
              <div className="relative">
                <LinkedinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input
                  className="pl-10"
                  placeholder="https://linkedin.com/in/…"
                  {...register("socialLinks.linkedin")}
                />
              </div>
            </Field>
            <Field label="Portfolio" error={errors.socialLinks?.portfolio?.message}>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input
                  className="pl-10"
                  placeholder="https://…"
                  {...register("socialLinks.portfolio")}
                />
              </div>
            </Field>
            <Field label="Twitter / X" error={errors.socialLinks?.twitter?.message}>
              <div className="relative">
                <TwitterIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input
                  className="pl-10"
                  placeholder="https://twitter.com/…"
                  {...register("socialLinks.twitter")}
                />
              </div>
            </Field>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={update.isPending}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

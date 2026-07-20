import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Settings as SettingsIcon, PaintBucket } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/common/BrandIcons";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Field,
  Input,
  Textarea,
  Select,
  Switch,
  ErrorState,
} from "@/components/ui";
import { updateSettingsSchema } from "@/features/settings/validation";
import { useSettings, useUpdateSettings } from "@/features/settings";
import { SETTINGS_THEMES } from "@/constants/enums";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";

export default function SettingsAdminPage() {
  const { data, isLoading, isError, error } = useSettings();
  const update = useUpdateSettings();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(updateSettingsSchema) });

  useEffect(() => {
    const s = data?.settings;
    if (s) {
      reset({
        siteTitle: s.siteTitle || "",
        siteDescription: s.siteDescription || "",
        seoTitle: s.seoTitle || "",
        seoDescription: s.seoDescription || "",
        keywords: s.keywords || [],
        socialLinks: {
          github: s.socialLinks?.github || "",
          linkedin: s.socialLinks?.linkedin || "",
          twitter: s.socialLinks?.twitter || "",
          youtube: s.socialLinks?.youtube || "",
        },
        theme: s.theme || "system",
        logo: s.logo || "",
        favicon: s.favicon || "",
        contactEmail: s.contactEmail || "",
        contactPhone: s.contactPhone || "",
        maintenanceMode: Boolean(s.maintenanceMode),
      });
    }
  }, [data, reset]);

  const maintenance = watch("maintenanceMode");

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      keywords: values.keywords || [],
      socialLinks: values.socialLinks,
    };
    try {
      await update.mutateAsync(payload);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <div className="py-20 text-center text-content-muted">Loading…</div>;
  if (isError) return <ErrorState message={getErrorMessage(error)} />;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-content-primary">Settings</h1>
        <p className="mt-1 text-sm text-content-secondary">
          Branding, SEO, and public-site behavior.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4 text-brand-500" />
              General
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="Site title" error={errors.siteTitle?.message}>
              <Input error={errors.siteTitle} {...register("siteTitle")} />
            </Field>
            <Field label="Site description" error={errors.siteDescription?.message}>
              <Textarea rows={2} error={errors.siteDescription} {...register("siteDescription")} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contact email" error={errors.contactEmail?.message}>
                <Input type="email" error={errors.contactEmail} {...register("contactEmail")} />
              </Field>
              <Field label="Contact phone" error={errors.contactPhone?.message}>
                <Input error={errors.contactPhone} {...register("contactPhone")} />
              </Field>
            </div>
            <Field label="Keywords" hint="Press Enter to add each">
              <Input {...register("keywords")} placeholder="react, node, portfolio" disabled />
            </Field>
            <p className="text-2xs text-content-muted">
              Keywords are managed via the API; comma support coming soon.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4 text-brand-500" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="Default theme" error={errors.theme?.message}>
              <Select error={errors.theme} {...register("theme")}>
                {SETTINGS_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Logo URL" error={errors.logo?.message}>
              <Input placeholder="https://…/logo.svg" error={errors.logo} {...register("logo")} />
            </Field>
            <Field label="Favicon URL" error={errors.favicon?.message}>
              <Input
                placeholder="https://…/favicon.svg"
                error={errors.favicon}
                {...register("favicon")}
              />
            </Field>
            <div className="flex items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
              <div>
                <p className="text-sm font-medium text-content-primary">Maintenance mode</p>
                <p className="text-2xs text-content-muted">
                  Hides the public site; admin stays available.
                </p>
              </div>
              <Switch checked={maintenance} onChange={(v) => setValue("maintenanceMode", v)} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="SEO title" error={errors.seoTitle?.message} hint="Max 60 characters">
              <Input maxLength={60} error={errors.seoTitle} {...register("seoTitle")} />
            </Field>
            <Field
              label="SEO description"
              error={errors.seoDescription?.message}
              hint="Max 160 characters"
            >
              <Textarea
                rows={2}
                maxLength={160}
                error={errors.seoDescription}
                {...register("seoDescription")}
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
                <Input className="pl-10" {...register("socialLinks.github")} />
              </div>
            </Field>
            <Field label="LinkedIn" error={errors.socialLinks?.linkedin?.message}>
              <div className="relative">
                <LinkedinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input className="pl-10" {...register("socialLinks.linkedin")} />
              </div>
            </Field>
            <Field label="Twitter / X" error={errors.socialLinks?.twitter?.message}>
              <div className="relative">
                <TwitterIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input className="pl-10" {...register("socialLinks.twitter")} />
              </div>
            </Field>
            <Field label="YouTube" error={errors.socialLinks?.youtube?.message}>
              <div className="relative">
                <YoutubeIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <Input className="pl-10" {...register("socialLinks.youtube")} />
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
            Save settings
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
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
} from "@/components/ui";
import { TagInput } from "@/components/forms/TagInput";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { createProjectSchema, updateProjectSchema } from "@/features/projects/validation";
import { useProjectById, useCreateProject, useUpdateProject } from "@/features/projects";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/constants/enums";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { toDateInputValue } from "@/lib/format";
import { routes } from "@/constants/routes";

export default function ProjectFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading } = useProjectById(id);
  const create = useCreateProject();
  const update = useUpdateProject();

  const schema = isEdit ? updateProjectSchema : createProjectSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isEdit && data?.project) {
      const p = data.project;
      reset({
        title: p.title || "",
        description: p.description || "",
        shortDescription: p.shortDescription || "",
        techStack: p.techStack || [],
        category: p.category || "fullstack",
        status: p.status || "completed",
        featured: Boolean(p.featured),
        githubUrl: p.githubUrl || "",
        liveUrl: p.liveUrl || "",
        thumbnail: p.thumbnail || "",
        images: p.images || [],
        startDate: toDateInputValue(p.startDate),
        endDate: toDateInputValue(p.endDate),
      });
    }
  }, [isEdit, data, reset]);

  const featured = watch("featured");

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      techStack: values.techStack || [],
      images: values.images || [],
      startDate: values.startDate,
      endDate: values.endDate || null,
    };
    try {
      if (isEdit) {
        await update.mutateAsync({ id, payload });
        toast.success("Project updated");
      } else {
        await create.mutateAsync(payload);
        toast.success("Project created");
      }
      navigate(routes.admin.projects);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isEdit && isLoading) {
    return <div className="py-20 text-center text-content-muted">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        as="a"
        href={routes.admin.projects}
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        className="mb-4"
        onClick={(e) => {
          e.preventDefault();
          navigate(routes.admin.projects);
        }}
      >
        Projects
      </Button>
      <h1 className="mb-6 font-heading text-2xl font-bold text-content-primary">
        {isEdit ? "Edit project" : "New project"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="Title" required error={errors.title?.message}>
              <Input error={errors.title} {...register("title")} />
            </Field>
            <Field
              label="Short description"
              required
              error={errors.shortDescription?.message}
              hint="Max 200 characters"
            >
              <Input
                maxLength={200}
                error={errors.shortDescription}
                {...register("shortDescription")}
              />
            </Field>
            <Field label="Description" required error={errors.description?.message}>
              <Textarea rows={5} error={errors.description} {...register("description")} />
            </Field>
            <Field label="Tech stack" required error={errors.techStack?.message}>
              <TagInput
                value={watch("techStack") || []}
                onChange={(v) => setValue("techStack", v)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" required error={errors.category?.message}>
                <Select error={errors.category} {...register("category")}>
                  {PROJECT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Status" required error={errors.status?.message}>
                <Select error={errors.status} {...register("status")}>
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
              <span className="text-sm font-medium text-content-primary">Featured project</span>
              <Switch checked={featured} onChange={(v) => setValue("featured", v)} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links & media</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL" error={errors.githubUrl?.message}>
                <Input
                  placeholder="https://github.com/…"
                  error={errors.githubUrl}
                  {...register("githubUrl")}
                />
              </Field>
              <Field label="Live URL" error={errors.liveUrl?.message}>
                <Input placeholder="https://…" error={errors.liveUrl} {...register("liveUrl")} />
              </Field>
            </div>
            <FileUploadField
              folder="projects"
              value={watch("thumbnail") || ""}
              onChange={(v) => setValue("thumbnail", v)}
              label="Thumbnail"
              acceptHint="JPG, PNG, or WebP · up to 5 MB"
            />
            <Field label="Gallery images" hint="Upload additional screenshots (optional)">
              <FileUploadField
                folder="projects"
                value={(watch("images") || [])[0] || ""}
                onChange={(v) => setValue("images", v ? [v] : [])}
                label=" "
                acceptHint="JPG, PNG, or WebP · up to 5 MB"
              />
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Field label="Start date" required error={errors.startDate?.message}>
              <Input type="date" error={errors.startDate} {...register("startDate")} />
            </Field>
            <Field label="End date" error={errors.endDate?.message} hint="Leave empty if ongoing">
              <Input type="date" error={errors.endDate} {...register("endDate")} />
            </Field>
          </CardBody>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => navigate(routes.admin.projects)}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={create.isPending || update.isPending}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {isEdit ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

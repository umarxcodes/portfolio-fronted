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
  Switch,
} from "@/components/ui";
import { TagInput } from "@/components/forms/TagInput";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { createBlogSchema, updateBlogSchema } from "@/features/blogs/validation";
import { useBlogById, useCreateBlog, useUpdateBlog } from "@/features/blogs";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { routes } from "@/constants/routes";

export default function BlogFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading } = useBlogById(id);
  const create = useCreateBlog();
  const update = useUpdateBlog();
  const schema = isEdit ? updateBlogSchema : createBlogSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isEdit && data?.post) {
      const p = data.post;
      reset({
        title: p.title || "",
        excerpt: p.excerpt || "",
        content: p.content || "",
        coverImage: p.coverImage || "",
        tags: p.tags || [],
        category: p.category || "",
        featured: Boolean(p.featured),
        published: Boolean(p.published),
        seoTitle: p.seoTitle || "",
        seoDescription: p.seoDescription || "",
      });
    }
  }, [isEdit, data, reset]);

  const featured = watch("featured");
  const published = watch("published");

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, tags: values.tags || [] };
      if (isEdit) await update.mutateAsync({ id, payload });
      else await create.mutateAsync(payload);
      toast.success(isEdit ? "Post updated" : "Post created");
      navigate(routes.admin.blogs);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isEdit && isLoading)
    return <div className="py-20 text-center text-content-muted">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        className="mb-4"
        onClick={() => navigate(routes.admin.blogs)}
      >
        Blog
      </Button>
      <h1 className="mb-6 font-heading text-2xl font-bold text-content-primary">
        {isEdit ? "Edit post" : "New post"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Field label="Title" required error={errors.title?.message}>
              <Input error={errors.title} {...register("title")} />
            </Field>
            <Field label="Category" required error={errors.category?.message}>
              <Input placeholder="frontend" error={errors.category} {...register("category")} />
            </Field>
            <Field
              label="Excerpt"
              required
              error={errors.excerpt?.message}
              hint="Max 300 characters"
            >
              <Textarea rows={2} maxLength={300} error={errors.excerpt} {...register("excerpt")} />
            </Field>
            <Field label="Body" required error={errors.content?.message}>
              <Textarea rows={12} error={errors.content} {...register("content")} />
            </Field>
            <Field label="Tags" hint="Press Enter to add each">
              <TagInput value={watch("tags") || []} onChange={(v) => setValue("tags", v)} />
            </Field>
            <FileUploadField
              folder="blogs"
              value={watch("coverImage") || ""}
              onChange={(v) => setValue("coverImage", v)}
              label="Cover image"
              acceptHint="JPG, PNG, or WebP · up to 5 MB"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
                <span className="text-sm font-medium text-content-primary">Featured</span>
                <Switch checked={featured} onChange={(v) => setValue("featured", v)} />
              </div>
              <div className="flex flex-1 items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
                <span className="text-sm font-medium text-content-primary">Published</span>
                <Switch checked={published} onChange={(v) => setValue("published", v)} />
              </div>
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

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => navigate(routes.admin.blogs)}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={create.isPending || update.isPending}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {isEdit ? "Save changes" : "Publish post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

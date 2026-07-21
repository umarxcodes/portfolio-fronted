import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Button,
  DataTable,
  Badge,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Pagination,
  Drawer,
  Field,
  Input,
  Textarea,
  Select,
  Switch,
} from "@/components/ui";
import { PageHeader } from "@/components/common/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useExperience,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "@/features/experience";
import { createExperienceSchema, updateExperienceSchema } from "@/features/experience/validation";
import { EMPLOYMENT_TYPES } from "@/constants/enums";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatYearRange } from "@/lib/format";
import { TagInput } from "@/components/forms/TagInput";

export default function ExperienceAdminPage() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useExperience({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-startDate",
  });
  const create = useCreateExperience();
  const update = useUpdateExperience();
  const remove = useDeleteExperience();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editing ? updateExperienceSchema : createExperienceSchema) });

  function openCreate() {
    setEditing(null);
    reset({
      company: "",
      position: "",
      employmentType: "full-time",
      location: "",
      description: "",
      responsibilities: [],
      technologies: [],
      startDate: "",
      endDate: "",
      isCurrent: false,
      companyLogo: "",
    });
    setOpen(true);
  }
  function openEdit(row) {
    setEditing(row);
    reset({
      company: row.company,
      position: row.position,
      employmentType: row.employmentType,
      location: row.location || "",
      description: row.description,
      responsibilities: row.responsibilities || [],
      technologies: row.technologies || [],
      startDate: row.startDate?.slice(0, 10) || "",
      endDate: row.endDate?.slice(0, 10) || "",
      isCurrent: Boolean(row.isCurrent),
      companyLogo: row.companyLogo || "",
    });
    setOpen(true);
  }

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        responsibilities: values.responsibilities || [],
        technologies: values.technologies || [],
        startDate: values.startDate,
        endDate: values.isCurrent ? null : values.endDate || null,
      };
      if (editing) await update.mutateAsync({ id: editing._id, payload });
      else await create.mutateAsync(payload);
      toast.success(editing ? "Experience updated" : "Experience added");
      setOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Experience deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const items = data?.items || [];
  const isCurrent = watch("isCurrent");

  const columns = [
    {
      key: "position",
      label: "Role",
      render: (r) => (
        <div>
          <p className="font-medium text-content-primary">{r.position}</p>
          <p className="text-2xs text-content-muted">{r.company}</p>
        </div>
      ),
    },
    {
      key: "employmentType",
      label: "Type",
      render: (r) => (
        <Badge tone="brand" className="capitalize">
          {r.employmentType?.replace("-", " ")}
        </Badge>
      ),
    },
    {
      key: "period",
      label: "Period",
      render: (r) => (
        <span className="text-sm text-content-muted">
          {formatYearRange(r.startDate, r.endDate, r.isCurrent)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(r)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-danger"
            onClick={() => setToDelete(r)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Roles, responsibilities, and the technologies you used."
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
            Add role
          </Button>
        }
      />

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          icon="empty"
          title="No experience"
          description="Add a role to build your timeline."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
              Add role
            </Button>
          }
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={items}
            loading={isLoading}
            emptyTitle="No experience"
          />
          <div className="mt-6">
            <Pagination
              page={data?.pagination?.page}
              totalPages={data?.pagination?.totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}

      <Drawer open={open} onClose={() => setOpen(false)} title={editing ? "Edit role" : "Add role"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company" required error={errors.company?.message}>
              <Input error={errors.company} {...register("company")} />
            </Field>
            <Field label="Position" required error={errors.position?.message}>
              <Input error={errors.position} {...register("position")} />
            </Field>
            <Field label="Employment type" required error={errors.employmentType?.message}>
              <Select error={errors.employmentType} {...register("employmentType")}>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Location" error={errors.location?.message}>
              <Input error={errors.location} {...register("location")} />
            </Field>
          </div>
          <Field label="Description" required error={errors.description?.message}>
            <Textarea rows={3} error={errors.description} {...register("description")} />
          </Field>
          <Field label="Responsibilities" hint="Press Enter to add each item">
            <TagInput
              value={watch("responsibilities") || []}
              onChange={(v) => setValue("responsibilities", v)}
            />
          </Field>
          <Field label="Technologies" hint="Press Enter to add each item">
            <TagInput
              value={watch("technologies") || []}
              onChange={(v) => setValue("technologies", v)}
            />
          </Field>
          <Field label="Company logo URL" error={errors.companyLogo?.message}>
            <Input
              placeholder="https://…/logo.png"
              error={errors.companyLogo}
              {...register("companyLogo")}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Start date" required error={errors.startDate?.message}>
              <Input type="date" error={errors.startDate} {...register("startDate")} />
            </Field>
            <Field label="End date" error={errors.endDate?.message} hint="Ignored if current">
              <Input
                type="date"
                disabled={isCurrent}
                error={errors.endDate}
                {...register("endDate")}
              />
            </Field>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border bg-bg-subtle px-4 py-3">
            <span className="text-sm font-medium text-content-primary">Current role</span>
            <Switch checked={isCurrent} onChange={(v) => setValue("isCurrent", v)} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={create.isPending || update.isPending}>
              {editing ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        isLoading={remove.isPending}
        title="Delete role?"
        description={`"${toDelete?.position} at ${toDelete?.company}" will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

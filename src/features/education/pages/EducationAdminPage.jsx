import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Button,
  DataTable,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Pagination,
  Drawer,
  Field,
  Input,
  Textarea,
  Switch,
} from "@/components/ui";
import { PageHeader } from "@/components/common/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from "@/features/education";
import { createEducationSchema, updateEducationSchema } from "@/features/education/validation";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatYearRange } from "@/lib/format";

export default function EducationAdminPage() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useEducation({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-startDate",
  });
  const create = useCreateEducation();
  const update = useUpdateEducation();
  const remove = useDeleteEducation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editing ? updateEducationSchema : createEducationSchema) });

  function openCreate() {
    setEditing(null);
    reset({
      degree: "",
      fieldOfStudy: "",
      institution: "",
      description: "",
      grade: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      location: "",
    });
    setOpen(true);
  }
  function openEdit(row) {
    setEditing(row);
    reset({
      degree: row.degree,
      fieldOfStudy: row.fieldOfStudy,
      institution: row.institution,
      description: row.description || "",
      grade: row.grade || "",
      startDate: row.startDate?.slice(0, 10) || "",
      endDate: row.endDate?.slice(0, 10) || "",
      isCurrent: Boolean(row.isCurrent),
      location: row.location || "",
    });
    setOpen(true);
  }

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        startDate: values.startDate,
        endDate: values.isCurrent ? null : values.endDate || null,
      };
      if (editing) await update.mutateAsync({ id: editing._id, payload });
      else await create.mutateAsync(payload);
      toast.success(editing ? "Education updated" : "Education added");
      setOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Education deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const items = data?.items || [];
  const isCurrent = watch("isCurrent");

  const columns = [
    {
      key: "degree",
      label: "Degree",
      render: (r) => (
        <div>
          <p className="font-medium text-content-primary">{r.degree}</p>
          <p className="text-2xs text-content-muted">
            {r.fieldOfStudy} · {r.institution}
          </p>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (r) => <span className="text-sm text-content-muted">{r.location || "—"}</span>,
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
        title="Education"
        description="Academic background and certifications of study."
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
            Add education
          </Button>
        }
      />

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          icon="empty"
          title="No education"
          description="Add your academic background."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
              Add education
            </Button>
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={items} loading={isLoading} emptyTitle="No education" />
          <div className="mt-6">
            <Pagination
              page={data?.pagination?.page}
              totalPages={data?.pagination?.totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit education" : "Add education"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Degree" required error={errors.degree?.message}>
            <Input error={errors.degree} {...register("degree")} />
          </Field>
          <Field label="Field of study" required error={errors.fieldOfStudy?.message}>
            <Input error={errors.fieldOfStudy} {...register("fieldOfStudy")} />
          </Field>
          <Field label="Institution" required error={errors.institution?.message}>
            <Input error={errors.institution} {...register("institution")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Grade" error={errors.grade?.message}>
              <Input error={errors.grade} {...register("grade")} />
            </Field>
            <Field label="Location" error={errors.location?.message}>
              <Input error={errors.location} {...register("location")} />
            </Field>
          </div>
          <Field label="Description" error={errors.description?.message}>
            <Textarea rows={3} error={errors.description} {...register("description")} />
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
            <span className="text-sm font-medium text-content-primary">Currently studying</span>
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
        title="Delete education?"
        description={`"${toDelete?.degree}" will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

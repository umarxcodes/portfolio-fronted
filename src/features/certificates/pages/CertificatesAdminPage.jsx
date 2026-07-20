import { useState } from "react";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
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
} from "@/components/ui";
import { PageHeader } from "@/components/common/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCertificates,
  useCreateCertificate,
  useUpdateCertificate,
  useDeleteCertificate,
} from "@/features/certificates";
import {
  createCertificateSchema,
  updateCertificateSchema,
} from "@/features/certificates/validation";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatDate } from "@/lib/format";
import { TagInput } from "@/components/forms/TagInput";
import { FileUploadField } from "@/components/forms/FileUploadField";

export default function CertificatesAdminPage() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useCertificates({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-issueDate",
  });
  const create = useCreateCertificate();
  const update = useUpdateCertificate();
  const remove = useDeleteCertificate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editing ? updateCertificateSchema : createCertificateSchema),
  });

  function openCreate() {
    setEditing(null);
    reset({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      description: "",
      skills: [],
      badgeImage: "",
    });
    setOpen(true);
  }
  function openEdit(row) {
    setEditing(row);
    reset({
      name: row.name,
      issuer: row.issuer,
      issueDate: row.issueDate?.slice(0, 10) || "",
      expiryDate: row.expiryDate?.slice(0, 10) || "",
      credentialId: row.credentialId || "",
      credentialUrl: row.credentialUrl || "",
      description: row.description || "",
      skills: row.skills || [],
      badgeImage: row.badgeImage || "",
    });
    setOpen(true);
  }

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        skills: values.skills || [],
        issueDate: values.issueDate,
        expiryDate: values.expiryDate || null,
      };
      if (editing) await update.mutateAsync({ id: editing._id, payload });
      else await create.mutateAsync(payload);
      toast.success(editing ? "Certificate updated" : "Certificate added");
      setOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Certificate deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const items = data?.items || [];

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (r) => (
        <div className="flex items-center gap-3">
          {r.badgeImage ? (
            <img src={r.badgeImage} alt="" className="h-8 w-8 rounded object-cover" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded bg-brand-500/10 text-brand-500">
              <Award className="h-4 w-4" />
            </span>
          )}
          <div>
            <p className="font-medium text-content-primary">{r.name}</p>
            <p className="text-2xs text-content-muted">{r.issuer}</p>
          </div>
        </div>
      ),
    },
    {
      key: "issueDate",
      label: "Issued",
      render: (r) => <span className="text-sm text-content-muted">{formatDate(r.issueDate)}</span>,
    },
    {
      key: "expiryDate",
      label: "Expiry",
      render: (r) =>
        r.expiryDate ? (
          <span className="text-sm text-content-muted">{formatDate(r.expiryDate)}</span>
        ) : (
          <Badge tone="success">No expiry</Badge>
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
        title="Certificates"
        description="Professional certifications and credentials."
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
            Add certificate
          </Button>
        }
      />

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          icon="empty"
          title="No certificates"
          description="Add a certification to showcase your credentials."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
              Add certificate
            </Button>
          }
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={items}
            loading={isLoading}
            emptyTitle="No certificates"
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

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit certificate" : "Add certificate"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Name" required error={errors.name?.message}>
            <Input error={errors.name} {...register("name")} />
          </Field>
          <Field label="Issuer" required error={errors.issuer?.message}>
            <Input error={errors.issuer} {...register("issuer")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Issue date" required error={errors.issueDate?.message}>
              <Input type="date" error={errors.issueDate} {...register("issueDate")} />
            </Field>
            <Field
              label="Expiry date"
              error={errors.expiryDate?.message}
              hint="Leave empty if none"
            >
              <Input type="date" error={errors.expiryDate} {...register("expiryDate")} />
            </Field>
            <Field label="Credential ID" error={errors.credentialId?.message}>
              <Input error={errors.credentialId} {...register("credentialId")} />
            </Field>
            <Field label="Credential URL" error={errors.credentialUrl?.message}>
              <Input
                placeholder="https://…/verify"
                error={errors.credentialUrl}
                {...register("credentialUrl")}
              />
            </Field>
          </div>
          <Field label="Skills" hint="Press Enter to add each">
            <TagInput value={watch("skills") || []} onChange={(v) => setValue("skills", v)} />
          </Field>
          <Field label="Description" error={errors.description?.message}>
            <Textarea rows={3} error={errors.description} {...register("description")} />
          </Field>
          <FileUploadField
            folder="certificates"
            value={watch("badgeImage") || ""}
            onChange={(v) => setValue("badgeImage", v)}
            label="Badge image"
            acceptHint="JPG, PNG, or WebP · up to 5 MB"
          />
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
        title="Delete certificate?"
        description={`"${toDelete?.name}" will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

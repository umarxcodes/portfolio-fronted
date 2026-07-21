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
  Select,
} from "@/components/ui";
import { PageHeader } from "@/components/common/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSkills, useCreateSkill, useUpdateSkill, useDeleteSkill } from "@/features/skills";
import { createSkillSchema, updateSkillSchema } from "@/features/skills/validation";
import { SKILL_CATEGORIES, SKILL_LEVELS, SKILL_LEVEL_META } from "@/constants/enums";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
export default function SkillsAdminPage() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useSkills({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "displayOrder",
  });
  const create = useCreateSkill();
  const update = useUpdateSkill();
  const remove = useDeleteSkill();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editing ? updateSkillSchema : createSkillSchema) });

  function openCreate() {
    setEditing(null);
    reset({
      name: "",
      category: "frontend",
      level: "advanced",
      yearsOfExperience: 1,
      icon: "",
      description: "",
      displayOrder: 0,
    });
    setOpen(true);
  }
  function openEdit(row) {
    setEditing(row);
    reset({
      name: row.name,
      category: row.category,
      level: row.level,
      yearsOfExperience: row.yearsOfExperience,
      icon: row.icon || "",
      description: row.description || "",
      displayOrder: row.displayOrder || 0,
    });
    setOpen(true);
  }

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        yearsOfExperience: Number(values.yearsOfExperience),
        displayOrder: Number(values.displayOrder || 0),
      };
      if (editing) await update.mutateAsync({ id: editing._id, payload });
      else await create.mutateAsync(payload);
      toast.success(editing ? "Skill updated" : "Skill created");
      setOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Skill deleted");
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
          <span className="font-medium text-content-primary">{r.name}</span>
          {r.icon && <span className="text-2xs text-content-muted">{r.icon}</span>}
        </div>
      ),
    },
    { key: "category", label: "Category", render: (r) => <Badge tone="brand">{r.category}</Badge> },
    {
      key: "level",
      label: "Level",
      render: (r) => (
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-bg-muted">
            <span
              className="block h-full rounded-full bg-brand-500"
              style={{ width: `${SKILL_LEVEL_META[r.level]?.percent || 0}%` }}
            />
          </span>
          <span className="text-2xs capitalize text-content-muted">{r.level}</span>
        </div>
      ),
    },
    { key: "yearsOfExperience", label: "Years", render: (r) => `${r.yearsOfExperience}y` },
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
        title="Skills"
        description="The technologies you work with, grouped by category."
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
            New skill
          </Button>
        }
      />

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          icon="empty"
          title="No skills"
          description="Add skills to populate your public skill matrix."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openCreate}>
              New skill
            </Button>
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={items} loading={isLoading} emptyTitle="No skills" />
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
        title={editing ? "Edit skill" : "New skill"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Name" required error={errors.name?.message}>
            <Input error={errors.name} {...register("name")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category" required error={errors.category?.message}>
              <Select error={errors.category} {...register("category")}>
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Level" required error={errors.level?.message}>
              <Select error={errors.level} {...register("level")}>
                {SKILL_LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </Select>
            </Field>
            <Field label="Years of experience" required error={errors.yearsOfExperience?.message}>
              <Input
                type="number"
                min={0}
                max={50}
                error={errors.yearsOfExperience}
                {...register("yearsOfExperience")}
              />
            </Field>
            <Field label="Display order" error={errors.displayOrder?.message}>
              <Input type="number" error={errors.displayOrder} {...register("displayOrder")} />
            </Field>
          </div>
          <Field label="Icon (optional)" error={errors.icon?.message}>
            <Input placeholder="lucide:react" error={errors.icon} {...register("icon")} />
          </Field>
          <Field label="Description" error={errors.description?.message}>
            <Input error={errors.description} {...register("description")} />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={create.isPending || update.isPending}>
              {editing ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        isLoading={remove.isPending}
        title="Delete skill?"
        description={`"${toDelete?.name}" will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import {
  Button,
  DataTable,
  Badge,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Pagination,
} from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { useProjects, useDeleteProject } from "@/features/projects";
import { STATUS_META } from "@/constants/enums";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { truncate } from "@/lib/format";
import { routes } from "@/constants/routes";

export default function ProjectsAdminPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useProjects({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-createdAt",
  });
  const remove = useDeleteProject();

  const items = data?.items || [];
  const pagination = data?.pagination;

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Project deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <div>
          <p className="font-medium text-content-primary">{row.title}</p>
          <p className="text-2xs text-content-muted">{truncate(row.shortDescription, 50)}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row) => <Badge tone="brand">{row.category}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge tone={STATUS_META[row.status]?.tone}>{STATUS_META[row.status]?.label}</Badge>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (row) => (row.featured ? <Badge tone="warning">Yes</Badge> : "—"),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="View"
            as="a"
            href={`/projects/${row.slug}`}
            target="_blank"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => navigate(routes.admin.projectEdit.replace(":id", row._id))}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete"
            onClick={() => setToDelete(row)}
            className="text-danger"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-content-primary">Projects</h1>
            <p className="mt-1 text-sm text-content-secondary">
              Manage the work showcased on your public site.
            </p>
          </div>
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate(routes.admin.projectNew)}
          >
            New project
          </Button>
        </div>
      </Reveal>

      {isError ? (
        <Reveal delay={80}>
          <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
        </Reveal>
      ) : items.length === 0 && !isLoading ? (
        <Reveal delay={80}>
          <EmptyState
            icon="empty"
            title="No projects"
            description="Create your first project to showcase your work."
            action={
              <Button
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => navigate(routes.admin.projectNew)}
              >
                New project
              </Button>
            }
          />
        </Reveal>
      ) : (
        <>
          <Reveal delay={80}>
            <DataTable
              columns={columns}
              data={items}
              loading={isLoading}
              emptyTitle="No projects"
            />
          </Reveal>
          <div className="mt-6">
            <Pagination
              page={pagination?.page}
              totalPages={pagination?.totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        isLoading={remove.isPending}
        title="Delete project?"
        description={`"${toDelete?.title}" will be removed. This action cannot be undone.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

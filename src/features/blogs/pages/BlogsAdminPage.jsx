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
import { PageHeader } from "@/components/common/SectionHeading";
import { useBlogs, useDeleteBlog } from "@/features/blogs";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatDate } from "@/lib/format";
import { routes } from "@/constants/routes";

export default function BlogsAdminPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useBlogs({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-updatedAt",
  });
  const remove = useDeleteBlog();

  const items = data?.items || [];

  async function confirmDelete() {
    try {
      await remove.mutateAsync(toDelete._id);
      toast.success("Post deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (r) => (
        <div>
          <p className="font-medium text-content-primary">{r.title}</p>
          <p className="text-2xs text-content-muted">{r.category}</p>
        </div>
      ),
    },
    {
      key: "published",
      label: "Status",
      render: (r) =>
        r.published ? <Badge tone="success">Published</Badge> : <Badge tone="neutral">Draft</Badge>,
    },
    {
      key: "featured",
      label: "Featured",
      render: (r) => (r.featured ? <Badge tone="warning">Yes</Badge> : "—"),
    },
    {
      key: "updatedAt",
      label: "Updated",
      render: (r) => <span className="text-sm text-content-muted">{formatDate(r.updatedAt)}</span>,
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <div className="flex justify-end gap-1">
          {r.published && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              as="a"
              href={`/blog/${r.slug}`}
              target="_blank"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(routes.admin.blogEdit.replace(":id", r._id))}
          >
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
        title="Blog"
        description="Write and publish articles for your audience."
        actions={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate(routes.admin.blogNew)}
          >
            New post
          </Button>
        }
      />

      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          icon="empty"
          title="No posts"
          description="Publish your first article."
          action={
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => navigate(routes.admin.blogNew)}
            >
              New post
            </Button>
          }
        />
      ) : (
        <>
          <DataTable columns={columns} data={items} loading={isLoading} emptyTitle="No posts" />
          <div className="mt-6">
            <Pagination
              page={data?.pagination?.page}
              totalPages={data?.pagination?.totalPages}
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
        title="Delete post?"
        description={`"${toDelete?.title}" will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}

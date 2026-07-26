import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailOpen } from "lucide-react";
import {
  Button,
  DataTable,
  EmptyState,
  ErrorState,
  Pagination,
  Select,
  Tabs,
} from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { PageHeader } from "@/components/common/SectionHeading";
import { useContacts, useUpdateContactStatus } from "@/features/contact";
import { CONTACT_STATUSES, STATUS_META } from "@/constants/enums";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { relativeTime } from "@/lib/format";

export default function ContactAdminPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { toast } = useToast();
  const updateStatus = useUpdateContactStatus();

  const { data, isLoading, isError, error, refetch } = useContacts({
    page,
    limit: ADMIN_PAGE_SIZE,
    sort: "-createdAt",
    ...(status ? { status } : {}),
  });

  const items = data?.items || [];

  async function changeStatus(row, newStatus) {
    if (row.status === newStatus) return;
    try {
      await updateStatus.mutateAsync({ id: row._id, status: newStatus });
      toast.success(`Marked ${newStatus}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  const columns = [
    {
      key: "subject",
      label: "Subject",
      render: (r) => (
        <div>
          <p className="font-medium text-content-primary">{r.subject}</p>
          <p className="text-2xs text-content-muted">
            {r.name} · {r.email}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <Select
          value={r.status}
          onChange={(e) => changeStatus(r, e.target.value)}
          className="h-8 w-32 text-xs"
        >
          {CONTACT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s]?.label}
            </option>
          ))}
        </Select>
      ),
    },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <span className="text-sm text-content-muted">{relativeTime(r.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/admin/contact/${r._id}`)}
          rightIcon={<MailOpen className="h-4 w-4" />}
        >
          Open
        </Button>
      ),
    },
  ];

  const tabs = [
    { value: "", label: "All" },
    ...CONTACT_STATUSES.map((s) => ({ value: s, label: STATUS_META[s]?.label })),
  ];

  return (
    <div>
      <Reveal>
        <PageHeader
          title="Messages"
          description="Inbound contact submissions from your public form."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-5">
          <Tabs
            tabs={tabs}
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          />
        </div>
      </Reveal>

      {isError ? (
        <Reveal delay={100}>
          <ErrorState message={getErrorMessage(error)} onRetry={refetch} />
        </Reveal>
      ) : items.length === 0 && !isLoading ? (
        <Reveal delay={100}>
          <EmptyState
            icon="empty"
            title="No messages"
            description="Submissions from your contact form will appear here."
          />
        </Reveal>
      ) : (
        <>
          <Reveal delay={100}>
            <DataTable
              columns={columns}
              data={items}
              loading={isLoading}
              emptyTitle="No messages"
            />
          </Reveal>
          <div className="mt-6">
            <Pagination
              page={data?.pagination?.page}
              totalPages={data?.pagination?.totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

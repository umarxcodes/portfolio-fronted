import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Reply, Trash2, User, Clock } from "lucide-react";
import { Button, Card, CardBody, Select, ErrorState, EmptyState } from "@/components/ui";
import { PageHeader } from "@/components/common/SectionHeading";
import { useContactById, useUpdateContactStatus, useDeleteContact } from "@/features/contact";
import { CONTACT_STATUSES, STATUS_META } from "@/constants/enums";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";
import { formatDateTime } from "@/lib/format";

export default function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isLoading, isError, error, refetch } = useContactById(id);
  const updateStatus = useUpdateContactStatus();
  const remove = useDeleteContact();

  const contact = data?.contact;

  async function changeStatus(e) {
    try {
      await updateStatus.mutateAsync({ id, status: e.target.value });
      toast.success("Status updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this message?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Message deleted");
      navigate("/admin/contact");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  if (isLoading) return <div className="py-20 text-center text-content-muted">Loading…</div>;
  if (isError) return <ErrorState message={getErrorMessage(error)} onRetry={refetch} />;
  if (!contact) return <EmptyState title="Message not found" />;

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="h-4 w-4" />}
        className="mb-4"
        onClick={() => navigate("/admin/contact")}
      >
        Messages
      </Button>

      <PageHeader
        title={contact.subject}
        description={formatDateTime(contact.createdAt)}
        actions={
          <div className="flex items-center gap-2">
            <Select value={contact.status} onChange={changeStatus} className="h-9 w-36">
              {CONTACT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s]?.label}
                </option>
              ))}
            </Select>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardBody className="flex items-center gap-3">
            <User className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-2xs text-content-muted">From</p>
              <p className="text-sm font-medium text-content-primary">{contact.name}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-2xs text-content-muted">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm font-medium text-brand-500 hover:underline"
              >
                {contact.email}
              </a>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-brand-500" />
            <div>
              <p className="text-2xs text-content-muted">Status</p>
              <p className="text-sm font-medium text-content-primary capitalize">
                {contact.status}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-4">
        <CardBody>
          <p className="whitespace-pre-line leading-relaxed text-content-secondary">
            {contact.message}
          </p>
          <div className="mt-6 flex gap-3 border-t border-border pt-5">
            <Button
              as="a"
              href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
              leftIcon={<Reply className="h-4 w-4" />}
            >
              Reply by email
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

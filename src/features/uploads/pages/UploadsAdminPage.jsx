import { useState, useRef } from "react";
import { UploadCloud, ImageIcon, File as FileIcon, X, CheckCircle2 } from "lucide-react";
import { Card, CardBody, Select, EmptyState } from "@/components/ui";
import { useUploadAsset } from "@/features/uploads";
import { useToast } from "@/context";
import { UPLOAD_FOLDERS } from "@/constants/enums";
import { validateUploadFile } from "@/lib/validators";
import { cn } from "@/lib/cn";

export default function UploadsAdminPage() {
  const [folder, setFolder] = useState("projects");
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const upload = useUploadAsset();
  const { toast } = useToast();

  function addFiles(fileList) {
    const arr = Array.from(fileList || []);
    const next = arr.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: "pending",
      url: "",
    }));
    setFiles((prev) => [...next, ...prev]);
    next.forEach((item) => startUpload(item));
  }

  async function startUpload(item) {
    const check = validateUploadFile(folder, item.file);
    if (!check.valid) {
      toast.error(check.error);
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "error", error: check.error } : f))
      );
      return;
    }
    try {
      const result = await upload.mutateAsync({
        folder,
        file: item.file,
        onProgress: (p) =>
          setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, progress: p } : f))),
      });
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: "done", url: result.url, progress: 100 } : f
        )
      );
      toast.success("Uploaded");
    } catch (err) {
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "error", error: err?.message } : f))
      );
    }
  }

  function removeFile(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const isImage = (file) => /\.(jpe?g|png|webp|gif)$/i.test(file.name);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-content-primary">Uploads</h1>
        <p className="mt-1 text-sm text-content-secondary">
          Upload media for your profile, projects, blogs, and certificates.
        </p>
      </div>

      <Card className="mb-6">
        <CardBody className="space-y-4">
          <Field label="Destination folder">
            <Select value={folder} onChange={(e) => setFolder(e.target.value)}>
              {UPLOAD_FOLDERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </Select>
          </Field>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 text-center transition-colors",
              dragOver
                ? "border-brand-500 bg-brand-500/5"
                : "border-border hover:border-brand-500/50 hover:bg-bg-subtle"
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
              <UploadCloud className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-content-primary">Drag & drop files here</p>
              <p className="mt-1 text-2xs text-content-muted">
                {folder === "resume" ? "PDF up to 10 MB" : "JPG, PNG, or WebP up to 5 MB"}
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>
        </CardBody>
      </Card>

      {files.length === 0 ? (
        <EmptyState
          icon="empty"
          title="No uploads yet"
          description="Files you upload will appear here with their progress."
        />
      ) : (
        <div className="space-y-3">
          {files.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-bg-muted">
                {item.status === "done" && isImage(item.file) ? (
                  <img
                    src={item.url}
                    alt=""
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : isImage(item.file) ? (
                  <ImageIcon className="h-5 w-5 text-content-muted" />
                ) : (
                  <FileIcon className="h-5 w-5 text-content-muted" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-content-primary">
                  {item.file.name}
                </p>
                {item.status === "pending" && (
                  <p className="text-2xs text-content-muted">Queued…</p>
                )}
                {item.status === "error" && <p className="text-2xs text-danger">{item.error}</p>}
                {item.status === "done" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xs text-brand-500 hover:underline"
                  >
                    View file
                  </a>
                )}
                {item.status === "pending" ||
                (item.status !== "done" && item.status !== "error") ? (
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                ) : null}
              </div>
              {item.status === "done" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <button
                  onClick={() => removeFile(item.id)}
                  className="rounded p-1 text-content-muted hover:text-danger"
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-content-primary">{label}</span>
      {children}
    </label>
  );
}

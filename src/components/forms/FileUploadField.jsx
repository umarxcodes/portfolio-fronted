import { useId, useState } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { validateUploadFile } from "@/lib/validators";
import { useUploadAsset } from "@/features/uploads";
import { useToast } from "@/context";

export function FileUploadField({
  folder,
  value,
  onChange,
  label = "File",
  acceptHint,
  preview = true,
}) {
  const inputId = useId();
  const { toast } = useToast();
  const upload = useUploadAsset();
  const [progress, setProgress] = useState(0);

  const isImage = value && /\.(jpe?g|png|webp|gif|webp)$/i.test(value);

  async function handleFile(file) {
    if (!file) return;
    const check = validateUploadFile(folder, file);
    if (!check.valid) {
      toast.error(check.error);
      return;
    }
    try {
      const result = await upload.mutateAsync({
        folder,
        file,
        onProgress: setProgress,
      });
      onChange?.(result.url);
      toast.success("Upload complete");
    } catch (error) {
      toast.error(error?.message || "Upload failed");
    }
  }

  return (
    <div className="grid gap-2">
      {label && <span className="text-sm font-medium text-content-primary">{label}</span>}
      <div
        className={cn(
          "rounded-lg border border-dashed border-border bg-bg-subtle p-4 transition-colors",
          upload.isPending && "border-brand-500/50"
        )}
      >
        <label
          htmlFor={inputId}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-md py-3 text-sm text-content-secondary transition-colors hover:text-content-primary"
        >
          {upload.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          <span>{upload.isPending ? `Uploading… ${progress}%` : "Click to upload"}</span>
        </label>
        <input
          id={inputId}
          type="file"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={upload.isPending}
        />
        {upload.isPending && (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {acceptHint && <p className="mt-2 text-center text-2xs text-content-muted">{acceptHint}</p>}
      </div>

      {value && preview && (
        <div className="flex items-center gap-3 rounded-md border border-border bg-surface p-2.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-bg-muted">
            {isImage ? (
              <img
                src={value}
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <FileText className="h-5 w-5 text-content-muted" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-content-secondary">{value.split("/").pop()}</p>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-2xs text-brand-500 hover:underline"
            >
              View file
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange?.("");
            }}
            className="rounded p-1 text-content-muted hover:bg-surface-hover hover:text-danger"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUploadField;

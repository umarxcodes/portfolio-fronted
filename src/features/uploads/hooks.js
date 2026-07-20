import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadsApi } from "@/features/uploads/api";
import { queryKeys } from "@/constants/queryKeys";

export function useUploadAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ folder, file, onProgress }) => uploadsApi.create(folder, file, onProgress),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.uploads.all });
    },
  });
}

export function useDeleteUpload() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => uploadsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.uploads.all }),
  });
}

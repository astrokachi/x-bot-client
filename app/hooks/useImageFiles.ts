import { useCallback, useEffect, useRef, useState } from "react";

export interface SelectedImage {
  id: string;
  file: File;
  preview: string;
}

export const useImageFiles = () => {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const objectUrls = useRef<string[]>([]);

  const addFiles = useCallback((files: File[]) => {
    const newImages: SelectedImage[] = files.map((file) => {
      const preview = URL.createObjectURL(file);
      objectUrls.current.push(preview);
      return { id: crypto.randomUUID(), file, preview };
    });
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setImages((prev) => {
      const removed = prev[index];
      if (removed) {
        URL.revokeObjectURL(removed.preview);
        objectUrls.current = objectUrls.current.filter((u) => u !== removed.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const clearFiles = useCallback(() => {
    objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    objectUrls.current = [];
    setImages([]);
  }, []);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  return { images, addFiles, removeFile, clearFiles };
};

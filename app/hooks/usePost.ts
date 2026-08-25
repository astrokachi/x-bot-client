import { useState } from "react";
import { postApi } from "~/api/endpoints";
import { useToast } from "~/hooks/use-toast";

export const usePost = () => {
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const { addToast } = useToast();

  const post = async (text: string, files?: File[]): Promise<boolean> => {
    setPosting(true);
    setPostError(null);

    try {
      const formData = new FormData();
      formData.append("message", text);
      if (files) {
        for (const file of files) {
          formData.append("media", file);
        }
      }

      await postApi.post(formData);
      addToast("Post published successfully", "success");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to publish post";
      setPostError(message);
      addToast(message, "error");
      return false;
    } finally {
      setPosting(false);
    }
  };

  return { post, posting, postError };
};

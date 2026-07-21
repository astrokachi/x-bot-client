import { useEffect, useRef, useState } from "react";
import {
  XIcon,
  ChatCircleIcon,
  RepeatIcon,
  HeartIcon,
  BookmarkSimpleIcon,
  ShareNetworkIcon,
  ImageIcon,
  CaretDownIcon,
  PencilSimpleLineIcon,
  CheckCircleIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import PostImageGrid from "~/components/chat/post-image-grid";
import Spinner from "~/components/spinner";
import type { SelectedImage } from "~/hooks/useImageFiles";

interface PreviewPostModalProps {
  content: string;
  user?: { name?: string; username?: string; profile_img_url?: string };
  date?: string;
  onClose: () => void;
  onPost?: (text: string, files?: File[]) => void;
  onRefine?: (text: string, files?: File[]) => void;
  onAddFiles?: (files: File[]) => void;
  onRemoveFile?: (index: number) => void;
  images?: SelectedImage[];
  posting?: boolean;
}

const PreviewPostModal = ({
  content,
  user,
  date,
  onClose,
  onPost,
  onRefine,
  onAddFiles,
  onRemoveFile,
  images = [],
  posting = false,
}: PreviewPostModalProps) => {
  const [text, setText] = useState(content);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    onAddFiles?.(selected);
    e.target.value = "";
  };

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div
        className="preview-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="preview-modal-header">
          <h3 className="preview-modal-title">Preview post</h3>
          <button
            type="button"
            className="preview-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon size={24} weight="bold" />
          </button>
        </div>

        <div className="preview-tweet">
          <div className="preview-tweet-user">
            {user?.profile_img_url ? (
              <img className="preview-avatar" src={user.profile_img_url} alt={user.name ?? "User"} />
            ) : (
              <div className="preview-avatar" />
            )}
            <div className="preview-user-meta">
              <span className="preview-username">{user?.name ?? "Username"}</span>
              <CheckCircleIcon className="preview-verified" size={16} weight="fill" />
              <span className="preview-handle">
                @{user?.username ?? "xhandle"} · {formattedDate || "Jul 21"}
              </span>
            </div>
            <button type="button" className="preview-overflow-btn" aria-label="More">
              <DotsThreeIcon size={18} weight="bold" />
            </button>
          </div>

          <textarea
            className="preview-edit-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />

          <PostImageGrid images={images} onRemove={(i) => onRemoveFile?.(i)} />

          <div className="preview-engagements">
            <div className="preview-engage-item">
              <ChatCircleIcon size={19} weight="regular" />
              <span className="preview-engage-count">0</span>
            </div>
            <div className="preview-engage-item">
              <RepeatIcon size={19} weight="regular" />
              <span className="preview-engage-count">0</span>
            </div>
            <div className="preview-engage-item">
              <HeartIcon size={19} weight="regular" />
              <span className="preview-engage-count">0</span>
            </div>
            <div className="preview-engage-item">
              <BookmarkSimpleIcon size={19} weight="regular" />
              <span className="preview-engage-count">0</span>
            </div>
            <div className="preview-engage-item">
              <ShareNetworkIcon size={19} weight="regular" />
            </div>
          </div>
        </div>

        <div className="preview-modal-footer">
          <button type="button" className="image-btn" aria-label="Add image" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />

          <div className="preview-actions">
            <div className="preview-post-split">
              <button
                type="button"
                className="preview-post-btn"
                disabled={posting}
                onClick={() => onPost?.(text, images.length > 0 ? images.map((img) => img.file) : undefined)}
              >
                {posting ? <Spinner /> : "Post"}
              </button>
              <span className="preview-post-divider" />
              <button
                type="button"
                className="preview-post-caret"
                aria-label="More post options"
              >
                <CaretDownIcon size={12} weight="regular" />
              </button>
            </div>
            {onRefine && (
              <button
                type="button"
                className="preview-refine-btn"
                onClick={() => onRefine(text, images.length > 0 ? images.map((img) => img.file) : undefined)}
              >
                Refine
                <PencilSimpleLineIcon size={16} weight="regular" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPostModal;

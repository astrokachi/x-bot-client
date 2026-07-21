import { ImageIcon, SparkleIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type SubmitEvent } from "react";
import ImageStrip from "~/components/chat/image-strip";
import type { SelectedImage } from "~/hooks/useImageFiles";

interface ChatFormProps {
  suggestion?: string;
  refineDraft?: string;
  onClearRefine?: () => void;
  onSubmit?: (content: string, files?: File[]) => void;
  onAddFiles?: (files: File[]) => void;
  onRemoveFile?: (index: number) => void;
  images?: SelectedImage[];
  promptCount?: number;
  maxPrompts?: number;
  disabled?: boolean;
  submitLabel?: string;
}

const previewDraft = (text: string, max = 120) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

export const ChatForm = ({
  suggestion,
  refineDraft,
  onClearRefine,
  onSubmit,
  onAddFiles,
  onRemoveFile,
  images = [],
  promptCount = 0,
  maxPrompts = 6,
  disabled = false,
  submitLabel = "Generate post",
}: ChatFormProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;

    const typed = content.trim();
    if (!typed && !refineDraft && images.length === 0) return;

    const message = refineDraft
      ? `Refine this draft:\n"${refineDraft}"${typed ? `\n\n${typed}` : ""}`
      : typed;

    onSubmit?.(message, images.length > 0 ? images.map((img) => img.file) : undefined);
    setContent("");
    onClearRefine?.();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    onAddFiles?.(selected);
    e.target.value = "";
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [content]);

  useEffect(() => {
    if (suggestion) setContent(suggestion);
  }, [suggestion]);

  useEffect(() => {
    if (refineDraft) textareaRef.current?.focus();
  }, [refineDraft]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="chat-form">
      <div className="textarea-wrapper">
        {refineDraft && (
          <div className="refine-chip">
            <span className="refine-chip-text">{previewDraft(refineDraft)}</span>
            <button
              type="button"
              className="refine-chip-remove"
              onClick={onClearRefine}
              aria-label="Remove draft"
            >
              <XIcon size={14} weight="bold" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Enter a topic or describe what you want to talk about"
          value={content}
          onChange={handleChange}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
          disabled={disabled}
        />
      </div>
      <ImageStrip images={images} onRemove={(i) => onRemoveFile?.(i)} />
      <div className="form-footer">
        <div className="form-footer-left">
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
          <div className="prompts-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(promptCount / maxPrompts) * 100}%` }}
              />
            </div>
            <span className="prompts-count">{promptCount}/{maxPrompts} prompts</span>
          </div>
        </div>
        <button type="submit" className="generate-btn" disabled={disabled}>
          <SparkleIcon size={18} />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
};

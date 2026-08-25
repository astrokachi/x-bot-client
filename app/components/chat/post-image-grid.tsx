import { XCircleIcon } from "@phosphor-icons/react";
import type { SelectedImage } from "~/hooks/useImageFiles";
import "~/styles/components/post-image-grid.scss";

interface PostImageGridProps {
  images: SelectedImage[];
  onRemove: (index: number) => void;
}

const PostImageGrid = ({ images, onRemove }: PostImageGridProps) => {
  if (images.length === 0) return null;

  const count = images.length;

  if (count > 4) {
    return (
      <div className="post-image-grid post-image-grid--strip">
        <div className="post-image-grid-strip">
          {images.map((img, i) => (
            <div key={img.id} className="post-image-grid-cell">
              <img className="post-image-grid-img" src={img.preview} alt="" />
              <button
                type="button"
                className="post-image-grid-remove"
                onClick={() => onRemove(i)}
                aria-label="Remove image"
              >
                <XCircleIcon size={20} weight="fill" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="post-image-grid">
      <div className={`post-image-grid-inner count-${count}`}>
        {images.map((img, i) => (
          <div key={img.id} className="post-image-grid-cell">
            <img className="post-image-grid-img" src={img.preview} alt="" />
            <button
              type="button"
              className="post-image-grid-remove"
              onClick={() => onRemove(i)}
              aria-label="Remove image"
            >
              <XCircleIcon size={20} weight="fill" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostImageGrid;

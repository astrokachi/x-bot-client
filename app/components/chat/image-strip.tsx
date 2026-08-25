import { XCircleIcon } from "@phosphor-icons/react";
import "~/styles/components/image-strip.scss";

interface ImageStripProps {
  images: { id: string; preview: string }[];
  onRemove: (index: number) => void;
}

const ImageThumbnail = ({ preview, onRemove }: { preview: string; onRemove: () => void }) => (
  <div className="image-strip-thumb">
    <img className="image-strip-thumb-img" src={preview} alt="" />
    <button type="button" className="image-strip-thumb-remove" onClick={onRemove} aria-label="Remove image">
      <XCircleIcon size={15} weight="fill" />
    </button>
  </div>
);

const ImageStrip = ({ images, onRemove }: ImageStripProps) => {
  if (images.length === 0) return null;

  return (
    <div className="image-strip">
      {images.map((img, i) => (
        <ImageThumbnail
          key={img.id}
          preview={img.preview}
          onRemove={() => onRemove(i)}
        />
      ))}
    </div>
  );
};

export default ImageStrip;

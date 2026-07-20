import TypingIndicator from "./typing-indicator";
import "~/styles/dashboard/posts.scss";

interface RefinedOutputCardProps {
  content: string | null;
  isTyping: boolean;
  user?: { name?: string; username?: string; profile_img_url?: string };
  onPreview: (text: string) => void;
}

const RefinedOutputCard = ({
  content,
  isTyping,
  user,
  onPreview,
}: RefinedOutputCardProps) => {
  const showTyping = isTyping && content === null;

  return (
    <div className="refined-output-card">
      <div className="refined-output-header">
        <div className="refined-output-user">
          {user?.profile_img_url ? (
            <img className="refined-output-avatar" src={user.profile_img_url} alt={user.name ?? "User"} />
          ) : (
            <div className="refined-output-avatar" />
          )}
        </div>
        <span className="refined-output-badge">Standard</span>
      </div>

      <div className="refined-output-body">
        {showTyping ? (
          <TypingIndicator />
        ) : content ? (
          <p className="refined-output-text">{content}</p>
        ) : (
          <p className="refined-output-placeholder">
            Your refined post will appear here…
          </p>
        )}
      </div>

      {content && (
        <button
          type="button"
          className="refined-preview-btn"
          onClick={() => onPreview(content)}
        >
          Preview
        </button>
      )}
    </div>
  );
};

export default RefinedOutputCard;

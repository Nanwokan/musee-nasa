import { useState } from "react";
import { FolderPlus } from "lucide-react";
import AddToExpositionModal from "./addToExpositionModal";

export default function AddToExpositionButton({ media }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-ghost btn-icon"
        type="button"
        aria-label="Ajouter à une exposition"
        title="Ajouter à une exposition"
        onClick={() => setIsOpen(true)}
      >
        <FolderPlus size={18} aria-hidden="true" />
      </button>

      {isOpen && <AddToExpositionModal media={media} onClose={() => setIsOpen(false)} />}
    </>
  );
}

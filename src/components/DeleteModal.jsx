import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import deleteImage from '../assets/bin-image.png';

export default function DeleteModal({ open, onConfirm, onCancel }) {
  const dialog = useRef(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (open && !modal.open) modal.showModal();
    if (!open && modal.open) modal.close();
  }, [open]);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    function handleCancel(e) {
      e.preventDefault();
      onCancel?.();
    }

    function handleBackdropClick(e) {
      if (e.target === modal) onCancel?.();
    }

    modal.addEventListener('cancel', handleCancel);
    modal.addEventListener('click', handleBackdropClick);

    return () => {
      modal.removeEventListener('cancel', handleCancel);
      modal.removeEventListener('click', handleBackdropClick);
    };
  }, [onCancel]);

  if (!open) return null;

  return createPortal(
    <dialog
      ref={dialog}
      className="modal p-0 bg-transparent"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-[#1b2033] text-white p-8 rounded-2xl flex flex-col items-center">
          <img src={deleteImage} alt="Rubbish bin image" className="w-28 h-28 mb-4" />
          <h2 id="delete-modal-title" className="text-2xl mb-2 text-rose-400">Are you sure?</h2>
          <p id="delete-modal-desc" className="py-3 text-center">
            This dessert will be deleted from your list
          </p>

          <div className="modal-buttons flex gap-4 mt-4">
            <button type="button" onClick={onCancel} className="cancel-button px-4 py-2 rounded-lg bg-gray-400 hover:brightness-90">
              Cancel
            </button>
            <button type="button" onClick={onConfirm} className="confirmation-button px-4 py-2 rounded-lg bg-rose-600 hover:brightness-90">
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById('delete-modal')
  );
}
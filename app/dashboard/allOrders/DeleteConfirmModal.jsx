// components/orders/DeleteConfirmModal.jsx

import { Trash2, X } from "lucide-react";

const DeleteConfirmModal = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
    dangerLabel = "This action cannot be undone.",
}) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-pink-200/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-pink-50 shadow-2xl border border-pink-200">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-pink-200">
                    <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-[var(--pink)]" />
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-pink-100 transition"
                    >
                        <X className="w-5 h-5 text-pink-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-5 py-4 space-y-4">
                    <div className="text-sm text-pink-700">
                        {description || "Are you sure you want to delete this item?"}
                    </div>

                    <div className="rounded-xl border border-pink-300 bg-pink-100 px-4 py-3 text-sm text-pink-800 font-medium">
                        {dangerLabel}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-pink-200">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg text-sm font-medium border border-pink-300 text-pink-700 bg-white hover:bg-pink-100 transition disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--pink)] text-white hover:bg-pink-700 transition disabled:opacity-60"
                    >
                        {isLoading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

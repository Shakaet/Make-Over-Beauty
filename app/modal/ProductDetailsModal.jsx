export const ProductDetailsModal = ({ title, open, onClose, children }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-[61] w-[95vw] max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-200">
                <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white">
                    <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 transition"
                        aria-label="Close"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
                <div className="px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

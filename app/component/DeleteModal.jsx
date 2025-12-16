"use client";
import React from "react";


export default function DeleteModal({ open, onClose, onConfirm, loading, title }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold">Delete {title || 'item'}?</h3>
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                    <button onClick={onConfirm} disabled={loading} className="px-3 py-1 bg-[var(--pink)] text-white rounded">{loading ? 'Deleting...' : 'Delete'}</button>
                </div>
            </div>
        </div>
    );
}
import { X } from "lucide-react";

export const ProductForm = ({
    modalMode,
    formData,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    setShowModal,
    loading
}) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-pink-300 shadow-2xl my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-pink-900">
                        {modalMode === 'create' ? '✨ Create Product' : '✏️ Edit Product'}
                    </h2>
                    <button
                        className="text-pink-900 hover:text-pink-600 transition-colors p-2 hover:bg-pink-100 rounded-full"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="lowprice"
                                value={formData.lowprice}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Original Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="highprice"
                                value={formData.highprice}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Discount (%) *</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                required
                                max="100"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Quantity *</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Rating (0-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                max="5"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Reviews</label>
                            <input
                                type="number"
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Ingredients *</label>
                        <input
                            type="text"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleInputChange}
                            required
                            placeholder="item1, item2"
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="tag1, tag2"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Shipping</label>
                            <input
                                type="text"
                                name="shippingInfo"
                                value={formData.shippingInfo}
                                onChange={handleInputChange}
                                placeholder="Free shipping"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    <div className="border-t border-pink-200 pt-6">
                        <h3 className="text-pink-900 font-bold mb-4">Images {modalMode === 'create' && '*'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['imagePrimary', 'imageSecondary', 'imageThird', 'imageFourth'].map((imgField, idx) => (
                                <div key={imgField}>
                                    <label className="block text-pink-900 mb-2 font-semibold text-sm">
                                        Image {idx + 1} {modalMode === 'create' && '*'}
                                    </label>
                                    <input
                                        type="file"
                                        name={imgField}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required={modalMode === 'create'}
                                        className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-pink-600 file:text-white hover:file:from-pink-600 hover:file:to-pink-700 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 px-6 py-3 bg-white border border-pink-200 text-pink-900 rounded-xl font-semibold hover:bg-pink-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 shadow-lg"
                        >
                            {loading ? 'Saving...' : modalMode === 'create' ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
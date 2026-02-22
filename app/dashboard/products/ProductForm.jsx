"use client";

import { X } from "lucide-react";

export const ProductForm = ({
    modalMode,
    formData,
    categories,
    brands,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    setShowModal,
    loading,
}) => {
    // Find the selected category object
    const selectedCategory = categories.find(cat => cat._id === formData.category_id);

    // Get subcategories for the selected category
    const subCategories = selectedCategory?.subCategories || [];

    // Helper function to handle category change
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        handleInputChange({ target: { name: 'category_id', value: categoryId } });
        // Reset subCategory when category changes
        handleInputChange({ target: { name: 'subcategory', value: '' } });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-pink-300 shadow-2xl my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-pink-900">
                        {modalMode === "create" ? "Create Product" : "Edit Product"}
                    </h2>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-pink-900 hover:text-[var(--pink)] transition-colors p-2 hover:bg-pink-100 rounded-full"
                    >
                        <X size={28} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Images Section */}
                    <div className="border-t border-pink-200 pt-6">
                        <h3 className="text-pink-900 font-bold mb-4">
                            Images {modalMode === "create" && "*"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["imagePrimary", "imageSecondary", "imageThird", "imageFourth"].map(
                                (imgField, idx) => (
                                    <div key={imgField}>
                                        <label className="block text-pink-900 mb-2 font-semibold text-sm">
                                            Image {idx + 1} {modalMode === "create" && "*"}
                                        </label>
                                        <input
                                            type="file"
                                            name={imgField}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            required={modalMode === "create" && idx === 0}
                                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-[var(--pink)] file:text-white hover:file:from-[var(--pink)] hover:file:to-pink-700 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all text-sm"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                        />
                    </div>

                    {/* Category, Subcategory & Brand */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">
                                Category *
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleCategoryChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sub Category */}
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">
                                Sub-Category *
                            </label>
                            <select
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleInputChange}
                                required
                                disabled={!formData.category_id}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all disabled:opacity-50"
                            >
                                <option value="">Select Sub-Category</option>
                                {subCategories.map(sub => (
                                    <option key={sub._id} value={sub.name}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">
                                Brand
                            </label>
                            <select
                                name="brand_id"
                                value={formData.brand_id}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            >
                                <option value="">Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand._id} value={brand._id}>
                                        {brand.brandName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Ingredients *</label>
                        <input
                            type="text"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleInputChange}
                            required
                            placeholder="item1, item2"
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                        />
                    </div>

                    {/* Tags & Shipping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Skin Concern</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="acne, dry skin"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
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
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl resize-none focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                        />
                    </div>

                    {/* Offer Section */}
                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
                        <input
                            type="checkbox"
                            name="offer"
                            checked={formData.offer}
                            onChange={(e) =>
                                handleInputChange({
                                    target: { name: "offer", value: e.target.checked },
                                })
                            }
                            className="w-5 h-5 accent-pink-500"
                        />
                        <label className="text-pink-900 font-semibold">Special Offer Product</label>
                    </div>

                    {/* Offer Fields */}
                    {formData.offer && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-pink-50 rounded-xl">
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Season</label>
                                <select
                                    name="season"
                                    value={formData.season || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                                >
                                    <option value="">None</option>
                                    <option value="summer">Summer</option>
                                    <option value="winter">Winter</option>
                                    <option value="spring">Spring</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Festival</label>
                                <select
                                    name="festival"
                                    value={formData.festival || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                                >
                                    <option value="">None</option>
                                    <option value="eid-offer">Eid Offer</option>
                                    <option value="puja-offer">Puja Offer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Thematic Offer</label>
                                <select
                                    name="Thematic"
                                    value={formData.Thematic || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                                >
                                    <option value="">None</option>
                                    <option value="black-friday">Black Friday</option>
                                    <option value="clearance-sale">Clearance Sale</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Pricing Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Discount Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="lowprice"
                                value={formData.lowprice || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Original Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="highprice"
                                value={formData.highprice || ''}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount || ''}
                                onChange={handleInputChange}
                                max={100}
                                min={0}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Stock & Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock || ''}
                                onChange={handleInputChange}
                                required
                                min={0}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Quantity *</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity || ''}
                                onChange={handleInputChange}
                                min={0}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Rating (0-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                value={formData.rating || ''}
                                onChange={handleInputChange}
                                max={5}
                                min={0}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Reviews</label>
                            <input
                                type="number"
                                name="reviews"
                                value={formData.reviews || ''}
                                onChange={handleInputChange}
                                min={0}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6 border-t border-pink-200">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 px-6 py-3 bg-white border border-pink-200 text-pink-900 rounded-xl font-semibold hover:bg-pink-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-[var(--pink)] text-white rounded-xl font-semibold hover:from-pink-600 hover:to-[var(--pink)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? "Saving..." : modalMode === "create" ? "Create Product" : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
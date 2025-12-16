"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

const CATEGORY_OPTIONS = [
    "Skincare",
    "Haircare",
    "Makeup",
    "Body Care",
    "Fragrance",
    "Wellness",
];

const SUBCATEGORY_OPTIONS = {
    Skincare: [
        "Serum",
        "Lotion",
        "Toner",
        "Moisturizer",
        "Cleanser",
        "Exfoliator",
        "Face Mask",
        "Sunscreen",
    ],
    Haircare: [
        "Shampoo",
        "Conditioner",
        "Hair Oil",
        "Hair Mask",
        "Hair Serum",
        "Hair Treatment",
    ],
    Makeup: [
        "Foundation",
        "Concealer",
        "Compact Powder",
        "Blush",
        "Highlighter",
        "Lipstick",
        "Lip Gloss",
        "Lip Liner",
        "Eyeliner",
        "Mascara",
        "Eyeshadow",
    ],
    "Body Care": [
        "Body Wash",
        "Body Lotion",
        "Body Scrub",
        "Body Oil",
        "Hand Cream",
        "Foot Care",
    ],
    Fragrance: [
        "Perfume",
        "Body Mist",
        "Deodorant",
        "Roll On",
    ],
    Wellness: [
        "Supplements",
        "Essential Oils",
        "Herbal Products",
        "Personal Care Devices",
    ],
};


export const ProductForm = ({
    modalMode,
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    setShowModal,
    loading,
}) => {

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

                <div className="space-y-6">
                    {/* Images */}
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
                                            required={modalMode === "create"}
                                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-pink-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-[var(--pink)] file:text-white hover:file:from-[var(--pink)] hover:file:to-pink-700 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all text-sm"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                        />
                    </div>

                    {/* Category & Brand */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            >
                                <option value="">Select Category</option>
                                {CATEGORY_OPTIONS.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
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
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                required
                                disabled={!formData.category}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl disabled:opacity-50"
                            >
                                <option value="">Select Sub-Category</option>
                                {SUBCATEGORY_OPTIONS[formData.category]?.map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">
                                Brand
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                placeholder="Brand name"
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            />
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
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
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
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
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
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
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
                            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl resize-none"
                        />
                    </div>

                    {/* Offer Toggle */}
                    <div className="flex items-center gap-3">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Season</label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                                >
                                    <option value={null}>None</option>
                                    <option value="summer">Summer</option>
                                    <option value="winter">Winter</option>
                                    <option value="spring">Spring</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Festival</label>
                                <select
                                    name="festival"
                                    value={formData.festival}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                                >
                                    <option value={null}>None</option>
                                    <option value="eid-offer">Eid Offer</option>
                                    <option value="puja-offer">Puja Offer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-pink-900 mb-2 font-semibold">Thematic Offer</label>
                                <select
                                    name="Thematic"
                                    value={formData.Thematic}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                                >
                                    <option value={null}>None</option>
                                    <option value="black-friday">Black Friday</option>
                                    <option value="clearance-sale">Clearance Sale</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Discount Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="lowprice"
                                value={formData.lowprice}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
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
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Discount (%) *</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                max={100}
                                disabled={!formData.offer}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
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
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Rating (0-5)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                max={5}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-900 mb-2 font-semibold">Reviews</label>
                            <input
                                type="number"
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 px-6 py-3 bg-white border border-pink-200 text-pink-900 rounded-xl font-semibold hover:bg-pink-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-[var(--pink)] text-white rounded-xl font-semibold disabled:opacity-50"
                        >
                            {loading ? "Saving..." : modalMode === "create" ? "Create" : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

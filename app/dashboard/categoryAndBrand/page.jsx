'use client'

import { brandApi } from "@/app/api/brandApi";
import { categoryApi } from "@/app/api/categoryApi";
import { Plus, Edit2, Trash2, X, Save, Folder, Tag } from 'lucide-react';
import { useEffect, useState } from "react";

const CategoryAndBrand = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        categoryName: '',
        subCategories: [],
        brandName: '',
    });
    const [subCategoryInput, setSubCategoryInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'categories') {
                const res = await categoryApi.getAllCategory();
                setCategories(res || []);
            } else {
                const res = await brandApi.getAllBrands();
                setBrands(res || []);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        if (item) {
            if (activeTab === 'categories') {
                setFormData({
                    categoryName: item.categoryName || '',
                    subCategories: item.subCategories || [],
                });
            } else {
                setFormData({ brandName: item.brandName || '' });
            }
        } else {
            setFormData({
                categoryName: '',
                subCategories: [],
                brandName: '',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setSubCategoryInput('');
    };

    const addSubCategory = () => {
        if (subCategoryInput.trim()) {
            setFormData({
                ...formData,
                subCategories: [...formData.subCategories, { name: subCategoryInput.trim() }],
            });
            setSubCategoryInput('');
        }
    };

    const removeSubCategory = (index) => {
        setFormData({
            ...formData,
            subCategories: formData.subCategories.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async () => {
        if (activeTab === 'categories' && !formData.categoryName.trim()) {
            alert('Category name is required');
            return;
        }
        if (activeTab === 'brands' && !formData.brandName.trim()) {
            alert('Brand name is required');
            return;
        }

        setLoading(true);

        try {
            if (activeTab === 'categories') {
                const data = {
                    categoryName: formData.categoryName,
                    subCategories: formData.subCategories,
                };

                if (modalMode === 'create') {
                    const res = await categoryApi.createCategory(data);
                    setCategories([...categories, res.data]);
                } else {
                    await categoryApi.updateCategory(selectedItem._id, data);
                    setCategories(categories.map(c =>
                        c._id === selectedItem._id ? { ...c, ...data } : c
                    ));
                }
            } else {
                const data = { brandName: formData.brandName };

                if (modalMode === 'create') {
                    const res = await brandApi.createBrand(data);
                    setBrands([...brands, res.data]);
                } else {
                    await brandApi.updateBrand(selectedItem._id, data);
                    setBrands(brands.map(b =>
                        b._id === selectedItem._id ? { ...b, ...data } : b
                    ));
                }
            }

            closeModal();
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error: ' + (error.message || 'Failed to save'));
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        setLoading(true);
        try {
            if (activeTab === 'categories') {
                await categoryApi.deleteCategory(id);
                setCategories(categories.filter(c => c._id !== id));
            } else {
                await brandApi.deleteBrand(id);
                setBrands(brands.filter(b => b._id !== id));
            }
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Error: ' + (error.message || 'Failed to delete'));
        }
        setLoading(false);
    };

    const items = activeTab === 'categories' ? categories : brands;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text[var(--maroon)]" >
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">Manage your categories and brands</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'categories'
                            ? 'text-white shadow-lg bg-[var(--pink)]'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Folder size={20} />
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveTab('brands')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'brands'
                            ? 'text-white shadow-lg bg-[var(--pink)]'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Tag size={20} />
                        Brands
                    </button>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
                    <div className="text-gray-600">
                        Total {activeTab}: <span className="font-semibold">{items.length}</span>
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className="flex items-center gap-2 px-4 py-2  bg-[var(--pink)] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        <Plus size={20} />
                        Add {activeTab === 'categories' ? 'Category' : 'Brand'}
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-1  text-[var(--maroon)]" >
                                        {item.categoryName || item.brandName}
                                    </h3>
                                    {activeTab === 'categories' && item.subCategories?.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-500 mb-2">Subcategories:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.subCategories.map((sub, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2 py-1 rounded-full text-[var(--maroon)] bg-[var(--blush)]"
                                                    >
                                                        {sub.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => openModal('edit', item)}
                                    className="flex-1 flex items-center text-[var(--rose)] border-[var(--rose)] justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-red-50 transition-colors"
                                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {items.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4 flex justify-center">
                            {activeTab === 'categories' ? <Folder size={64} /> : <Tag size={64} />}
                        </div>
                        <p className="text-gray-500 text-lg">
                            No {activeTab} found. Create your first one!
                        </p>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-[var(--maroon)]">
                                        {modalMode === 'create' ? 'Create' : 'Edit'}{' '}
                                        {activeTab === 'categories' ? 'Category' : 'Brand'}
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div>
                                    {activeTab === 'categories' ? (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium mb-2 text-[var(--maroon)]" >
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.categoryName}
                                                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg border-[var(--light)] focus:outline-none focus:ring-2"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium mb-2 text-[var(--maroon)]">
                                                    Subcategories
                                                </label>
                                                <div className="flex gap-2 mb-3">
                                                    <input
                                                        type="text"
                                                        value={subCategoryInput}
                                                        onChange={(e) => setSubCategoryInput(e.target.value)}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                addSubCategory();
                                                            }
                                                        }}
                                                        placeholder="Add subcategory"
                                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none border-[var(--light)] focus:ring-2"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={addSubCategory}
                                                        className="px-4 py-2 rounded-lg text-white font-medium bg-[var(--rose)]"
                                                    >
                                                        <Plus size={20} />
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.subCategories.map((sub, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[var(--blush)] text-[var(--maroon)]"
                                                        >
                                                            {sub.name}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSubCategory(idx)}
                                                                className="hover:opacity-70"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-2 text-[var(--maroon)]" >
                                                Brand Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.brandName}
                                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-[var(--light)]"
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors text-[var(--maroon)] border-[var(--light)]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 bg-[var(--pink)] px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
                                            <Save size={20} />
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryAndBrand;

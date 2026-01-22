'use client'

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Star, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useProduct } from '@/app/hooks/useProducts';
import { ProductFilter } from './ProductFilter';
import { ProductForm } from './ProductForm';
import { categoryApi } from '@/app/api/categoryApi';
import { brandApi } from '@/app/api/brandApi';

const ProductDashboard = () => {
    const {
        products,
        allProducts,
        loading,
        error,
        totalPages,
        totalProducts,
        currentPage,
        searchTerm,
        selectedCategories,
        priceRange,
        sortOption,
        fetchProducts,
        fetchAllProducts,
        setSearchTerm,
        setSelectedCategories,
        setPriceRange,
        setSortOption,
        setCurrentPage,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useProduct();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [categories, setCategories] = useState([]); // This will store category objects
    const [brands, setBrands] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const [formData, setFormData] = useState({
        name: '', lowprice: '', highprice: '',
        discount: '', stock: '', rating: '',
        reviews: '', category_id: '', subcategory: "", quantity: '',
        description: '', ingredients: '', tags: '',
        shippingInfo: '', brand_id: '',
        season: null,
        festival: null,
        Thematic: null,
        offer: false,
    });

    const [images, setImages] = useState({
        imagePrimary: null, imageSecondary: null, imageThird: null, imageFourth: null,
    });

    // Fetch categories and brands on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await categoryApi.getAllCategory();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };

        const fetchBrands = async () => {
            try {
                const brandsData = await brandApi.getAllBrands();
                setBrands(brandsData);
            } catch (error) {
                console.error('Error fetching brands:', error);
                setBrands([]);
            }
        };

        fetchCategories();
        fetchBrands();
        fetchProducts();
        fetchAllProducts();
    }, [fetchProducts, fetchAllProducts]);

    useEffect(() => {
        if (!formData.offer) {
            setFormData((prev) => ({
                ...prev,
                season: null,
                festival: null,
                Thematic: null,
                discount: 0,
            }));
        }
    }, [formData.offer]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) setImages(prev => ({ ...prev, [name]: files[0] }));
    };

    const resetForm = () => {
        setFormData({
            name: '', lowprice: '', highprice: '',
            discount: '', stock: '', rating: '',
            reviews: '', category_id: '', subcategory: "", quantity: '',
            description: '', ingredients: '', tags: '',
            shippingInfo: '', brand_id: '',
            season: null,
            festival: null,
            Thematic: null,
            offer: false,
        });
        setImages({ imagePrimary: null, imageSecondary: null, imageThird: null, imageFourth: null });
    };

    const openCreateModal = () => {
        setModalMode('create');
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setModalMode('edit');
        setSelectedProduct(product);

        // Get category and brand IDs
        const categoryId = product.category_id?._id || product.category_id || "";
        const brandId = product.brand_id?._id || product.brand_id || "";

        // Get subCategory - check multiple possible locations
        let subCategoryValue = "";

        // Priority 1: Direct property
        if (product.subcategory) {
            subCategoryValue = product.subcategory;
        }
        // Priority 2: From category object (if populated)
        else if (product.category_id && product.category_id.subCategories && product.category) {
            // Try to match category name with subCategories
            const category = categories.find(cat => cat.categoryName === product.category);
            if (category) {
                const foundSub = category.subCategories.find(sub => sub.name === product.subcategory);
                if (foundSub) {
                    subCategoryValue = foundSub.name;
                }
            }
        }

        setFormData({
            name: product.name,
            lowprice: product.lowprice,
            highprice: product.highprice || '',
            discount: product.discount,
            stock: product.stock,
            rating: product.rating,
            reviews: product.reviews,
            category_id: categoryId,
            subcategory: subCategoryValue,
            quantity: product.quantity,
            description: product.description,
            ingredients: Array.isArray(product.ingredients)
                ? product.ingredients.join(', ')
                : product.ingredients,
            tags: Array.isArray(product.tags)
                ? product.tags.join(', ')
                : product.tags,
            shippingInfo: Array.isArray(product.shippingInfo)
                ? product.shippingInfo.join(', ')
                : product.shippingInfo,
            brand_id: brandId,
            season: product.season || null,
            festival: product.festival || null,
            Thematic: product.Thematic || null,
            offer: product.offer || false,
        });

        setImages({
            imagePrimary: null,
            imageSecondary: null,
            imageThird: null,
            imageFourth: null,
        });

        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            lowprice: parseFloat(formData.lowprice) || null,
            highprice: formData.highprice ? parseFloat(formData.highprice) : undefined,
            discount: parseFloat(formData.discount) || 0,
            stock: parseInt(formData.stock),
            rating: formData.rating ? parseFloat(formData.rating) : 0,
            reviews: formData.reviews ? parseInt(formData.reviews) : 0,
            category_id: formData.category_id,
            quantity: parseInt(formData.quantity),
            subcategory: formData.subcategory || null, // Ensure this is included
            description: formData.description,
            ingredients: formData.ingredients.split('.' || ';').map(i => i.trim()),
            tags: formData.tags ? formData.tags.split('.' || ',').map(t => t.trim()) : [],
            shippingInfo: formData.shippingInfo ? formData.shippingInfo.split('.').map(s => s.trim()) : [],
            brand_id: formData.brand_id || null,
            season: formData.season || null,
            festival: formData.festival || null,
            Thematic: formData.Thematic || null,
            offer: formData.offer,
        };

        let result;
        if (modalMode === 'create') {
            result = await handleCreate(payload, images);
        } else {
            result = await handleUpdate(selectedProduct._id, payload, images);
        }

        if (result.success) {
            setShowModal(false);
            resetForm();
        }
    };
    const confirmDelete = (productId) => {
        setDeleteProductId(productId);
        setShowDeleteConfirm(true);
    };

    const executeDelete = async () => {
        const result = await handleDelete(deleteProductId);
        if (result.success) {
            setShowDeleteConfirm(false);
            setDeleteProductId(null);
        }
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? [] : [category]);
    };

    // Extract category names for filtering
    const categoryNames = categories.map(cat => cat.categoryName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                            Product Management
                        </h1>
                        <p className="text-[var(--pink)]">Manage your inventory with elegance</p>
                    </div>
                    <button onClick={openCreateModal} className="bg-gradient-to-r from-[var(--pink)] to-[var(--pink)] text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:from-pink-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-pink-500/50">
                        <Plus size={20} />
                        New Product
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mb-6 border border-white/20 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 ">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--pink)]" size={20} />
                            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[var(--pink)] placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all" />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)} className="px-6 py-1 bg-[var(--pink)]/90 border border-pink-500/10 rounded-2xl text-white hover:bg-pink-400/90 transition-all flex items-center gap-2 justify-center">
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <ProductFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            categories={categoryNames} // Pass category names only
                            selectedCategories={selectedCategories}
                            toggleCategory={toggleCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    )}
                </div>

                {error && <div className="bg-red-500/20 border border-red-500/50 text-rose-200 px-6 py-4 rounded-2xl mb-6">{error}</div>}

                {loading && !showModal ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[var(--pink)] mt-4">Loading products...</p>
                    </div>
                ) : (
                    <>
                        <div className="text-[var(--pink)] mb-4">Showing {products.length} of {totalProducts} products</div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {products.map(product => (
                                <div key={product._id} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-pink-400 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30">
                                    <div className="relative h-56 bg-gradient-to-br from-pink-500/20 to-pink-500/20 overflow-hidden">
                                        <img src={product.imagePrimary} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-[var(--pink)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">-{product.discount}%</div>
                                        {product.stock < 10 && <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Low Stock</div>}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-[var(--pink)] mb-2 truncate">{product.name}</h3>
                                        <p className="text-pink-500 text-sm mb-3 line-clamp-2">{product.description}</p>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-pink-400 font-semibold">{product.rating.toFixed(1)}</span>
                                            </div>
                                            <span className="text-pink-400 text-sm">({product.reviews})</span>
                                        </div>

                                        <div className="flex items-center justify-between  pb-4 border-b border-white/10">
                                            <div>
                                                {product.lowprice ? (
                                                    <div>
                                                        <div className="text-2xl font-bold text-pink-400">${product.lowprice}</div>
                                                        <div className="text-sm text-pink-300 line-through">${product.highprice}</div>
                                                    </div>
                                                ) : (

                                                    <div className="text-2xl font-bold text-pink-400">${product.highprice}</div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[var(--pink)] text-xs">Stock</div>
                                                <div className="text-pink-400 font-bold text-lg">{product.stock}</div>
                                            </div>
                                        </div>

                                        {/* In the ProductDashboard component, update the product card section: */}
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-gradient-to-r from-[var(--pink)]/30 to-[var(--pink)]/30 text-white rounded-full text-xs font-medium border border-pink-400/30">
                                                {product.category_id?.categoryName}
                                            </span>
                                            {product.subcategory && (
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/30 to-blue-500/30 text-white rounded-full text-xs font-medium border border-blue-400/30">
                                                    {product.subcategory}
                                                </span>
                                            )}
                                            <span className="px-3 py-1 bg-gradient-to-r from-[var(--beige)]/30 to-[var(--beige)]/30 text-white rounded-full text-xs font-medium border border-pink-400/30">
                                                {product.brand_id?.brandName}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal(product)} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                                                <Edit2 size={16} />
                                                Edit
                                            </button>
                                            <button onClick={() => confirmDelete(product._id)} className="flex-1 bg-gradient-to-r from-red-600 to-[var(--pink)] text-white py-2.5 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {products.length === 0 && !loading && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                                <p className="text-pink-300">Try adjusting your filters or create a new product</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/20">
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex gap-2">
                                    {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = idx + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = idx + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + idx;
                                        } else {
                                            pageNum = currentPage - 2 + idx;
                                        }
                                        return (
                                            <button key={idx} onClick={() => setCurrentPage(pageNum)} className={`w-10 h-10 rounded-xl font-semibold transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-[var(--pink)] to-[var(--pink)] text-white' : 'bg-white/10 text-pink-300 hover:bg-white/20'}`}>
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/20">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {
                showModal && (
                    <ProductForm
                        modalMode={modalMode}
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                        brands={brands}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                        setShowModal={setShowModal}
                        loading={loading}
                    />
                )
            }

            {
                showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
                        <div className="bg-gradient-to-br from-slate-900 to-pink-900 rounded-3xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={32} className="text-red-500" /></div>
                                <h3 className="text-2xl font-bold text-white mb-2">Delete Product?</h3>
                                <p className="text-pink-300 mb-6">This action cannot be undone.</p>
                                <div className="flex gap-4">
                                    <button onClick={() => { setShowDeleteConfirm(false); setDeleteProductId(null); }} className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">Cancel</button>
                                    <button onClick={executeDelete} disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-[var(--pink)] text-white rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all disabled:opacity-50">{loading ? 'Deleting...' : 'Delete'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ProductDashboard;
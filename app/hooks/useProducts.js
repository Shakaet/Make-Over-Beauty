import { useState, useCallback } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/app/api/productApi";

export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortOption, setSortOption] = useState("createdAt-desc");

    const productsPerPage = 8;

    const fetchAllProducts = useCallback(async () => {
        try {
            const params = { limit: 10000, search: searchTerm || undefined };
            const res = await getAllProducts(params);
            setAllProducts(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }, [searchTerm]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                limit: productsPerPage,
                search: searchTerm || undefined,
                category: selectedCategories[0] || undefined,
                minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
                maxPrice: priceRange[1] < 10000 ? priceRange[1] : undefined,
                sortBy: sortOption.split("-")[0],
                order: sortOption.split("-")[1],
            };
            const res = await getAllProducts(params);
            setProducts(res.data || []);
            setTotalPages(res.totalPages);
            setTotalProducts(res.totalProducts);
        } catch (err) {
            setError("Failed to load products");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, selectedCategories, priceRange, sortOption]);



    const handleCreate = async (payload, images) => {
        setLoading(true);
        setError(null);
        try {
            await createProduct(payload, images);
            await fetchProducts(); // Refresh the product list
            return { success: true };
        } catch (err) {
            setError("Failed to create product");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, payload, images) => {
        setLoading(true);
        setError(null);
        try {
            await updateProduct(id, payload, images);
            await fetchProducts(); // Refresh the product list
            return { success: true };
        } catch (err) {
            setError("Failed to update product");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProduct(id);
            await fetchProducts(); // Refresh the product list
            return { success: true };
        } catch (err) {
            setError("Failed to delete product");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return {
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
        setSearchTerm: (v) => { setSearchTerm(v); setCurrentPage(1); },
        setSelectedCategories: (v) => { setSelectedCategories(v); setCurrentPage(1); },
        setPriceRange: (v) => { setPriceRange(v); setCurrentPage(1); },
        setSortOption: (v) => { setSortOption(v); setCurrentPage(1); },
        setCurrentPage,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
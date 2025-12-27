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
        const res = await getAllProducts({
            limit: 10000,
            search: searchTerm || undefined,
            minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
            maxPrice: priceRange[1] < 10000 ? priceRange[1] : undefined,
        });
        setAllProducts(res.data || []);
    }, [searchTerm, priceRange]);


    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                limit: productsPerPage,
                search: searchTerm || undefined,
                categoryIds: selectedCategories.length
                    ? selectedCategories.join(",")
                    : undefined,
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


    const handleCreate = async (productData, images) => {
        try {
            setLoading(true);
            const response = await createProduct(productData, images);
            console.log("Create response:", response); // Log the response
            if (response.success) {
                fetchProducts();
                fetchAllProducts();
                return { success: true, message: response.message };
            }
            return { success: false, message: response.message };
        } catch (error) {
            console.error('Error creating product:', error);
            return { success: false, message: error.message };
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
import { useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryApi.getAllCategory()
            setCategories(data || []);
        } catch (err) {
            console.error("Category fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading };
};

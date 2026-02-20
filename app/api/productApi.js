// productApi.js (updated)
import api from "@/app/libs/axios";

/**
 * Get all products with optional filters
 */
export const getAllProducts = async (params = {}) => {
  try {
    const res = await api.get(
      "https://bloomingbeauty.vercel.app/api/products/all-products",
      { params },
    );
    return res.data || { data: [], totalProducts: 0, totalPages: 1, page: 1 };
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await api.get(
      `https://bloomingbeauty.vercel.app/api/products/product/${id}`,
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    throw err;
  }
};

/**
 * Create new product
 */
export const createProduct = async (productData, images) => {
  try {
    const formData = new FormData();

    // Append JSON data
    formData.append("data", JSON.stringify(productData));

    // Append images
    if (images.imagePrimary)
      formData.append("imagePrimary", images.imagePrimary);
    if (images.imageSecondary)
      formData.append("imageSecondary", images.imageSecondary);
    if (images.imageThird) formData.append("imageThird", images.imageThird);
    if (images.imageFourth) formData.append("imageFourth", images.imageFourth);

    const res = await api.post(
      "https://bloomingbeauty.vercel.app/api/products/create-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (err) {
    console.error("Failed to create product:", err);
    throw err;
  }
};

/**
 * Update existing product
 */
export const updateProduct = async (id, productData, images = {}) => {
  try {
    const formData = new FormData();

    // Append JSON data
    formData.append("data", JSON.stringify(productData));

    // Append images only if provided
    if (images.imagePrimary)
      formData.append("imagePrimary", images.imagePrimary);
    if (images.imageSecondary)
      formData.append("imageSecondary", images.imageSecondary);
    if (images.imageThird) formData.append("imageThird", images.imageThird);
    if (images.imageFourth) formData.append("imageFourth", images.imageFourth);

    const res = await api.patch(
      `https://bloomingbeauty.vercel.app/api/products/update-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (err) {
    console.error("Failed to update product:", err);
    throw err;
  }
};

/**
 * Delete product by ID
 */
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(
      `https://bloomingbeauty.vercel.app/api/products/delete-product/${id}`,
    );
    return res.data;
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw err;
  }
};

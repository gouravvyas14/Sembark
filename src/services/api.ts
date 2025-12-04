import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Fetch all categories for the filter dropdown
export const getCategories = async () => {
  const res = await axios.get<string[]>(`${API_URL}/products/categories`);
  return res.data;
};

// Fetch specific product by ID 
export const getProductById = async (id: string) => {
  const res = await axios.get<Product>(`${API_URL}/products/${id}`);
  return res.data;
};

// Logic to fetch products based on filters
// strict adherence to "Refetch data using APIs... Don't filter locally"
export const getProducts = async (selectedCategories: string[], sortOrder: string) => {
  let products: Product[] = [];

  if (selectedCategories.length > 0) {
    // If categories are selected, we fetch ONLY those categories from the API
    const promises = selectedCategories.map((cat) =>
      axios.get<Product[]>(`${API_URL}/products/category/${cat}?sort=${sortOrder}`)
    );
    const results = await Promise.all(promises);
    products = results.flatMap((r) => r.data);
  } else {
    // Otherwise fetch all
    const res = await axios.get<Product[]>(`${API_URL}/products?sort=${sortOrder}`);
    products = res.data;
  }

  return products;
};
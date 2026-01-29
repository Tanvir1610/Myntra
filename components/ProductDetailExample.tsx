/**
 * EXAMPLE: How to integrate Recently Viewed tracking
 * 
 * This example shows how to add a product to the recently viewed list
 * when the user views a product detail page.
 * 
 * Usage in your product detail screen:
 */

import React, { useEffect } from 'react';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

// Example of a Product Detail Screen
export const ProductDetailExample = ({ productId }: { productId: string }) => {
  const { addProduct } = useRecentlyViewed();

  // Example product data (would normally come from API)
  const productData = {
    _id: productId,
    name: 'Premium Cotton T-Shirt',
    price: 599,
    image: 'https://example.com/image.jpg',
    rating: 4.5,
    discount: 20,
  };

  // Track product view when component mounts
  useEffect(() => {
    const trackProductView = async () => {
      await addProduct({
        _id: productData._id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        rating: productData.rating,
        discount: productData.discount,
      });
    };

    trackProductView();
  }, [productId, addProduct]);

  return (
    // Your product detail UI here
    null
  );
};

/**
 * INTEGRATION GUIDE:
 * 
 * 1. In your product detail/product page component, import the hook:
 *    import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
 * 
 * 2. Call the hook:
 *    const { addProduct } = useRecentlyViewed();
 * 
 * 3. When the product details are loaded, track the view:
 *    useEffect(() => {
 *      if (product) {
 *        addProduct({
 *          _id: product._id,
 *          name: product.name,
 *          price: product.price,
 *          image: product.image,
 *          rating: product.rating,
 *          discount: product.discount,
 *        });
 *      }
 *    }, [product._id, addProduct]);
 * 
 * That's it! The product will automatically be:
 * - Added to the recently viewed list
 * - Displayed in the carousel on the home screen
 * - Kept in order by most recent view
 * - Duplicates will be prevented
 * - Persisted locally for offline access
 */

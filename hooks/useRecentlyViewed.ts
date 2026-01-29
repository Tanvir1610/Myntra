import { useState, useEffect, useCallback } from 'react';
import {
  addToRecentlyViewed,
  getRecentlyViewed,
  clearRecentlyViewed,
  removeFromRecentlyViewed,
  RecentlyViewedProduct,
} from '../utils/recentlyViewed';

export const useRecentlyViewed = (limit?: number) => {
  const [items, setItems] = useState<RecentlyViewedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load recently viewed items on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        const data = await getRecentlyViewed(limit);
        setItems(data);
      } catch (error) {
        console.error('[v0] Error loading recently viewed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [limit]);

  // Add product to recently viewed
  const addProduct = useCallback(
    async (product: Omit<RecentlyViewedProduct, 'viewedAt'>) => {
      try {
        await addToRecentlyViewed(product);
        const data = await getRecentlyViewed(limit);
        setItems(data);
      } catch (error) {
        console.error('[v0] Error adding product:', error);
      }
    },
    [limit]
  );

  // Remove product from recently viewed
  const removeProduct = useCallback(async (productId: string) => {
    try {
      await removeFromRecentlyViewed(productId);
      setItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error('[v0] Error removing product:', error);
    }
  }, []);

  // Clear all recently viewed items
  const clear = useCallback(async () => {
    try {
      await clearRecentlyViewed();
      setItems([]);
    } catch (error) {
      console.error('[v0] Error clearing recently viewed:', error);
    }
  }, []);

  return {
    items,
    isLoading,
    addProduct,
    removeProduct,
    clear,
  };
};

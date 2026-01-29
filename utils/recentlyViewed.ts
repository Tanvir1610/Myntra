import { AsyncStorage } from 'react-native';

export interface RecentlyViewedProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  discount?: number;
  viewedAt: number;
}

const RECENTLY_VIEWED_KEY = 'recentlyViewedProducts';
const MAX_ITEMS = 20;

/**
 * Add a product to the recently viewed list
 * Prevents duplicates and maintains chronological order
 */
export const addToRecentlyViewed = async (
  product: Omit<RecentlyViewedProduct, 'viewedAt'>
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    let items: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];

    // Remove duplicate if it exists
    items = items.filter((item) => item._id !== product._id);

    // Add new item at the beginning with current timestamp
    const newItem: RecentlyViewedProduct = {
      ...product,
      viewedAt: Date.now(),
    };
    items.unshift(newItem);

    // Keep only the most recent MAX_ITEMS
    items = items.slice(0, MAX_ITEMS);

    await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('[v0] Error adding to recently viewed:', error);
  }
};

/**
 * Get all recently viewed products
 * Returns items sorted by most recently viewed first
 */
export const getRecentlyViewed = async (
  limit?: number
): Promise<RecentlyViewedProduct[]> => {
  try {
    const stored = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    const items: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];
    return limit ? items.slice(0, limit) : items;
  } catch (error) {
    console.error('[v0] Error getting recently viewed:', error);
    return [];
  }
};

/**
 * Clear all recently viewed products
 */
export const clearRecentlyViewed = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RECENTLY_VIEWED_KEY);
  } catch (error) {
    console.error('[v0] Error clearing recently viewed:', error);
  }
};

/**
 * Remove a specific product from recently viewed
 */
export const removeFromRecentlyViewed = async (productId: string): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
    let items: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];

    items = items.filter((item) => item._id !== productId);

    await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('[v0] Error removing from recently viewed:', error);
  }
};

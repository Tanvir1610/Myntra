# Recently Viewed Products Feature

## Overview

The Recently Viewed feature tracks products that users have viewed and displays them in a horizontal carousel on the home screen. This provides a personalized experience and encourages engagement with previously explored items.

## Features

✅ **Local Storage Persistence** - Data stored locally using AsyncStorage for quick access and offline functionality
✅ **No Duplicates** - Automatically removes duplicate entries when a product is viewed again
✅ **Chronological Order** - Most recently viewed items appear first in the carousel
✅ **Limited History** - Keeps track of up to 20 products to optimize performance
✅ **Responsive Carousel** - Horizontal scrolling component with product details

## Architecture

### Files Created

1. **`/utils/recentlyViewed.ts`**
   - Core utility functions for managing recently viewed data
   - `addToRecentlyViewed()` - Add or update a product view
   - `getRecentlyViewed()` - Retrieve recently viewed products
   - `removeFromRecentlyViewed()` - Remove a specific product
   - `clearRecentlyViewed()` - Clear all recently viewed data

2. **`/hooks/useRecentlyViewed.ts`**
   - React hook for managing recently viewed state
   - Handles loading, adding, removing, and clearing products
   - Returns `items`, `isLoading`, `addProduct()`, `removeProduct()`, `clear()`

3. **`/components/RecentlyViewedCarousel.tsx`**
   - Horizontal carousel component displaying recently viewed items
   - Shows product image, name, price, rating, and discount
   - Responsive design optimized for mobile

4. **`/app/index.tsx`** (Updated)
   - Integrated RecentlyViewedCarousel on the home screen
   - Demonstrates basic usage

## Data Structure

```typescript
interface RecentlyViewedProduct {
  _id: string;              // Product ID
  name: string;             // Product name
  image: string;            // Product image URL
  price: number;            // Product price
  rating?: number;          // Optional rating
  discount?: number;        // Optional discount percentage
  viewedAt: number;         // Timestamp of view
}
```

## Usage Guide

### Basic Setup

The Recently Viewed feature is already integrated on the home screen. To use it in other screens:

### In Your Product Detail Screen

```typescript
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useEffect } from 'react';

export default function ProductDetail({ productId }) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    const trackView = async () => {
      const product = await fetchProductDetails(productId);
      
      await addProduct({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        discount: product.discount,
      });
    };

    trackView();
  }, [productId, addProduct]);

  // Rest of your component...
}
```

### Using the Hook

```typescript
const {
  items,              // Array of recently viewed products
  isLoading,          // Loading state
  addProduct,         // Function to add a product
  removeProduct,      // Function to remove a product
  clear               // Function to clear all
} = useRecentlyViewed(limit);  // limit is optional, defaults to all
```

### Hook Parameters

- **`limit`** (optional): Number of items to retrieve. Default is all items.

```typescript
// Get last 10 recently viewed items
const { items } = useRecentlyViewed(10);
```

### Examples

#### Add a Product to Recently Viewed

```typescript
await addProduct({
  _id: '123',
  name: 'Product Name',
  price: 599,
  image: 'https://example.com/image.jpg',
  rating: 4.5,
  discount: 20,
});
```

#### Remove a Product

```typescript
await removeProduct('productId123');
```

#### Clear All Recently Viewed

```typescript
await clear();
```

## Component Integration

The `RecentlyViewedCarousel` component handles rendering:

```typescript
<RecentlyViewedCarousel
  items={items}
  isLoading={isLoading}
  onProductPress={(product) => {
    // Navigate to product detail
    navigation.navigate('ProductDetail', { id: product._id });
  }}
/>
```

### Props

- **`items`**: Array of `RecentlyViewedProduct` objects
- **`isLoading`**: Boolean indicating loading state
- **`onProductPress`**: Callback function when a product is tapped

## Storage Persistence

Recently viewed data is stored locally using AsyncStorage with the key `'recentlyViewedProducts'`. This ensures:

- ✅ Data persists across app sessions
- ✅ Offline access without network requests
- ✅ Quick loading without API calls
- ✅ Automatic cleanup (only 20 items kept)

## Performance Considerations

1. **Limit Requests** - Use the `limit` parameter when you don't need all items
2. **Async Operations** - All functions are async to prevent UI blocking
3. **Scroll Performance** - Carousel uses `scrollEventThrottle` for smooth scrolling
4. **Memory Optimization** - Only keeps 20 most recent items

## Customization

### Change Maximum Items Tracked

Edit `/utils/recentlyViewed.ts`:
```typescript
const MAX_ITEMS = 20;  // Change this value
```

### Style the Carousel

Modify styles in `/components/RecentlyViewedCarousel.tsx`:
```typescript
const styles = StyleSheet.create({
  // Customize colors, sizes, spacing, etc.
});
```

### Change Carousel Card Width

```typescript
productCard: {
  width: 140,  // Adjust this
  // ...
}
```

## Debugging

Enable debug logs to track recently viewed operations:

```typescript
// Logs are prefixed with [v0] for easy filtering
console.log('[v0] Recently viewed items:', items);
```

## Best Practices

1. **Track After Loading** - Add products to recently viewed only after full details load
2. **Handle Errors** - Wrap async operations in try-catch blocks
3. **Limit Per-Screen** - Use the `limit` parameter to show only relevant items
4. **Clear on Logout** - Call `clear()` when user logs out if needed
5. **Update Product Info** - If product details change, updating the view will use latest data

## Troubleshooting

### Items Not Persisting
- Ensure AsyncStorage is properly installed: `npm install @react-native-async-storage/async-storage`
- Check that no errors appear in console when calling `addProduct()`

### Carousel Not Showing
- Verify `items.length > 0` - carousel is hidden if no items exist
- Check that `onProductPress` callback is properly defined

### Performance Issues
- Use the `limit` parameter to reduce data loaded
- Ensure product images are optimized and not too large
- Clear old items periodically if not using `MAX_ITEMS` limit

## Future Enhancements

Potential improvements:
- Analytics tracking for user behavior
- Personalized recommendations based on view history
- Export recently viewed data for backup
- Share recently viewed items with friends
- Time-based filtering (viewed today, this week, etc.)

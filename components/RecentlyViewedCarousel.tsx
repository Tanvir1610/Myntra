import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { RecentlyViewedProduct } from '../utils/recentlyViewed';

interface RecentlyViewedCarouselProps {
  items: RecentlyViewedProduct[];
  isLoading: boolean;
  onProductPress: (product: RecentlyViewedProduct) => void;
}

export const RecentlyViewedCarousel: React.FC<RecentlyViewedCarouselProps> = ({
  items,
  isLoading,
  onProductPress,
}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recently Viewed</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff3366" />
        </View>
      </View>
    );
  }

  if (items.length === 0) {
    return null; // Don't show section if no items
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Viewed</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {items.map((product) => (
          <TouchableOpacity
            key={product._id}
            style={styles.productCard}
            onPress={() => onProductPress(product)}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
              )}
            </View>

            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{product.price}</Text>
              </View>

              {product.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  scrollView: {
    paddingHorizontal: 8,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    width: 140,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3366',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
    height: 28,
  },
  priceContainer: {
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  ratingContainer: {
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
    color: '#666',
  },
});

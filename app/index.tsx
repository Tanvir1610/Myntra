import { Text, View, ScrollView } from "react-native";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { RecentlyViewedCarousel } from "../components/RecentlyViewedCarousel";
import { RecentlyViewedProduct } from "../utils/recentlyViewed";

export default function Index() {
  const { items, isLoading } = useRecentlyViewed(10);

  const handleProductPress = (product: RecentlyViewedProduct) => {
    // Navigate to product detail page
    console.log('[v0] Product pressed:', product.name);
    // You can add navigation logic here
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Welcome to Myntra
        </Text>

        {/* Recently Viewed Section */}
        <RecentlyViewedCarousel
          items={items}
          isLoading={isLoading}
          onProductPress={handleProductPress}
        />

        {/* Other home content can go here */}
        <Text style={{ fontSize: 16, color: "#666", marginTop: 20 }}>
          Browse and shop your favorite products
        </Text>
      </View>
    </ScrollView>
  );
}

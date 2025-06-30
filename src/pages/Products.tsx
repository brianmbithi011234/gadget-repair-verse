
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Watch,
  ShoppingCart,
  Star,
  Zap,
  Gamepad2,
  Speaker,
  Tablet,
  Monitor
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart as ShoppingCartComponent } from "@/components/ShoppingCart";
import CheckoutForm from "@/components/CheckoutForm";
import Receipt from "@/components/Receipt";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    getCartItemsCount 
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Products", icon: ShoppingCart },
    { id: "smartphones", name: "Smartphones", icon: Smartphone },
    { id: "laptops", name: "Laptops", icon: Laptop },
    { id: "headphones", name: "Headphones", icon: Headphones },
    { id: "cameras", name: "Cameras", icon: Camera },
    { id: "watches", name: "Smart Watches", icon: Watch },
    { id: "gaming", name: "Gaming", icon: Gamepad2 },
    { id: "audio", name: "Audio", icon: Speaker },
    { id: "tablets", name: "Tablets", icon: Tablet },
    { id: "monitors", name: "Monitors", icon: Monitor }
  ];

  const products = [
    // Smartphones
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "smartphones",
      price: 149850,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 245,
      inStock: true,
      specs: ["128GB Storage", "Pro Camera System", "Titanium Design"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      category: "smartphones",
      price: 119850,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 456,
      inStock: true,
      specs: ["256GB Storage", "AI Camera", "120Hz Display"]
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      category: "smartphones",
      price: 99850,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 189,
      inStock: true,
      specs: ["Pure Android", "Magic Eraser", "Night Sight"]
    },
    {
      id: 4,
      name: "OnePlus 12",
      category: "smartphones",
      price: 89850,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      specs: ["Fast Charging", "Snapdragon 8 Gen 3", "Hasselblad Camera"]
    },

    // Laptops
    {
      id: 5,
      name: "MacBook Pro M3",
      category: "laptops",
      price: 299850,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 189,
      inStock: true,
      specs: ["M3 Chip", "16GB RAM", "512GB SSD"]
    },
    {
      id: 6,
      name: "Dell XPS 13",
      category: "laptops",
      price: 179850,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 298,
      inStock: true,
      specs: ["Intel i7", "16GB RAM", "InfinityEdge Display"]
    },
    {
      id: 7,
      name: "HP Spectre x360",
      category: "laptops",
      price: 159850,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 167,
      inStock: true,
      specs: ["2-in-1 Design", "OLED Display", "Bang & Olufsen Audio"]
    },
    {
      id: 8,
      name: "Lenovo ThinkPad X1",
      category: "laptops",
      price: 189850,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      specs: ["Business Grade", "Military Tested", "Long Battery Life"]
    },

    // Headphones & Audio
    {
      id: 9,
      name: "Sony WH-1000XM5",
      category: "headphones",
      price: 59850,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 567,
      inStock: true,
      specs: ["Noise Cancelling", "30h Battery", "Quick Charge"]
    },
    {
      id: 10,
      name: "AirPods Pro 2",
      category: "headphones",
      price: 39850,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 890,
      inStock: true,
      specs: ["Active Noise Cancellation", "Spatial Audio", "H2 Chip"]
    },
    {
      id: 11,
      name: "Bose QuietComfort 45",
      category: "headphones",
      price: 49850,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 423,
      inStock: true,
      specs: ["World-Class Noise Cancelling", "24h Battery", "TriPort Technology"]
    },
    {
      id: 12,
      name: "Marshall Acton III",
      category: "audio",
      price: 29850,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      specs: ["Bluetooth 5.2", "Classic Design", "Room-Filling Sound"]
    },

    // Cameras
    {
      id: 13,
      name: "Canon EOS R6",
      category: "cameras",
      price: 374850,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 123,
      inStock: false,
      specs: ["20MP Full Frame", "4K Video", "Image Stabilization"]
    },
    {
      id: 14,
      name: "Sony Alpha A7 IV",
      category: "cameras",
      price: 449850,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      specs: ["33MP Full Frame", "Real-time Tracking", "10fps Burst"]
    },
    {
      id: 15,
      name: "Fujifilm X-T5",
      category: "cameras",
      price: 299850,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 134,
      inStock: true,
      specs: ["40MP APS-C", "Film Simulations", "Weather Sealed"]
    },

    // Smart Watches
    {
      id: 16,
      name: "Apple Watch Series 9",
      category: "watches",
      price: 64350,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 334,
      inStock: true,
      specs: ["GPS + Cellular", "Always-On Display", "Health Monitoring"]
    },
    {
      id: 17,
      name: "Samsung Galaxy Watch 6",
      category: "watches",
      price: 54350,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 267,
      inStock: true,
      specs: ["Sleep Tracking", "Body Composition", "Wear OS"]
    },
    {
      id: 18,
      name: "Garmin Fenix 7",
      category: "watches",
      price: 89850,
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 198,
      inStock: true,
      specs: ["Multi-Sport GPS", "Solar Charging", "Rugged Design"]
    },

    // Gaming
    {
      id: 19,
      name: "PlayStation 5",
      category: "gaming",
      price: 79850,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 445,
      inStock: true,
      specs: ["4K Gaming", "Ray Tracing", "Ultra-High Speed SSD"]
    },
    {
      id: 20,
      name: "Xbox Series X",
      category: "gaming",
      price: 74850,
      image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 389,
      inStock: true,
      specs: ["12 Teraflops", "Quick Resume", "Smart Delivery"]
    },
    {
      id: 21,
      name: "Nintendo Switch OLED",
      category: "gaming",
      price: 49850,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 567,
      inStock: true,
      specs: ["7-inch OLED Screen", "Portable Gaming", "Enhanced Audio"]
    },

    // Tablets
    {
      id: 22,
      name: "iPad Pro 12.9",
      category: "tablets",
      price: 169850,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 234,
      inStock: true,
      specs: ["M2 Chip", "Liquid Retina Display", "Apple Pencil Support"]
    },
    {
      id: 23,
      name: "Samsung Galaxy Tab S9",
      category: "tablets",
      price: 119850,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 167,
      inStock: true,
      specs: ["AMOLED Display", "S Pen Included", "DeX Mode"]
    },

    // Monitors
    {
      id: 24,
      name: "LG UltraWide 34WP65C",
      category: "monitors",
      price: 89850,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 298,
      inStock: true,
      specs: ["34-inch Curved", "QHD Resolution", "USB-C Hub"]
    },
    {
      id: 25,
      name: "Dell S3422DWG",
      category: "monitors",
      price: 69850,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 189,
      inStock: true,
      specs: ["144Hz Gaming", "1ms Response", "AMD FreeSync"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (receipt: any) => {
    setCurrentReceipt(receipt);
    setIsReceiptOpen(true);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Betmo Enterprises</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="text-blue-600 font-medium">Products</Link>
              <Link to="/repairs" className="text-gray-600 hover:text-blue-600 transition-colors">Repairs</Link>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({getCartItemsCount()})
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
            <p className="text-xl text-gray-600">Discover the latest electronics and gadgets - Over 25 products available!</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover-scale">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <span className="text-xl font-bold text-blue-600">KSH {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {product.specs.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Shopping Cart, Checkout, and Receipt Components */}
      <ShoppingCartComponent 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
      />
      
      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onOrderComplete={handleOrderComplete}
      />
      
      <Receipt 
        receipt={currentReceipt} 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
};

export default Products;

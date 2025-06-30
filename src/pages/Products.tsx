
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
  Zap
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
    { id: "watches", name: "Smart Watches", icon: Watch }
  ];

  const products = [
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      name: "Samsung Galaxy S24",
      category: "smartphones",
      price: 119850,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 456,
      inStock: true,
      specs: ["256GB Storage", "AI Camera", "120Hz Display"]
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
            <p className="text-xl text-gray-600">Discover the latest electronics and gadgets</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="text-2xl font-bold text-blue-600">KSH {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {product.specs.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
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

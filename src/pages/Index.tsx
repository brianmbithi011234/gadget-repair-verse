
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Watch,
  Wrench,
  MessageCircle,
  ShoppingCart,
  Star,
  Phone,
  Mail,
  MapPin,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [repairForm, setRepairForm] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    issue: "",
    message: ""
  });

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
      price: 999,
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
      price: 1999,
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
      price: 399,
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
      price: 2499,
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
      price: 429,
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
      price: 799,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 456,
      inStock: true,
      specs: ["256GB Storage", "AI Camera", "120Hz Display"]
    }
  ];

  const repairServices = [
    { id: 1, name: "Screen Repair", icon: Smartphone, price: "From $79" },
    { id: 2, name: "Battery Replacement", icon: Zap, price: "From $49" },
    { id: 3, name: "Water Damage", icon: Shield, price: "From $99" },
    { id: 4, name: "Software Issues", icon: Wrench, price: "From $39" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRepairSubmit = () => {
    if (!repairForm.name || !repairForm.email || !repairForm.device || !repairForm.issue) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Repair Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your appointment."
    });
    
    setRepairForm({
      name: "",
      email: "",
      phone: "",
      device: "",
      issue: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TechHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-600 hover:text-blue-600 transition-colors">Products</a>
              <a href="#repairs" className="text-gray-600 hover:text-blue-600 transition-colors">Repairs</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Ultimate Electronics Destination
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
              Discover the latest tech products and professional repair services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Wrench className="h-5 w-5 mr-2" />
                Book Repair
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">All products come with warranty and our repair services are guaranteed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">Quick repairs and same-day service available for most devices</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Get help from our certified technicians and support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
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
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
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
                    onClick={() => toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` })}
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

      {/* Repair Services Section */}
      <section id="repairs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Repair Services</h2>
            <p className="text-xl text-gray-600">Professional repair services for all your devices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {repairServices.map((service) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow hover-scale">
                <CardHeader>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">{service.price}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Repair Booking Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Book a Repair Session</CardTitle>
              <CardDescription className="text-center">
                Fill out the form below and we'll contact you to schedule your repair appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name *</label>
                  <Input
                    value={repairForm.name}
                    onChange={(e) => setRepairForm({...repairForm, name: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    type="email"
                    value={repairForm.email}
                    onChange={(e) => setRepairForm({...repairForm, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input
                    value={repairForm.phone}
                    onChange={(e) => setRepairForm({...repairForm, phone: e.target.value})}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Device Type *</label>
                  <Input
                    value={repairForm.device}
                    onChange={(e) => setRepairForm({...repairForm, device: e.target.value})}
                    placeholder="e.g., iPhone 13, MacBook Pro"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Issue Description *</label>
                <Input
                  value={repairForm.issue}
                  onChange={(e) => setRepairForm({...repairForm, issue: e.target.value})}
                  placeholder="Brief description of the problem"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Additional Message</label>
                <Textarea
                  value={repairForm.message}
                  onChange={(e) => setRepairForm({...repairForm, message: e.target.value})}
                  placeholder="Any additional details about your device or preferred appointment time"
                  rows={3}
                />
              </div>
              <Button onClick={handleRepairSubmit} className="w-full" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Submit Repair Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Phone</CardTitle>
                <CardDescription>+1 (555) 123-4567</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Email</CardTitle>
                <CardDescription>support@techhub.com</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Location</CardTitle>
                <CardDescription>123 Tech Street, Digital City</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">TechHub</span>
              </div>
              <p className="text-gray-400">Your trusted electronics store and repair service provider.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Smartphones</li>
                <li>Laptops</li>
                <li>Accessories</li>
                <li>Cameras</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Device Repair</li>
                <li>Screen Replacement</li>
                <li>Battery Service</li>
                <li>Data Recovery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Warranty</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

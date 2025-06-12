
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Smartphone, 
  Zap,
  Shield,
  Wrench,
  MessageCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Repairs = () => {
  const [repairForm, setRepairForm] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    issue: "",
    message: ""
  });

  const repairServices = [
    { id: 1, name: "Screen Repair", icon: Smartphone, price: "From KSH 11,850" },
    { id: 2, name: "Battery Replacement", icon: Zap, price: "From KSH 7,350" },
    { id: 3, name: "Water Damage", icon: Shield, price: "From KSH 14,850" },
    { id: 4, name: "Software Issues", icon: Wrench, price: "From KSH 5,850" }
  ];

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
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Betmo Enterprises</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/repairs" className="text-blue-600 font-medium">Repairs</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Repair Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Repair Services</h1>
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
    </div>
  );
};

export default Repairs;

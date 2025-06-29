
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Building2 } from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  onPaymentDetailsChange: (details: any) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onMethodChange, onPaymentDetailsChange }: PaymentMethodSelectorProps) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    routingNumber: ""
  });

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "wallet", name: "Digital Wallet", icon: Smartphone },
    { id: "bank", name: "Bank Transfer", icon: Building2 }
  ];

  const handleCardDetailsChange = (field: string, value: string) => {
    const newDetails = { ...cardDetails, [field]: value };
    setCardDetails(newDetails);
    onPaymentDetailsChange({ method: "card", details: newDetails });
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    const newDetails = { ...bankDetails, [field]: value };
    setBankDetails(newDetails);
    onPaymentDetailsChange({ method: "bank", details: newDetails });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id} 
            className={`cursor-pointer transition-all ${selectedMethod === method.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            onClick={() => onMethodChange(method.id)}
          >
            <CardContent className="flex flex-col items-center p-4">
              <method.icon className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">{method.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={cardDetails.cardholderName}
                onChange={(e) => handleCardDetailsChange("cardholderName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardDetails.cardNumber}
                onChange={(e) => handleCardDetailsChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardDetailsChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardDetailsChange("cvv", e.target.value)}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "wallet" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Digital Wallet</CardTitle>
            <CardDescription>Choose your preferred digital wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16" onClick={() => onPaymentDetailsChange({ method: "wallet", provider: "paypal" })}>
                PayPal
              </Button>
              <Button variant="outline" className="h-16" onClick={() => onPaymentDetailsChange({ method: "wallet", provider: "applepay" })}>
                Apple Pay
              </Button>
              <Button variant="outline" className="h-16" onClick={() => onPaymentDetailsChange({ method: "wallet", provider: "googlepay" })}>
                Google Pay
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "bank" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bank Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankDetails.bankName}
                onChange={(e) => handleBankDetailsChange("bankName", e.target.value)}
                placeholder="Your Bank Name"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={bankDetails.accountNumber}
                onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
                placeholder="123456789"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={bankDetails.routingNumber}
                onChange={(e) => handleBankDetailsChange("routingNumber", e.target.value)}
                placeholder="987654321"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentMethodSelector;

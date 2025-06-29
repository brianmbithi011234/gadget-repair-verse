
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, Download } from "lucide-react";

interface ReceiptProps {
  orderData: {
    id: string;
    customer: any;
    items: any[];
    paymentMethod: string;
    paymentDetails: any;
    subtotal: number;
    tax: number;
    total: number;
    date: string;
    status: string;
  };
}

const Receipt = ({ orderData }: ReceiptProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = document.getElementById('receipt-content');
    if (receiptContent) {
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow?.document.write('<html><head><title>Receipt</title>');
      printWindow?.document.write('<style>body{font-family:Arial,sans-serif;margin:20px;}</style>');
      printWindow?.document.write('</head><body>');
      printWindow?.document.write(receiptContent.innerHTML);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const getPaymentMethodDisplay = () => {
    switch (orderData.paymentMethod) {
      case "card":
        return `Credit/Debit Card ending in ****${orderData.paymentDetails?.details?.cardNumber?.slice(-4) || "****"}`;
      case "wallet":
        return `${orderData.paymentDetails?.provider || "Digital Wallet"}`;
      case "bank":
        return `Bank Transfer - ${orderData.paymentDetails?.details?.bankName || "Bank"}`;
      default:
        return "Payment Method";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-end gap-2 mb-4 print:hidden">
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button onClick={handleDownload} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <Card id="receipt-content">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Betmo Enterprises</CardTitle>
          <p className="text-sm text-gray-600">Purchase Receipt</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Order ID:</strong> {orderData.id}
            </div>
            <div>
              <strong>Date:</strong> {new Date(orderData.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Status:</strong> {orderData.status.toUpperCase()}
            </div>
            <div>
              <strong>Payment Method:</strong> {getPaymentMethodDisplay()}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {orderData.customer.name}</p>
              <p><strong>Email:</strong> {orderData.customer.email}</p>
              {orderData.customer.phone && <p><strong>Phone:</strong> {orderData.customer.phone}</p>}
              {orderData.customer.address && <p><strong>Address:</strong> {orderData.customer.address}, {orderData.customer.city}</p>}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Items Purchased</h3>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <span>KSH {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>KSH {orderData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (16%):</span>
              <span>KSH {orderData.tax.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>KSH {orderData.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p>Thank you for your purchase!</p>
            <p>For support, contact us at support@betmoenterprises.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Receipt;

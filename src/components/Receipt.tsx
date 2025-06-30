
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Printer, Download } from "lucide-react";

interface ReceiptProps {
  receipt: {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const Receipt = ({ receipt, isOpen, onClose }: ReceiptProps) => {
  if (!receipt) return null;

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
    switch (receipt.paymentMethod) {
      case "card":
        return `Credit/Debit Card ending in ****${receipt.paymentDetails?.details?.cardNumber?.slice(-4) || "****"}`;
      case "wallet":
        return `${receipt.paymentDetails?.provider || "Digital Wallet"}`;
      case "bank":
        return `Bank Transfer - ${receipt.paymentDetails?.details?.bankName || "Bank"}`;
      default:
        return "Payment Method";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>
        
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
                  <strong>Order ID:</strong> {receipt.id}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Status:</strong> {receipt.status.toUpperCase()}
                </div>
                <div>
                  <strong>Payment Method:</strong> {getPaymentMethodDisplay()}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {receipt.customer.name}</p>
                  <p><strong>Email:</strong> {receipt.customer.email}</p>
                  {receipt.customer.phone && <p><strong>Phone:</strong> {receipt.customer.phone}</p>}
                  {receipt.customer.address && <p><strong>Address:</strong> {receipt.customer.address}, {receipt.customer.city}</p>}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Items Purchased</h3>
                <div className="space-y-2">
                  {receipt.items.map((item, index) => (
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
                  <span>KSH {receipt.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (16%):</span>
                  <span>KSH {receipt.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>KSH {receipt.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mt-6">
                <p>Thank you for your purchase!</p>
                <p>For support, contact us at support@betmoenterprises.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Receipt;

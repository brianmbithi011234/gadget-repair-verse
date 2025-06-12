
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Receipt as ReceiptType } from "@/hooks/useCart";
import { Download, Print, X } from "lucide-react";

interface ReceiptProps {
  receipt: ReceiptType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Receipt = ({ receipt, isOpen, onClose }: ReceiptProps) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = document.getElementById('receipt-content');
    if (receiptContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt - ${receipt.id}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .details { margin: 20px 0; }
                .items { margin: 20px 0; }
                .total { font-weight: bold; border-top: 2px solid #000; padding-top: 10px; }
              </style>
            </head>
            <body>
              ${receiptContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Receipt</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Card>
          <CardContent className="p-6" id="receipt-content">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Betmo Enterprises</h2>
              <p className="text-sm text-muted-foreground">Electronics & Repair Services</p>
              <p className="text-sm text-muted-foreground">123 Tech Street, Nairobi, Kenya</p>
              <p className="text-sm text-muted-foreground">+254 712 345 678</p>
            </div>

            <div className="border-t border-b py-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Receipt ID:</strong> {receipt.id}</p>
                  <p><strong>Date:</strong> {receipt.date}</p>
                </div>
                <div>
                  <p><strong>Customer:</strong> {receipt.customerInfo.name}</p>
                  <p><strong>Email:</strong> {receipt.customerInfo.email}</p>
                  <p><strong>Phone:</strong> {receipt.customerInfo.phone}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Items Purchased:</h3>
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>KSH {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>KSH {receipt.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (16%):</span>
                <span>KSH {receipt.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>KSH {receipt.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              <p>Thank you for shopping with Betmo Enterprises!</p>
              <p>For support, contact us at support@betmoenterprises.com</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2 mt-4">
          <Button onClick={handlePrint} variant="outline" className="flex-1">
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

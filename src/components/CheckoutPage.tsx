import { useState } from 'react';
import { CreditCard, MapPin, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CheckoutPageProps {
  onPageChange: (page: string) => void;
}

export default function CheckoutPage({ onPageChange }: CheckoutPageProps) {
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const orderSummary = {
    subtotal: 47.87,
    delivery: 0,
    total: 47.87,
    items: 4,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main Street" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Delivery Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="flex-1">
                    <Label htmlFor="standard" className="font-medium">
                      Standard Delivery (Free)
                    </Label>
                    <p className="text-sm text-gray-600">
                      Delivery within 24-48 hours
                    </p>
                  </div>
                  <span className="font-medium">Free</span>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex-1">
                    <Label htmlFor="express" className="font-medium">
                      Express Delivery
                    </Label>
                    <p className="text-sm text-gray-600">
                      Delivery within 2-4 hours
                    </p>
                  </div>
                  <span className="font-medium">$4.99</span>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <div className="flex-1">
                    <Label htmlFor="scheduled" className="font-medium">
                      Scheduled Delivery
                    </Label>
                    <p className="text-sm text-gray-600">
                      Choose your preferred time slot
                    </p>
                  </div>
                  <span className="font-medium">$2.99</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="apple" id="apple" />
                  <Label htmlFor="apple">Apple Pay</Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Order Notes (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
                placeholder="Any special instructions for delivery..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Items ({orderSummary.items})</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    {orderSummary.delivery === 0 ? 'FREE' : `$${orderSummary.delivery.toFixed(2)}`}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms & Conditions
                </Label>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => onPageChange('orders')}
              >
                Place Order
              </Button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 pt-4">
                <Shield className="h-4 w-4" />
                <span>Secure checkout with 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
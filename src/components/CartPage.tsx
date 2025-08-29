import { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  onPageChange: (page: string) => void;
}

interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export default function CartPage({ onPageChange }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Organic Beetroot',
      subtitle: 'Fresh from local farm',
      price: 17.29,
      originalPrice: 19.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBvcmdhbmljfGVufDF8fHx8MTc1NjQyMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
    },
    {
      id: '2',
      name: 'Premium Avocado',
      subtitle: 'Imported from Italy',
      price: 12.29,
      originalPrice: 15.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
    },
    {
      id: '3',
      name: 'Fresh Milk',
      subtitle: 'Organic dairy',
      price: 18.29,
      originalPrice: 20.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1621458472871-d8b6a409aba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsa3xlbnwxfHx8fDE3NTY0MjgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - promoDiscount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started
          </p>
          <Button onClick={() => onPageChange('products')} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => onPageChange('products')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        <h1 className="text-2xl font-bold">Shopping Cart ({cartItems.length} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                        {!item.inStock && (
                          <Badge variant="destructive" className="mt-1">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">${item.price}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ${item.originalPrice}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={!item.inStock}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!item.inStock}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right mt-2">
                      <span className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Promo Code */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Promo Code</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button 
                  onClick={applyPromoCode}
                  disabled={!promoCode.trim()}
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-green-600">Code {appliedPromo} applied!</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedPromo(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
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
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-green-600">
                <span>Savings</span>
                <span>-${savings.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>

              {deliveryFee === 0 && (
                <p className="text-sm text-green-600">
                  🎉 Free delivery on orders over $50!
                </p>
              )}

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => onPageChange('checkout')}
              >
                Proceed to Checkout
              </Button>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onPageChange('products')}
              >
                Continue Shopping
              </Button>

              {/* Delivery Info */}
              <div className="text-sm text-gray-600 space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-medium">Tomorrow</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Window:</span>
                  <span className="font-medium">9 AM - 6 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
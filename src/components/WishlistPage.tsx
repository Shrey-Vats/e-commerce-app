import { useState } from 'react';
import { Heart, ShoppingCart, X, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishlistPageProps {
  onPageChange: (page: string, productId?: string) => void;
}

export default function WishlistPage({ onPageChange }: WishlistPageProps) {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Organic Beetroot',
      subtitle: 'Fresh from local farm',
      price: 17.29,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBvcmdhbmljfGVufDF8fHx8MTc1NjQyMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
      rating: 4.5,
      reviews: 124,
    },
    {
      id: '2',
      name: 'Premium Avocado',
      subtitle: 'Imported from Italy',
      price: 12.29,
      originalPrice: 15.99,
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
      rating: 4.8,
      reviews: 89,
    },
    {
      id: '3',
      name: 'Fresh Beef Mix',
      subtitle: 'Cut with bone',
      price: 16.29,
      originalPrice: 18.99,
      image: 'https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcHJvZHVjdHMlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjQ2NjYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: false,
      rating: 4.6,
      reviews: 73,
    },
    {
      id: '4',
      name: 'Fresh Milk',
      subtitle: 'Organic dairy',
      price: 18.29,
      originalPrice: 20.99,
      image: 'https://images.unsplash.com/photo-1621458472871-d8b6a409aba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsa3xlbnwxfHx8fDE3NTY0MjgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
      rating: 4.4,
      reviews: 156,
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // Add to cart logic here
    console.log('Added to cart:', id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love for later by adding them to your wishlist
          </p>
          <Button onClick={() => onPageChange('products')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items saved</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
          <Button onClick={() => onPageChange('products')}>
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative">
                {/* Product Image */}
                <div 
                  className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => onPageChange('product-detail', item.id)}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                {/* Remove from Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Out of Stock Overlay */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div 
                className="cursor-pointer"
                onClick={() => onPageChange('product-detail', item.id)}
              >
                <h3 className="font-medium mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{item.subtitle}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400 text-sm">
                    {'★'.repeat(Math.floor(item.rating))}
                    {'☆'.repeat(5 - Math.floor(item.rating))}
                  </div>
                  <span className="text-xs text-gray-600 ml-2">({item.reviews})</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold text-lg">${item.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${item.originalPrice}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                className="w-full" 
                disabled={!item.inStock}
                onClick={() => {
                  addToCart(item.id);
                  onPageChange('cart');
                }}
              >
                {item.inStock ? (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Products */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* This would typically show recommended products */}
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608494132127-cfadf11a3889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTY0MTYxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Recommended Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-1">Organic Carrots</h3>
              <p className="text-sm text-gray-600 mb-2">Fresh & crispy</p>
              <div className="flex items-center justify-between">
                <span className="font-bold">$8.99</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm">Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
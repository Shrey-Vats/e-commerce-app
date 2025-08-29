import { useState } from 'react';
import { Filter, Grid, List, Plus, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductListingPageProps {
  onPageChange: (page: string, productId?: string) => void;
}

export default function ProductListingPage({ onPageChange }: ProductListingPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = [
    'Vegetables',
    'Fruits',
    'Meat & Fish',
    'Dairy',
    'Snacks',
    'Beverages',
    'Bakery',
    'Frozen Foods'
  ];

  const products = [
    {
      id: '1',
      name: 'Organic Beetroot',
      subtitle: 'Fresh from local farm',
      price: 17.29,
      originalPrice: 19.99,
      rating: 4.5,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBvcmdhbmljfGVufDF8fHx8MTc1NjQyMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Vegetables',
      inStock: true,
      organic: true,
    },
    {
      id: '2',
      name: 'Premium Avocado',
      subtitle: 'Imported from Italy',
      price: 12.29,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Fruits',
      inStock: true,
      organic: true,
    },
    {
      id: '3',
      name: 'Canned Spam',
      subtitle: 'Ready to eat',
      price: 14.29,
      originalPrice: 16.99,
      rating: 4.2,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1608494132127-cfadf11a3889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTY0MTYxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Snacks',
      inStock: true,
      organic: false,
    },
    {
      id: '4',
      name: 'Fresh Beef Mix',
      subtitle: 'Cut with bone',
      price: 16.29,
      originalPrice: 18.99,
      rating: 4.6,
      reviews: 73,
      image: 'https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcHJvZHVjdHMlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjQ2NjYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Meat & Fish',
      inStock: true,
      organic: false,
    },
    {
      id: '5',
      name: 'Fresh Milk',
      subtitle: 'Organic dairy',
      price: 18.29,
      originalPrice: 20.99,
      rating: 4.4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1621458472871-d8b6a409aba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsa3xlbnwxfHx8fDE3NTY0MjgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Dairy',
      inStock: false,
      organic: true,
    },
  ];

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onPageChange('product-detail', product.id)}
    >
      <CardContent className="p-4">
        <div className="relative">
          <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          {product.organic && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">
              Organic
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-bold text-lg">${product.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice}
            </span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </Badge>
        </div>
        
        <Button 
          className="w-full" 
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic
          }}
        >
          {product.inStock ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Filters</h3>
            
            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label className="font-semibold mb-4 block">Categories</Label>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div>
            <Label className="font-semibold mb-4 block">Other Filters</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="organic" />
                <Label htmlFor="organic" className="text-sm">Organic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="instock" />
                <Label htmlFor="instock" className="text-sm">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="onsale" />
                <Label htmlFor="onsale" className="text-sm">On Sale</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="text-gray-600">{products.length} products found</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
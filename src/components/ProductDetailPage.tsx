import { useState, useEffect } from 'react';
import { Heart, Share2, Star, Plus, Minus, ShoppingCart, Clock, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId?: string;
  onPageChange: (page: string) => void;
}

export default function ProductDetailPage({ productId, onPageChange }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 270,
    hours: 13,
    minutes: 10,
    seconds: 32
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock product data
  const product = {
    id: productId || '1',
    name: 'Bobs red mill whole wheat',
    subtitle: 'Bevmo grocery',
    price: 429.12,
    originalPrice: 615.89,
    discount: 70,
    rating: 4.5,
    reviews: 15,
    description: 'Coconut Oil is a great-tasting, nutritious alternative to use when cooking or baking. Coconut Oil is a naturally rich source of medium chain.',
    images: [
      'https://images.unsplash.com/photo-1738717201678-412395e65b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMHdoZWF0JTIwZmxvdXIlMjBiYWd8ZW58MXx8fHwxNzU2NDY3NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1590150391928-7c3ae3afc70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG91ciUyMHBhY2thZ2luZyUyMG9yZ2FuaWN8ZW58MXx8fHwxNzU2NDY3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1646451403191-0d763de28fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG91ciUyMHByb2R1Y3QlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjQ2Nzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1691482995300-b57fef9fa0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBmbG91ciUyMHBhY2thZ2V8ZW58MXx8fHwxNzU2NDY3NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    categories: ['Fruits', 'Hoodies', 'Juice', 'snacks', 'Tshirts'],
    inStock: true,
    organic: true,
    sku: 'MB3442',
    weight: '5 lbs',
    soldInLastHour: 100,
    lastSoldTime: 35,
    nutritionFacts: {
      calories: '364 per 100g',
      protein: '13.2g',
      carbs: '72.0g',
      fiber: '10.7g',
      sugar: '0.4g',
    },
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Organic Carrot',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Fresh Spinach',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1608494132127-cfadf11a3889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTY0MTYxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Organic Broccoli',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcHJvZHVjdHMlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjQ2NjYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality! Fresh and tasty beetroot.',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      comment: 'Good product, fast delivery.',
      date: '2024-01-10',
    },
]

    return (
<div className="bg-gray-50 min-h-screen">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Breadcrumb */}
    <nav className="mb-6 text-sm text-gray-600">
      <div className="flex items-center space-x-2">
        <button onClick={() => onPageChange("home")} className="hover:text-primary">Home</button>
        <span>/</span>
        <button onClick={() => onPageChange("products")} className="hover:text-primary">Products</button>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>
    </nav>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="relative">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-md">
              <span className="text-lg font-bold">{product.discount}%</span>
              <span className="text-[10px] uppercase">Discount</span>
            </div>
          </div>
        )}

        <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 shadow">
          <ImageWithFallback
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`aspect-square rounded-lg overflow-hidden border ${
                selectedImage === index ? "border-primary" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <ImageWithFallback
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Timer */}
        <div className="flex items-center mb-4 text-red-500 font-mono text-sm">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {timeLeft.days} : {timeLeft.hours.toString().padStart(2, "0")} :{" "}
            {timeLeft.minutes.toString().padStart(2, "0")} :{" "}
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-1">{product.subtitle}</p>

        {/* Name */}
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} Rating ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end space-x-2 mb-6">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          <span className="text-lg text-gray-500 line-through">${product.oldPrice}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to bucket
          </Button>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
            onClick={() => onPageChange("checkout")}
          >
            Buy with 💚 Tamara
          </Button>
        </div>

        {/* Wishlist & Compare */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <button className="flex items-center text-gray-600 hover:text-primary">
            <Heart className="h-4 w-4 mr-1" />
            Add to Wishlist
          </button>
          <button className="flex items-center text-gray-600 hover:text-primary">
            <Share2 className="h-4 w-4 mr-1" />
            Compare with other vendor
          </button>
        </div>

        {/* Availability */}
        <div className="flex items-center mb-6 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="text-gray-700">
            {product.soldInLastHour} sold in last {product.lastSoldTime} hour
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-6 text-sm text-gray-700">
          <div>
            <span className="font-medium">SKU: </span>
            {product.sku}
          </div>
          <div>
            <span className="font-medium">Categories: </span>
            {product.categories.join(", ")}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Nutrition Facts per 100g</h3>
                  <div className="space-y-2">
                    {Object.entries(product.nutritionFacts).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-gray-600">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'fill-current' : ''
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card 
                key={relatedProduct.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onPageChange('product-detail', relatedProduct.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${relatedProduct.price}</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
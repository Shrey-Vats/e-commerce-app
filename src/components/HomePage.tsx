import { ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const categories = [
    { name: 'Vegetables', icon: '🥬', color: 'bg-green-100' },
    { name: 'Snacks & Drinks', icon: '🍿', color: 'bg-orange-100' },
    { name: 'Fruits', icon: '🍎', color: 'bg-red-100' },
    { name: 'Chicken Eggs', icon: '🥚', color: 'bg-yellow-100' },
    { name: 'Milk & Dairy', icon: '🥛', color: 'bg-blue-100' },
  ];

  const deals = [
    { title: 'Save', value: '$29', subtitle: 'Save up to 30% on Grocery & 10% off orders', color: 'bg-pink-500' },
    { title: 'Discount', value: '30%', subtitle: 'Shop between 10:00 AM & 3:00 PM only', color: 'bg-orange-500' },
    { title: 'Up To', value: '50%', subtitle: 'Buy minimum of 50$ & get 10% off', color: 'bg-blue-500' },
    { title: 'Free', value: 'SHIP', subtitle: 'Free shipping on orders above $50', color: 'bg-purple-500' },
  ];

  const products = [
    {
      id: 1,
      name: 'Beetroot',
      subtitle: '(Local shop)',
      price: 17.295,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBvcmdhbmljfGVufDF8fHx8MTc1NjQyMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Italian Avocado',
      subtitle: '(Local shop)',
      price: 12.295,
      originalPrice: 15.99,
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Spam Jam',
      subtitle: '(Process food)',
      price: 14.295,
      originalPrice: 16.99,
      image: 'https://images.unsplash.com/photo-1608494132127-cfadf11a3889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTY0MTYxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      name: 'Beef Mixed',
      subtitle: '(Cut Bone)',
      price: 16.295,
      originalPrice: 18.99,
      image: 'https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcHJvZHVjdHMlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjQ2NjYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      name: 'Cold drinks',
      subtitle: '(Sprite)',
      price: 18.295,
      originalPrice: 20.99,
      image: 'https://images.unsplash.com/photo-1621458472871-d8b6a409aba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsa3xlbnwxfHx8fDE3NTY0MjgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              We bring the store<br />to your door
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Get organic products and sustainably sourced groceries delivered to your door, priority
            </p>
            <Button 
              onClick={() => onPageChange('products')}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Shop now
            </Button>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="bg-white/10 rounded-full p-8">
              <ShoppingBag className="h-16 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="ghost" className="text-primary">
            See all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onPageChange('products')}
            >
              <CardContent className="p-6 text-center">
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deals.map((deal, index) => (
            <Card key={index} className={`${deal.color} text-white`}>
              <CardContent className="p-4">
                <p className="text-sm opacity-90">{deal.title}</p>
                <p className="text-2xl font-bold mb-2">{deal.value}</p>
                <p className="text-xs opacity-90">{deal.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* You might need section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">You might need</h2>
          <Button 
            variant="ghost" 
            className="text-primary"
            onClick={() => onPageChange('products')}
          >
            See more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
                {product.quantity ? (
                  <div className="flex items-center justify-between bg-primary text-white rounded-lg px-3 py-2">
                    <button className="text-lg">−</button>
                    <span>{product.quantity}</span>
                    <button className="text-lg">+</button>
                  </div>
                ) : (
                  <Button className="w-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* App Download Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Stay Home and Get All<br />Your Essentials From<br />Our Market!
            </h3>
            <p className="opacity-90 mb-6">
              Download our app and get your groceries delivered to your doorstep
            </p>
            <div className="flex space-x-4">
              <Button className="bg-black text-white hover:bg-gray-800">
                📱 Google Play
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                🍎 App Store
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { ReactNode, useState } from 'react';
import { Search, ShoppingCart, User, Menu, Heart, Package, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [cartCount] = useState(3);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Categories', id: 'categories' },
    { name: 'Deals', id: 'deals' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-primary text-white px-3 py-2 rounded-lg">
                <span className="font-bold text-lg">Gromeuse</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Order your next delivery within 60 min"
                  className="pl-10 bg-gray-100 border-0"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onPageChange('wishlist')}
                className="relative"
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onPageChange('cart')}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">U</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onPageChange('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange('orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange('seller-dashboard')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Seller Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange('admin-dashboard')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange('login')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 pb-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-primary border-b-2 border-primary pb-2'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrdersPageProps {
  onPageChange: (page: string) => void;
}

export default function OrdersPage({ onPageChange }: OrdersPageProps) {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 47.87,
      items: 4,
      estimatedDelivery: '2024-01-21',
      products: [
        {
          name: 'Organic Beetroot',
          quantity: 2,
          price: 17.29,
          image: 'https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBvcmdhbmljfGVufDF8fHx8MTc1NjQyMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          name: 'Premium Avocado',
          quantity: 1,
          price: 12.29,
          image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NDY2NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      status: 'in-transit',
      total: 32.45,
      items: 3,
      estimatedDelivery: '2024-01-22',
      products: [
        {
          name: 'Fresh Milk',
          quantity: 2,
          price: 18.29,
          image: 'https://images.unsplash.com/photo-1621458472871-d8b6a409aba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsa3xlbnwxfHx8fDE3NTY0MjgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    {
      id: 'ORD-003',
      date: '2024-01-15',
      status: 'processing',
      total: 25.67,
      items: 2,
      estimatedDelivery: '2024-01-23',
      products: [
        {
          name: 'Canned Spam',
          quantity: 1,
          price: 14.29,
          image: 'https://images.unsplash.com/photo-1608494132127-cfadf11a3889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTY0MTYxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'in-transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order {order.id}</CardTitle>
            <p className="text-sm text-gray-600">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
            {getStatusIcon(order.status)}
            {getStatusText(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="flex justify-between items-center text-sm">
            <span>{order.items} items</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>

          {/* Products */}
          <div className="space-y-2">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-600">Qty: {product.quantity}</p>
                </div>
                <span className="text-sm font-medium">${product.price}</span>
              </div>
            ))}
          </div>

          {/* Estimated Delivery */}
          {order.status !== 'delivered' && (
            <div className="text-sm">
              <span className="text-gray-600">Estimated delivery: </span>
              <span className="font-medium">
                {new Date(order.estimatedDelivery).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm">
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
            {order.status === 'delivered' && (
              <>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Invoice
                </Button>
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              </>
            )}
            {order.status === 'processing' && (
              <Button variant="outline" size="sm">
                Cancel Order
              </Button>
            )}
            {order.status === 'in-transit' && (
              <Button variant="outline" size="sm">
                Track Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Button onClick={() => onPageChange('products')}>
          Continue Shopping
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {orders.length > 0 ? (
            <div>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start shopping to see your orders here
              </p>
              <Button onClick={() => onPageChange('products')}>
                Start Shopping
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <div>
            {orders.filter(order => order.status === 'processing').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-transit" className="mt-6">
          <div>
            {orders.filter(order => order.status === 'in-transit').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          <div>
            {orders.filter(order => order.status === 'delivered').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
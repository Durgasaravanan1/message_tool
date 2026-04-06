import { ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function Ecommerce() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data for demonstration
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, stock: 45, sales: 128 },
    { id: 2, name: 'Smart Watch', price: 199.99, stock: 32, sales: 89 },
    { id: 3, name: 'Phone Case', price: 24.99, stock: 156, sales: 234 },
  ]);

  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: 79.99, status: 'delivered', date: '2026-04-01' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: 199.99, status: 'processing', date: '2026-04-01' },
    { id: 'ORD-003', customer: 'Mike Johnson', product: 'Phone Case', amount: 24.99, status: 'pending', date: '2026-03-31' },
  ]);

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleOrderClick = (order) => {
    console.log('Order clicked:', order);
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('Product ID:', product.id);
    console.log('Product Name:', product.name);
    console.log('Product Price:', product.price);
    alert(`Added ${product.name} to cart!`);
  };

  const handleWhatsAppOrder = (product) => {
    console.log('Placing WhatsApp order for:', product);
    const message = `I would like to order: ${product.name} ($${product.price})\nQuantity: 1`;
    console.log('WhatsApp message:', message);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleUpdateOrderStatus = (order, newStatus) => {
    console.log('Updating order status:', order.id);
    console.log('Current status:', order.status);
    console.log('New status:', newStatus);
    alert(`Order ${order.id} status updated to ${newStatus}`);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">E-commerce</h1>
        <p className="text-sm text-gray-500 mt-1">Manage products and orders via WhatsApp</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: '1,245', icon: ShoppingCart, change: '+12%', onClick: () => console.log('Total Orders stat clicked') },
          { label: 'Products', value: '89', icon: Package, change: '+5', onClick: () => console.log('Products stat clicked') },
          { label: 'Conversion Rate', value: '24.8%', icon: TrendingUp, change: '+2.1%', onClick: () => console.log('Conversion Rate stat clicked') },
          { label: 'Revenue', value: '$84,250', icon: DollarSign, change: '+18%', onClick: () => console.log('Revenue stat clicked') },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              onClick={stat.onClick}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-gray-100 text-blue-600">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Products Section */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
          <p className="text-sm text-gray-500 mt-1">Quick view of your latest products</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Product</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Price</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Stock</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Sales</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">${product.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-xs ${
                      product.stock > 50 ? 'bg-green-100 text-green-700' : 
                      product.stock > 20 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{product.sales}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        WhatsApp Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Order ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Customer</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Product</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td 
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <p className="font-medium text-blue-600">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{order.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{order.product}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">${order.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-500 text-sm">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order, e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp Commerce Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 lg:p-12 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Commerce</h3>
        <p className="text-gray-500 mb-4">Sell products directly through WhatsApp with catalog and checkout</p>
        <button
          onClick={() => {
            console.log('Launch WhatsApp Commerce button clicked');
            console.log('Opening WhatsApp Business integration');
            alert('WhatsApp Commerce integration would open here');
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Launch WhatsApp Commerce
        </button>
      </div>

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Price:</span>
                <span className="text-gray-900 font-semibold">${selectedProduct.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stock:</span>
                <span className="text-gray-900">{selectedProduct.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Sales:</span>
                <span className="text-gray-900">{selectedProduct.sales}</span>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    console.log('Modal Add to Cart clicked for:', selectedProduct);
                    handleAddToCart(selectedProduct);
                    setShowProductModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    console.log('Modal WhatsApp Order clicked for:', selectedProduct);
                    handleWhatsAppOrder(selectedProduct);
                    setShowProductModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  WhatsApp Order
                </button>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  console.log('Product modal closed');
                  setShowProductModal(false);
                  setSelectedProduct(null);
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="text-gray-900 font-medium">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="text-gray-900">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Product:</span>
                <span className="text-gray-900">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="text-gray-900">${selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="text-gray-900 capitalize">{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-900">{selectedOrder.date}</span>
              </div>
              <button
                onClick={() => {
                  console.log('Contact customer via WhatsApp:', selectedOrder);
                  const message = `Hello ${selectedOrder.customer}, your order ${selectedOrder.id} is ${selectedOrder.status}.`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Customer via WhatsApp
              </button>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  console.log('Order modal closed');
                  setShowOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
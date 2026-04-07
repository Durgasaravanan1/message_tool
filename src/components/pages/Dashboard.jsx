import { useState, useEffect, useRef } from 'react';
import {
  Users,
  Send,
  MessageSquare,
  Mail,
  TrendingUp,
  Flame,
  ArrowUp,
  Zap,
  Activity,
  DollarSign,
  Eye,
  Workflow,
  Bot,
  Wallet,
  Inbox,
  PlusCircle,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  Lock,
  Plus,
  Minus,
  Edit2,
  Package,
  Rocket,
  Star,
  X,
  ArrowLeft,
  Clock,
  History,
  RefreshCw,
  Info,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

// Credit plans configuration
const CREDIT_PLANS = [
  {
    id: 'basic',
    name: 'Basic Pack',
    price: 49,
    messages: 10000,
    perMessageRate: 0.0049,
    minAdd: 1000,
    icon: Package,
    gradient: 'from-emerald-500 to-green-600',
    popular: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 99,
    messages: 50000,
    perMessageRate: 0.00198,
    minAdd: 5000,
    icon: Rocket,
    gradient: 'from-blue-500 to-indigo-600',
    popular: true,
    badge: 'Popular',
  },
  {
    id: 'business',
    name: 'Business Pack',
    price: 199,
    messages: 100000,
    perMessageRate: 0.00199,
    minAdd: 10000,
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-600',
    popular: false,
    badge: 'Best Value',
  },
];

// Updated KPI data with correct order and labels
const kpiData = [
  {
    label: 'Total Contacts',
    value: '24,567',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    label: 'WhatsApp Sent',
    value: '45,234',
    change: '+18.3%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    label: 'WhatsApp Replies',
    value: '8,542',
    change: '+18.7%',
    trend: 'up',
    icon: Send,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    label: 'Email Opens',
    value: '32,180',
    change: '+15.2%',
    trend: 'up',
    icon: Eye,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  {
    label: 'Email Sent',
    value: '89,432',
    change: '+22.7%',
    trend: 'up',
    icon: Mail,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    label: 'Active Campaigns',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: Activity,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
  },
];

const messageData = [
  { date: 'Jan 1', sent: 1200, delivered: 1180, read: 890 },
  { date: 'Jan 2', sent: 1800, delivered: 1750, read: 1320 },
  { date: 'Jan 3', sent: 1400, delivered: 1380, read: 1050 },
  { date: 'Jan 4', sent: 2200, delivered: 2150, read: 1680 },
  { date: 'Jan 5', sent: 1900, delivered: 1870, read: 1450 },
  { date: 'Jan 6', sent: 2400, delivered: 2360, read: 1890 },
  { date: 'Jan 7', sent: 2100, delivered: 2050, read: 1620 },
];

const replyRateData = [
  { date: 'Mon', rate: 68 },
  { date: 'Tue', rate: 72 },
  { date: 'Wed', rate: 65 },
  { date: 'Thu', rate: 78 },
  { date: 'Fri', rate: 75 },
  { date: 'Sat', rate: 62 },
  { date: 'Sun', rate: 58 },
];

const emailOpenData = [
  { date: 'Mon', opens: 420 },
  { date: 'Tue', opens: 580 },
  { date: 'Wed', opens: 510 },
  { date: 'Thu', opens: 690 },
  { date: 'Fri', opens: 640 },
  { date: 'Sat', opens: 380 },
  { date: 'Sun', opens: 320 },
];

const activityFeed = [
  {
    type: 'campaign',
    message: 'Campaign "Spring Sale" sent to 3,200 contacts',
    time: '2 min ago',
    icon: Send,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    type: 'lead',
    message: 'New hot lead: Sarah Johnson (Score: 95)',
    time: '5 min ago',
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    type: 'conversion',
    message: '5 new conversions from "Product Launch"',
    time: '8 min ago',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    type: 'automation',
    message: 'Workflow "Follow-up Sequence" triggered for 150 contacts',
    time: '12 min ago',
    icon: Zap,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    type: 'reply',
    message: '24 new replies in Team Inbox',
    time: '15 min ago',
    icon: Activity,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    type: 'email',
    message: 'Email campaign "Newsletter Q1" delivered successfully',
    time: '22 min ago',
    icon: Mail,
    color: 'text-pink-600 dark:text-pink-400',
  },
];

const aiInsights = [
  {
    title: 'Best Time to Send',
    description: 'Thursday 2-4 PM shows 32% higher engagement',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Hot Lead Alert',
    description: '15 contacts are highly engaged in the last hour',
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    title: 'Campaign Suggestion',
    description: 'Re-engage 1,240 inactive contacts from last month',
    icon: Zap,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
];

// Credit Dropdown Component
function CreditDropdown({ balance, onClose, onViewDetails, onGetMoreMessages, purchases }) {
  const totalRemaining = purchases.reduce((sum, p) => sum + p.remainingMessages, 0);
  
  const capabilities = [
    { label: "WhatsApp messages", perCredit: 10, icon: MessageSquare, color: "text-green-500" },
    { label: "Email sends", perCredit: 25, icon: Mail, color: "text-blue-500" },
    { label: "Campaign broadcasts", perCredit: 2, icon: Send, color: "text-purple-500" },
    { label: "Contact imports", perCredit: 100, icon: Users, color: "text-orange-500" },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
          Your message credits
        </p>
        <p className="text-4xl font-black text-gray-900">{balance.toLocaleString()}</p>
        <p className="text-xs text-gray-400 mt-1">messages remaining</p>
      </div>

      {/* Active Purchases Summary */}
      {purchases.length > 0 && (
        <div className="px-5 pb-3">
          <p className="text-xs text-gray-400 font-medium mb-2">Active Packages:</p>
          <div className="space-y-2">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{purchase.planName}</span>
                <span className="font-semibold text-gray-900">{purchase.remainingMessages.toLocaleString()} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-5 pb-4 flex gap-2">
        <button
          onClick={() => {
            onClose();
            onViewDetails();
          }}
          className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1"
        >
          <Info className="w-4 h-4" />
          See Details
        </button>
        <button
          onClick={() => {
            onClose();
            onGetMoreMessages();
          }}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-sm font-semibold text-white hover:opacity-90 transition shadow-sm flex items-center justify-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          Get More Messages
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-5" />

      {/* Capabilities */}
      <div className="px-5 py-4 space-y-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          What you can do with your credits
        </p>
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          const amount = Math.floor(totalRemaining * cap.perCredit);
          return (
            <div key={cap.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${cap.color}`} />
                <span className="text-sm text-gray-600">{cap.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {amount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Purchase Details Modal
function PurchaseDetailsModal({ purchases, onClose, onTopUp }) {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  
  if (selectedPurchase) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPurchase(null)}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div>
                <h2 className="text-base font-bold text-gray-900">Package Details</h2>
                <p className="text-xs text-gray-400">{selectedPurchase.planName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="p-6 space-y-5">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date</span>
                  <span className="font-semibold">{new Date(selectedPurchase.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Messages</span>
                  <span className="font-semibold">{selectedPurchase.totalMessages.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Messages Used</span>
                  <span className="font-semibold text-orange-600">
                    {(selectedPurchase.totalMessages - selectedPurchase.remainingMessages).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Messages Remaining</span>
                  <span className="font-bold text-green-600 text-lg">{selectedPurchase.remainingMessages.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-semibold">${selectedPurchase.amount}</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Usage</span>
                  <span>{((selectedPurchase.totalMessages - selectedPurchase.remainingMessages) / selectedPurchase.totalMessages * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${((selectedPurchase.totalMessages - selectedPurchase.remainingMessages) / selectedPurchase.totalMessages * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {selectedPurchase.topups && selectedPurchase.topups.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Top-up History</h3>
                <div className="space-y-2">
                  {selectedPurchase.topups.map((topup, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">+{topup.messages.toLocaleString()} messages</p>
                        <p className="text-xs text-gray-500">{new Date(topup.date).toLocaleDateString()}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${topup.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                onTopUp(selectedPurchase);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              <PlusCircle className="w-4 h-4 inline mr-2" />
              Add More Messages to This Package
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-orange-500" />
            <div>
              <h2 className="text-base font-bold text-gray-900">My Purchases</h2>
              <p className="text-xs text-gray-400">{purchases.length} active packages</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {purchases.map((purchase) => {
            const plan = CREDIT_PLANS.find(p => p.id === purchase.planId);
            const PlanIcon = plan?.icon || Package;
            const usagePercentage = ((purchase.totalMessages - purchase.remainingMessages) / purchase.totalMessages) * 100;
            
            return (
              <div key={purchase.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan?.gradient || 'from-gray-500 to-gray-600'} flex items-center justify-center`}>
                      <PlanIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{purchase.planName}</h3>
                      <p className="text-xs text-gray-500">Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPurchase(purchase)}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold">{purchase.totalMessages.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-bold text-green-600">{purchase.remainingMessages.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Used</p>
                    <p className="text-orange-600">{usagePercentage.toFixed(0)}%</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          {purchases.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No purchases yet</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/billing');
                }}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm"
              >
                Buy Your First Package
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Top-Up Modal Component
function TopUpModal({ purchase, onClose, onSuccess }) {
  const [step, setStep] = useState('quantity');
  const [additionalMessages, setAdditionalMessages] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upi: '',
    account: '',
    ifsc: '',
  });

  const plan = CREDIT_PLANS.find(p => p.id === purchase.planId);
  
  const calculateTotal = () => {
    const additionalCost = additionalMessages * plan.perMessageRate;
    return {
      additionalMessages,
      additionalCost,
      totalPrice: additionalCost,
    };
  };

  const handleAddMessages = () => {
    setAdditionalMessages(prev => prev + plan.minAdd);
  };

  const handleRemoveMessages = () => {
    setAdditionalMessages(prev => Math.max(0, prev - plan.minAdd));
  };

  const handleCustomQuantityChange = (value) => {
    const numValue = parseInt(value) || 0;
    const roundedValue = Math.round(numValue / plan.minAdd) * plan.minAdd;
    setAdditionalMessages(Math.max(0, roundedValue));
  };

  const handleProceedToPayment = () => {
    if (additionalMessages > 0) {
      setStep('payment');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const { additionalMessages: addedMsgs, totalPrice } = calculateTotal();
      
      // Update purchase in localStorage
      const purchases = JSON.parse(localStorage.getItem('user_purchases') || '[]');
      const purchaseIndex = purchases.findIndex(p => p.id === purchase.id);
      if (purchaseIndex !== -1) {
        purchases[purchaseIndex].totalMessages += addedMsgs;
        purchases[purchaseIndex].remainingMessages += addedMsgs;
        purchases[purchaseIndex].topups = purchases[purchaseIndex].topups || [];
        purchases[purchaseIndex].topups.push({
          date: new Date().toISOString(),
          messages: addedMsgs,
          amount: totalPrice,
        });
        localStorage.setItem('user_purchases', JSON.stringify(purchases));
      }
      
      // Update total message credits
      const currentCredits = parseInt(localStorage.getItem('wallet_message_credits') || '0');
      const newCredits = currentCredits + addedMsgs;
      localStorage.setItem('wallet_message_credits', newCredits.toString());
      
      // Dispatch event for real-time update
      window.dispatchEvent(new CustomEvent('walletUpdate', { 
        detail: { 
          messageCredits: newCredits,
          balance: parseFloat(localStorage.getItem('wallet_balance') || '0')
        } 
      }));
      
      onSuccess?.({ messages: addedMsgs, amount: totalPrice });
      setStep('success');
    }, 1800);
  };

  const details = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button onClick={() => setStep('quantity')} className="p-1 rounded-lg hover:bg-gray-100 transition">
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {step === 'quantity' ? 'Add More Messages' : step === 'payment' ? 'Complete Payment' : 'Success!'}
              </h2>
              <p className="text-xs text-gray-400">
                {step === 'quantity' ? `Top up ${purchase.planName}` : step === 'payment' ? 'Secure payment' : 'Messages added'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {step === 'quantity' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Current Package</span>
                  <span className="font-semibold">{purchase.planName}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Messages Remaining</span>
                  <span className="font-bold text-green-600">{purchase.remainingMessages.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Extra Messages</label>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRemoveMessages}
                      disabled={additionalMessages === 0}
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <input
                        type="number"
                        value={additionalMessages}
                        onChange={(e) => handleCustomQuantityChange(e.target.value)}
                        className="w-36 text-center text-lg font-semibold border border-gray-200 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        step={plan.minAdd}
                        min="0"
                      />
                      <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMessages}
                      className="w-10 h-10 rounded-lg border border-orange-200 bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition"
                    >
                      <Plus className="w-4 h-4 text-orange-600" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">+{plan.minAdd.toLocaleString()} per click</p>
                    <p className="text-xs text-gray-400">${plan.perMessageRate.toFixed(4)}/msg</p>
                  </div>
                </div>
              </div>

              {additionalMessages > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Additional Messages:</span>
                    <span className="font-semibold text-orange-600">+{additionalMessages.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Additional Cost:</span>
                    <span className="font-semibold">${details.additionalCost.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={additionalMessages === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePay} className="space-y-5">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Additional Messages</p>
                    <p className="text-xl font-bold text-gray-900">{details.additionalMessages.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total to Pay</p>
                    <p className="text-2xl font-black text-orange-600">${details.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Payment method</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Card', Icon: CreditCard },
                    { id: 'upi', label: 'UPI', Icon: Smartphone },
                    { id: 'bank', label: 'Bank', Icon: Building },
                  ].map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPaymentMethod(id)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition ${
                        paymentMethod === id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <input placeholder="Card number" maxLength={19} value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  <input placeholder="Cardholder name" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                    <input placeholder="CVV" maxLength={4} value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <input placeholder="UPI ID (e.g., name@okhdfc)" value={form.upi} onChange={(e) => setForm({ ...form, upi: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-3">
                  <input placeholder="Account number" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  <input placeholder="IFSC code" value={form.ifsc} onChange={(e) => setForm({ ...form, ifsc: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-60 shadow-lg">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  `Pay $${details.totalPrice.toFixed(2)}`
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit SSL · PCI DSS compliant
              </p>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Top Up Successful!</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {details.additionalMessages.toLocaleString()} messages added to your package
                </p>
              </div>
              <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition">
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [messageCredits, setMessageCredits] = useState(0);
  const [userPurchases, setUserPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const balance = localStorage.getItem('wallet_balance');
    const credits = localStorage.getItem('wallet_message_credits');
    const purchases = localStorage.getItem('user_purchases');
    
    if (balance) setWalletBalance(parseFloat(balance));
    if (credits) setMessageCredits(parseInt(credits));
    
    if (purchases) {
      setUserPurchases(JSON.parse(purchases));
    } else {
      const samplePurchases = [
        {
          id: 'pur_001',
          planId: 'pro',
          planName: 'Pro Pack',
          purchaseDate: '2024-01-15T10:30:00Z',
          totalMessages: 50000,
          remainingMessages: 32500,
          amount: 99,
          topups: [{ date: '2024-02-01T14:20:00Z', messages: 5000, amount: 9.90 }]
        },
        {
          id: 'pur_002',
          planId: 'basic',
          planName: 'Basic Pack',
          purchaseDate: '2024-02-10T09:15:00Z',
          totalMessages: 10000,
          remainingMessages: 4200,
          amount: 49,
          topups: []
        }
      ];
      localStorage.setItem('user_purchases', JSON.stringify(samplePurchases));
      setUserPurchases(samplePurchases);
    }

    const handleStorageChange = (e) => {
      if (e.key === 'wallet_balance') setWalletBalance(parseFloat(e.newValue) || 0);
      if (e.key === 'wallet_message_credits') setMessageCredits(parseInt(e.newValue) || 0);
      if (e.key === 'user_purchases') setUserPurchases(JSON.parse(e.newValue) || []);
    };

    const handleWalletUpdate = (event) => {
      if (event.detail) {
        if (event.detail.balance !== undefined) setWalletBalance(event.detail.balance);
        if (event.detail.messageCredits !== undefined) setMessageCredits(event.detail.messageCredits);
      }
    };
    
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCreditDropdown(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('walletUpdate', handleWalletUpdate);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('walletUpdate', handleWalletUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTopUp = (purchase) => {
    setSelectedPurchase(purchase);
    setShowTopUpModal(true);
  };

  const handleTopUpSuccess = () => {
    const updatedPurchases = JSON.parse(localStorage.getItem('user_purchases') || '[]');
    setUserPurchases(updatedPurchases);
    const updatedCredits = localStorage.getItem('wallet_message_credits');
    if (updatedCredits) setMessageCredits(parseInt(updatedCredits));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Modals */}
      {showTopUpModal && selectedPurchase && (
        <TopUpModal purchase={selectedPurchase} onClose={() => setShowTopUpModal(false)} onSuccess={handleTopUpSuccess} />
      )}
      {showPurchaseDetails && (
        <PurchaseDetailsModal purchases={userPurchases} onClose={() => setShowPurchaseDetails(false)} onTopUp={handleTopUp} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Credits Button with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowCreditDropdown(!showCreditDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all group"
            >
              <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{messageCredits.toLocaleString()} Credits</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showCreditDropdown ? 'rotate-90' : ''}`} />
            </button>
            
            {showCreditDropdown && (
              <CreditDropdown
                balance={messageCredits}
                purchases={userPurchases}
                onClose={() => setShowCreditDropdown(false)}
                onViewDetails={() => setShowPurchaseDetails(true)}
                onGetMoreMessages={() => {
                  if (userPurchases.length > 0) {
                    setSelectedPurchase(userPurchases[0]);
                    setShowTopUpModal(true);
                  }
                }}
              />
            )}
          </div>

          {/* Wallet Button */}
          <button
            onClick={() => navigate('/billing')}
            className="flex items-center gap-3 px-4 py-2 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-all group"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Wallet</span>
            </div>
            <div className="h-6 w-px bg-green-300"></div>
            <span className="text-sm font-bold text-green-700">
              ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <ArrowUp className="w-3 h-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Messages Sent</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={messageData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sent" stroke="#6366f1" fillOpacity={1} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="delivered" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="read" stroke="#10b981" fillOpacity={1} fill="url(#colorSent)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply Rate (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={replyRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Open Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={emailOpenData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="opens" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <Icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity</h3>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {activityFeed.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-200 rounded-xl p-4 lg:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/campaigns/create" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Create Campaign</h4>
              <p className="text-xs text-gray-500">Send messages</p>
            </div>
          </Link>

          <Link to="/contacts/upload" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Upload Contacts</h4>
              <p className="text-xs text-gray-500">Import CSV</p>
            </div>
          </Link>

          <Link to="/whatsapp/flows/create" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Setup Flow</h4>
              <p className="text-xs text-gray-500">Auto-reply</p>
            </div>
          </Link>

          <Link to="/chatbot" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Setup Chatbot</h4>
              <p className="text-xs text-gray-500">Configure FAQ</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
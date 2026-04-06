


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, Download, Calendar, ChevronDown, ChevronUp, 
  Clock, AlertCircle, MessageCircle, Mail, Briefcase, 
  Rocket, Star, CheckCircle, Zap, Shield, Sparkles,
  TrendingUp, Wallet, Receipt, FileText, ArrowRight,
  Crown, Phone, Inbox, Layers
} from 'lucide-react';

export default function Billing() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedWhatsAppPlan, setSelectedWhatsAppPlan] = useState('pro');
  const [selectedEmailPlan, setSelectedEmailPlan] = useState('business');
  const [selectedCombinedPlan, setSelectedCombinedPlan] = useState('professional');
  const [isYearly, setIsYearly] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // Simplified plans with just essential data
  const whatsappPlans = [
    {
      id: 'basic',
      name: "WhatsApp Basic",
      monthlyPrice: 49,
      yearlyPrice: 490,
      messages: "10K msgs",
      features: ["10,000 messages", "Basic automation", "24/7 support"],
      icon: MessageCircle,
      color: "from-green-500 to-emerald-600",
      popular: false
    },
    {
      id: 'pro',
      name: "WhatsApp Pro",
      monthlyPrice: 99,
      yearlyPrice: 990,
      messages: "50K msgs",
      features: ["50,000 messages", "Advanced automation", "Priority support", "Analytics"],
      icon: MessageCircle,
      color: "from-green-600 to-teal-600",
      popular: true
    },
    {
      id: 'business',
      name: "WhatsApp Business",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      messages: "Unlimited",
      features: ["Unlimited messages", "AI automation", "Dedicated manager", "API access"],
      icon: MessageCircle,
      color: "from-emerald-600 to-green-700",
      popular: false
    },
  ];

  const emailPlans = [
    {
      id: 'basic',
      name: "Email Basic",
      monthlyPrice: 29,
      yearlyPrice: 290,
      emails: "50K emails",
      features: ["50,000 emails", "Email templates", "Basic reporting"],
      icon: Mail,
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      id: 'pro',
      name: "Email Pro",
      monthlyPrice: 79,
      yearlyPrice: 790,
      emails: "200K emails",
      features: ["200,000 emails", "Advanced templates", "A/B testing", "Analytics"],
      icon: Mail,
      color: "from-blue-600 to-purple-600",
      popular: true
    },
    {
      id: 'business',
      name: "Email Business",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      emails: "Unlimited",
      features: ["Unlimited emails", "AI segmentation", "Dedicated support", "API access"],
      icon: Mail,
      color: "from-indigo-600 to-purple-700",
      popular: false
    },
  ];

  const combinedPlans = [
    {
      id: 'starter',
      name: "Starter Suite",
      monthlyPrice: 69,
      yearlyPrice: 690,
      features: ["WhatsApp: 10K msgs", "Email: 50K emails", "Basic automation"],
      icon: Briefcase,
      color: "from-gray-500 to-gray-700",
      popular: false
    },
    {
      id: 'professional',
      name: "Professional Suite",
      monthlyPrice: 159,
      yearlyPrice: 1590,
      features: ["WhatsApp: 50K msgs", "Email: 200K emails", "Advanced automation", "API access"],
      icon: Rocket,
      color: "from-purple-600 to-pink-600",
      popular: true
    },
    {
      id: 'enterprise',
      name: "Enterprise Suite",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: ["WhatsApp: Unlimited", "Email: Unlimited", "AI automation", "24/7 support"],
      icon: Crown,
      color: "from-amber-500 to-orange-600",
      popular: false
    },
  ];

  // Sample transaction data
  const transactions = [
    { id: 1, date: "2024-03-01", month: 3, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: 99, status: "paid", invoice: "INV-001" },
    { id: 2, date: "2024-03-01", month: 3, year: 2024, type: "Email", description: "Email Business - Monthly", amount: 149, status: "paid", invoice: "INV-002" },
    { id: 3, date: "2024-04-01", month: 4, year: 2024, type: "Combined", description: "Professional Suite", amount: 159, status: "paid", invoice: "INV-003" },
    { id: 4, date: "2024-05-01", month: 5, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: 99, status: "paid", invoice: "INV-004" },
    { id: 5, date: "2024-06-01", month: 6, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: 99, status: "pending", invoice: "INV-005" },
  ];

  const filteredTransactions = transactions.filter((t) => {
    return t.month === selectedMonth && t.year === selectedYear;
  });

  const handleBuyNow = (planType, plan, billingCycle) => {
    const checkoutData = {
      planType: planType,
      planId: plan.id,
      planName: plan.name,
      amount: billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice,
      billingCycle: billingCycle,
      features: plan.features,
      messages: plan.messages || plan.emails || 'Custom'
    };
    
    localStorage.setItem('selectedPlan', JSON.stringify(checkoutData));
    navigate('/wallet/checkout');
  };

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const PlanCard = ({ plan, type, onBuy }) => {
    const Icon = plan.icon;
    const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const isHovered = hoveredPlan === `${type}-${plan.id}`;
    
    return (
      <div
        onMouseEnter={() => setHoveredPlan(`${type}-${plan.id}`)}
        onMouseLeave={() => setHoveredPlan(null)}
        className={`relative transition-all duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`}
      >
        <div className={`relative rounded-xl border-2 p-5 bg-white dark:bg-gray-900 ${
          plan.popular 
            ? 'border-purple-500 shadow-lg' 
            : 'border-gray-200 dark:border-gray-700'
        } ${isHovered ? 'shadow-xl' : ''}`}>
          
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Popular
              </span>
            </div>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${currentPrice}
              </span>
              <span className="text-gray-500 text-sm">/{isYearly ? 'year' : 'mo'}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{plan.messages || plan.emails || 'Complete solution'}</p>
          
          <div className="space-y-2 mb-4">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => onBuy(plan)}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Buy Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-600" />
              Billing & Subscriptions
            </h2>
            <p className="text-sm text-gray-500 mt-1">Choose your plan and manage billing</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <Wallet className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Wallet Balance: ${parseFloat(localStorage.getItem('wallet_balance') || '0').toFixed(2)}</span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 py-2">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-purple-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${isYearly ? 'text-purple-600' : 'text-gray-500'}`}>
            Yearly
            <span className="text-green-600 text-xs ml-1">Save 20%</span>
          </span>
        </div>

        {/* Combined Suite */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">WhatsApp + Email Suite</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {combinedPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                type="combined"
                onBuy={(plan) => handleBuyNow('combined', plan, isYearly ? 'yearly' : 'monthly')}
              />
            ))}
          </div>
        </div>

        {/* WhatsApp Plans */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">WhatsApp Business</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whatsappPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                type="whatsapp"
                onBuy={(plan) => handleBuyNow('whatsapp', plan, isYearly ? 'yearly' : 'monthly')}
              />
            ))}
          </div>
        </div>

        {/* Email Plans */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Inbox className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Marketing</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emailPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                type="email"
                onBuy={(plan) => handleBuyNow('email', plan, isYearly ? 'yearly' : 'monthly')}
              />
            ))}
          </div>
        </div>

        {/* Savings Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Savings with Combined Suite</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">WhatsApp Pro + Email Pro (Separate)</span>
                <span className="font-semibold">$178/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Professional Suite (Combined)</span>
                <span className="font-semibold text-purple-600">$159/mo</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-purple-200">
                <span className="font-medium">Monthly Savings</span>
                <span className="font-bold text-green-600">$19 (11%)</span>
              </div>
            </div>
            <button 
              onClick={() => handleBuyNow('combined', combinedPlans[1], isYearly ? 'yearly' : 'monthly')}
              className="py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
            >
              Switch to Professional Suite →
            </button>
          </div>
        </div>

        {/* Filter & Transaction History */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-3">
              {/* Month Select */}
              <div className="relative">
                <button
                  onClick={() => setIsMonthOpen(!isMonthOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  {getMonthName(selectedMonth)}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isMonthOpen && (
                  <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-gray-900 border rounded-lg shadow-lg z-10">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <div
                        key={month}
                        onClick={() => { setSelectedMonth(month); setIsMonthOpen(false); }}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
                      >
                        {getMonthName(month)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Year Select */}
              <div className="relative">
                <button
                  onClick={() => setIsYearOpen(!isYearOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  {selectedYear}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isYearOpen && (
                  <div className="absolute top-full left-0 mt-1 w-28 bg-white dark:bg-gray-900 border rounded-lg shadow-lg z-10">
                    {[2024, 2023, 2022].map(year => (
                      <div
                        key={year}
                        onClick={() => { setSelectedYear(year); setIsYearOpen(false); }}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowTransactionHistory(!showTransactionHistory)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Receipt className="w-4 h-4" />
              {showTransactionHistory ? 'Hide' : 'Show'} History
              {showTransactionHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          {showTransactionHistory && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b">
                  <tr>
                    <th className="p-3 text-left text-gray-600 text-xs">Date</th>
                    <th className="p-3 text-left text-gray-600 text-xs">Plan</th>
                    <th className="p-3 text-left text-gray-600 text-xs">Description</th>
                    <th className="p-3 text-right text-gray-600 text-xs">Amount</th>
                    <th className="p-3 text-center text-gray-600 text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3 text-gray-900 text-xs">{transaction.date}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                          transaction.type === 'WhatsApp' ? 'bg-green-100 text-green-700' :
                          transaction.type === 'Email' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {transaction.type === 'WhatsApp' && <MessageCircle className="w-2.5 h-2.5" />}
                          {transaction.type === 'Email' && <Mail className="w-2.5 h-2.5" />}
                          {transaction.type === 'Combined' && <Rocket className="w-2.5 h-2.5" />}
                          {transaction.type}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 text-xs">{transaction.description}</td>
                      <td className="p-3 text-right font-semibold">${transaction.amount}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                          transaction.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status === 'paid' ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
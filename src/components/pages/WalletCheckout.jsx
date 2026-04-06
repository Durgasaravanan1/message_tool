import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
  Smartphone,
  Building,
  Shield,
  DollarSign,
  Send,
  MessageSquare,
  Users,
  Zap,
} from 'lucide-react';

const WalletCheckout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState({});

  const plans = [
    { id: 'basic', name: 'Basic', price: 29, messages: 5000, users: 1 },
    { id: 'pro', name: 'Professional', price: 99, messages: 25000, users: 5 },
    { id: 'business', name: 'Business', price: 299, messages: 100000, users: 20 },
    { id: 'enterprise', name: 'Enterprise', price: 999, messages: 'Unlimited', users: 'Unlimited' },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount && !selectedPlan) {
      newErrors.amount = 'Please enter amount or select a plan';
    } else if (formData.amount && (isNaN(formData.amount) || formData.amount <= 0)) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Please enter valid 16-digit card number';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Please enter cardholder name';
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Please enter valid CVV';
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.match(/^[\w.-]+@[\w.-]+$/)) {
        newErrors.upiId = 'Please enter valid UPI ID';
      }
    } else if (formData.paymentMethod === 'bank') {
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Please enter account number';
      }
      if (!formData.ifscCode) {
        newErrors.ifscCode = 'Please enter IFSC code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData({ ...formData, amount: plan.price.toString() });
    setErrors({ ...errors, amount: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      setStep(3);
      
      // Store transaction details
      const transaction = {
        id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: formData.amount || selectedPlan?.price,
        date: new Date().toISOString(),
        method: formData.paymentMethod,
        plan: selectedPlan?.name,
        status: 'successful',
      };
      
      // Save to localStorage for demo
      const transactions = JSON.parse(localStorage.getItem('wallet_transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
      localStorage.setItem('wallet_balance', (parseFloat(localStorage.getItem('wallet_balance') || '0') + parseFloat(formData.amount || selectedPlan?.price)).toString());
    }, 2000);
  };

  const handleAddFunds = () => {
    navigate('/dashboard');
  };

  if (paymentSuccess && step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ${formData.amount || selectedPlan?.price} has been added to your wallet
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Transaction ID</p>
            <p className="text-sm font-mono text-gray-900 dark:text-white">
              {localStorage.getItem('wallet_transactions') ? 
                JSON.parse(localStorage.getItem('wallet_transactions'))[JSON.parse(localStorage.getItem('wallet_transactions')).length - 1].id : 
                'TXN_DEMO_001'}
            </p>
          </div>
          <button
            onClick={handleAddFunds}
            className="w-full bg-gradient-to-br from-green-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Wallet Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Funds to Wallet</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Secure payment gateway</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Amount Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      disabled={!!selectedPlan}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Or Choose a Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handlePlanSelect(plan)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedPlan?.id === plan.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">${plan.price}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <Send className="w-3 h-3 inline mr-1" />
                            {plan.messages} messages
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <Users className="w-3 h-3 inline mr-1" />
                            Up to {plan.users} users
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'upi', label: 'UPI', icon: Smartphone },
                      { id: 'bank', label: 'Bank Transfer', icon: Building },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                        }`}
                      >
                        <method.icon className="w-4 h-4" />
                        <span className="text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="Card Number"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Cardholder Name"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="CVV"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Details */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="animate-fadeIn">
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="UPI ID (e.g., name@okhdfcbank)"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                      />
                      {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                    </div>
                  )}

                  {/* Bank Details */}
                  {formData.paymentMethod === 'bank' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder="Account Number"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                        />
                        {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                          placeholder="IFSC Code"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800"
                        />
                        {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-green-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay $${formData.amount || selectedPlan?.price || '0'}`
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span>Secure payment gateway with 256-bit encryption</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-90">Current Balance</span>
                <Wallet className="w-6 h-6 opacity-90" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ${parseFloat(localStorage.getItem('wallet_balance') || '0').toLocaleString()}
              </div>
              <p className="text-xs opacity-80">Available for campaigns & messages</p>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Benefits of Wallet
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Instant Top-up</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Funds available immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Bulk Messaging</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pay per message sent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Send className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-debit</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Set up auto-recharge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {JSON.parse(localStorage.getItem('wallet_transactions') || '[]').slice(-3).reverse().map((tx, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">+ ${tx.amount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                      {tx.status}
                    </span>
                  </div>
                ))}
                {(!localStorage.getItem('wallet_transactions') || JSON.parse(localStorage.getItem('wallet_transactions')).length === 0) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No transactions yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WalletCheckout;
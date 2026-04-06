


import React, { useState, useEffect } from 'react';
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
  Send,
  MessageSquare,
  Users,
  Zap,
  Plus,
  Minus,
  Edit2,
  Package,
  Rocket,
  TrendingUp,
  Star,
} from 'lucide-react';

const WalletCheckout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  const [extraMessages, setExtraMessages] = useState(0);
  const [checkoutMode, setCheckoutMode] = useState('plan'); // 'plan' or 'credit'
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [errors, setErrors] = useState({});

  // Full plan details for credit purchase mode
  const creditPlans = [
    { id: 'basic', name: 'Basic Pack', price: 49, messages: 10000, perMessageRate: 0.0049, minAdd: 1000, color: 'from-green-500 to-emerald-600', icon: Package, popular: false },
    { id: 'pro', name: 'Pro Pack', price: 99, messages: 50000, perMessageRate: 0.00198, minAdd: 5000, color: 'from-green-600 to-teal-600', icon: Rocket, popular: true },
    { id: 'business', name: 'Business Pack', price: 199, messages: 100000, perMessageRate: 0.00199, minAdd: 10000, color: 'from-emerald-600 to-green-700', icon: TrendingUp, popular: false },
  ];

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    const mode = localStorage.getItem('checkoutMode');
    
    if (mode === 'credit_purchase') {
      setCheckoutMode('credit');
      localStorage.removeItem('checkoutMode');
    } else if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      setSelectedPlanData(plan);
      setFormData(prev => ({ ...prev, amount: plan.amount.toString() }));
      setCheckoutMode('plan');
      localStorage.removeItem('selectedPlan');
    }
  }, []);

  const calculateTotalForCreditPlan = (plan, additionalMessages) => {
    const totalMessages = plan.messages + additionalMessages;
    const additionalCost = additionalMessages * plan.perMessageRate;
    const totalPrice = plan.price + additionalCost;
    return { totalMessages, totalPrice, additionalCost, additionalMessages };
  };

  const [selectedCreditPlan, setSelectedCreditPlan] = useState(null);
  const [creditExtraMessages, setCreditExtraMessages] = useState({});

  useEffect(() => {
    if (checkoutMode === 'credit') {
      const initialQuantities = {};
      creditPlans.forEach(plan => {
        initialQuantities[plan.id] = 0;
      });
      setCreditExtraMessages(initialQuantities);
    }
  }, [checkoutMode]);

  const handleAddMessages = (planId) => {
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: prev[planId] + (creditPlans.find(p => p.id === planId)?.minAdd || 1000)
    }));
    setSelectedCreditPlan(planId);
  };

  const handleRemoveMessages = (planId) => {
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: Math.max(0, prev[planId] - (creditPlans.find(p => p.id === planId)?.minAdd || 1000))
    }));
  };

  const handleCustomQuantityChange = (planId, value) => {
    const numValue = parseInt(value) || 0;
    const plan = creditPlans.find(p => p.id === planId);
    const minAdd = plan?.minAdd || 1000;
    const roundedValue = Math.round(numValue / minAdd) * minAdd;
    setCreditExtraMessages(prev => ({
      ...prev,
      [planId]: Math.max(0, roundedValue)
    }));
  };

  const handleSelectCreditPlan = (planId) => {
    setSelectedCreditPlan(planId);
    const plan = creditPlans.find(p => p.id === planId);
    const additionalMessages = creditExtraMessages[planId] || 0;
    const { totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
    setFormData(prev => ({ ...prev, amount: totalPrice.toFixed(2) }));
  };

  const getSelectedCreditPlanDetails = () => {
    if (!selectedCreditPlan) return null;
    const plan = creditPlans.find(p => p.id === selectedCreditPlan);
    const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
    return calculateTotalForCreditPlan(plan, additionalMessages);
  };

  const selectedCreditDetails = getSelectedCreditPlanDetails();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please select a plan';
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardName) newErrors.cardName = 'Cardholder name required';
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        newErrors.expiryDate = 'MM/YY format';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Valid CVV required';
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.match(/^[\w.-]+@[\w.-]+$/)) {
        newErrors.upiId = 'Valid UPI ID required';
      }
    } else if (formData.paymentMethod === 'bank') {
      if (!formData.accountNumber) newErrors.accountNumber = 'Account number required';
      if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      setStep(3);
      
      let transactionDetails = {};
      
      if (checkoutMode === 'credit' && selectedCreditPlan) {
        const plan = creditPlans.find(p => p.id === selectedCreditPlan);
        const additionalMessages = creditExtraMessages[selectedCreditPlan] || 0;
        const { totalMessages, totalPrice } = calculateTotalForCreditPlan(plan, additionalMessages);
        transactionDetails = {
          amount: totalPrice,
          plan: plan.name,
          messages: totalMessages,
          extraMessages: additionalMessages,
        };
      } else if (selectedPlanData) {
        transactionDetails = {
          amount: parseFloat(formData.amount),
          plan: selectedPlanData.planName,
          planType: selectedPlanData.planType,
        };
      }
      
      const transaction = {
        id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: transactionDetails.amount,
        date: new Date().toISOString(),
        method: formData.paymentMethod,
        ...transactionDetails,
        status: 'successful',
      };
      
      const transactions = JSON.parse(localStorage.getItem('wallet_transactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
      localStorage.setItem('wallet_balance', (parseFloat(localStorage.getItem('wallet_balance') || '0') + transactionDetails.amount).toString());
      
      window.dispatchEvent(new CustomEvent('walletUpdate', { 
        detail: { balance: parseFloat(localStorage.getItem('wallet_balance') || '0') } 
      }));
    }, 2000);
  };

  if (paymentSuccess && step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            ${parseFloat(formData.amount).toFixed(2)} has been added to your wallet
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(checkoutMode === 'credit' ? '/dashboard' : '/billing')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              {checkoutMode === 'credit' ? 'Get Credits' : 'Checkout'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  {checkoutMode === 'credit' ? 'Select & Customize Your Pack' : 'Complete Payment'}
                </h2>
                <p className="text-sm text-gray-500">
                  {checkoutMode === 'credit' ? 'Add extra messages as needed' : 'Secure payment gateway'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {/* CREDIT MODE: Show plans with edit controls (add/remove messages) */}
                {checkoutMode === 'credit' && (
                  <div className="space-y-4">
                    {creditPlans.map((plan) => {
                      const PlanIcon = plan.icon;
                      const additionalMessages = creditExtraMessages[plan.id] || 0;
                      const { totalMessages, totalPrice, additionalCost } = calculateTotalForCreditPlan(plan, additionalMessages);
                      const isSelected = selectedCreditPlan === plan.id;
                      
                      return (
                        <div
                          key={plan.id}
                          className={`relative rounded-xl border-2 transition-all ${
                            isSelected
                              ? `border-green-500 bg-gradient-to-br ${plan.color} bg-opacity-5`
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="p-4 cursor-pointer" onClick={() => handleSelectCreditPlan(plan.id)}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
                                  <PlanIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                                    {plan.popular && (
                                      <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Base: {plan.messages.toLocaleString()} messages
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
                                <p className="text-xs text-gray-500">${plan.perMessageRate.toFixed(4)}/msg</p>
                              </div>
                            </div>

                            {additionalMessages > 0 && (
                              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Base Package:</span>
                                  <span className="font-medium">{plan.messages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-gray-600">Extra Messages:</span>
                                  <span className="font-medium text-green-600">+{additionalMessages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1 pt-1 border-t border-green-200">
                                  <span className="font-semibold">Total:</span>
                                  <span className="font-bold">{totalMessages.toLocaleString()} messages</span>
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span className="text-gray-500">Extra cost:</span>
                                  <span className="text-green-600">+${additionalCost.toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* EDIT CONTROLS - Only in credit mode */}
                          <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMessages(plan.id)}
                                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                  disabled={additionalMessages === 0}
                                >
                                  <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={additionalMessages}
                                    onChange={(e) => handleCustomQuantityChange(plan.id, e.target.value)}
                                    className="w-32 px-3 py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    step={plan.minAdd}
                                    min="0"
                                  />
                                  <Edit2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddMessages(plan.id)}
                                  className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-green-600" />
                                </button>
                              </div>
                              <div className="text-sm text-gray-500">
                                +{plan.minAdd.toLocaleString()} msg
                              </div>
                              {isSelected && (
                                <div className="ml-auto">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              Each click adds {plan.minAdd.toLocaleString()} messages (${(plan.minAdd * plan.perMessageRate).toFixed(2)})
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* PLAN MODE: Just show selected plan (NO edit controls) */}
                {checkoutMode === 'plan' && selectedPlanData && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{selectedPlanData.planName}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedPlanData.planType} • {selectedPlanData.billingCycle}
                        </p>
                        {selectedPlanData.messages && (
                          <p className="text-xs text-green-600 mt-1">{selectedPlanData.messages}</p>
                        )}
                        {selectedPlanData.features && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {selectedPlanData.features.slice(0, 2).map((f, i) => (
                              <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">✓ {f}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">${parseFloat(selectedPlanData.amount).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">Total amount</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <p className="text-xs text-gray-500 text-center">
                        ⚡ This plan cannot be modified. Add extra credits separately if needed.
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Method Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
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
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <method.icon className="w-4 h-4" />
                        <span className="text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                      <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName}</p>}
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <input type="text" name="upiId" placeholder="UPI ID (e.g., name@okhdfcbank)" value={formData.upiId} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  )}

                  {formData.paymentMethod === 'bank' && (
                    <div className="space-y-3">
                      <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.amount}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay $${parseFloat(formData.amount || 0).toFixed(2)}`
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL encrypted payment</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-5 text-white">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm opacity-90">Wallet Balance</span>
                <Wallet className="w-5 h-5 opacity-90" />
              </div>
              <div className="text-3xl font-bold">
                ${parseFloat(localStorage.getItem('wallet_balance') || '0').toFixed(2)}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">${parseFloat(formData.amount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-green-600">${parseFloat(formData.amount || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Secure Payment
              </h3>
              <div className="space-y-2 text-xs text-gray-500">
                <p>✓ PCI DSS compliant</p>
                <p>✓ 256-bit encryption</p>
                <p>✓ Instant wallet top-up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCheckout;
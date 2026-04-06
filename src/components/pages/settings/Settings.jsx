// import { User, CreditCard, Shield, Save, Download, Calendar, TrendingUp, Zap, Star, CheckCircle, Clock, AlertCircle, MessageCircle, Mail, Briefcase, Rocket, ChevronDown, ChevronUp, Lock, Smartphone, Monitor, Globe } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';

// export default function Settings() {
// const [showNewPassword, setShowNewPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [activeTab, setActiveTab] =useState('profile');
//   const currentYear = new Date().getFullYear();
//   const [profileData, setProfileData] = useState({
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     phone: '+1 555-123-4567',
//     company: 'Acme Inc.',
//     position: 'Product Manager',
//     location: 'New York, USA',
//     bio: 'Product manager with 5+ years of experience in SaaS'
//   });
//   const [securitySettings, setSecuritySettings] = useState({
//     twoFactorAuth: false,
//     sessionTimeout: '30',
//     ipWhitelisting: false
//   });

//   // Password change state
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: 'Enter password', color: 'gray' });
//   const [passwordChecks, setPasswordChecks] = useState({
//     length: false,
//     case: false,
//     number: false,
//     special: false
//   });
//   const [passwordsMatch, setPasswordsMatch] = useState(true);
//   const [showPasswordUpdateSuccess, setShowPasswordUpdateSuccess] = useState(false);
//   const [showPasswordError, setShowPasswordError] = useState('');

//   // Active sessions state
//   const [sessions, setSessions] = useState([
//     { id: 1, device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session', isCurrent: true, icon: 'monitor', lastActive: 'Just now' },
//     { id: 2, device: 'Safari on Mac', location: 'California, USA', time: '2 hours ago', isCurrent: false, icon: 'monitor', lastActive: '2 hours ago' },
//     { id: 3, device: 'Firefox on Linux', location: 'London, UK', time: 'Yesterday', isCurrent: false, icon: 'globe', lastActive: 'Yesterday' },
//     { id: 4, device: 'Edge on iPhone', location: 'Tokyo, Japan', time: '3 days ago', isCurrent: false, icon: 'smartphone', lastActive: '3 days ago' }
//   ]);

//   // Billing state
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [isYearOpen, setIsYearOpen] = useState(false);
//   const [selectedWhatsAppPlan, setSelectedWhatsAppPlan] = useState('pro');
//   const [selectedEmailPlan, setSelectedEmailPlan] = useState('business');
//   const [selectedCombinedPlan, setSelectedCombinedPlan] = useState('professional');
//   const [isYearly, setIsYearly] = useState(false);
//   const [showTransactionHistory, setShowTransactionHistory] = useState(false);

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'billing', label: 'Billing', icon: CreditCard },
//     { id: 'security', label: 'Security', icon: Shield },
//   ];

//   // Password strength checker
//   const checkPasswordStrength = (password) => {
//     const checks = {
//       length: password.length >= 8,
//       case: /[a-z]/.test(password) && /[A-Z]/.test(password),
//       number: /\d/.test(password),
//       special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//     };
    
//     setPasswordChecks(checks);
    
//     let score = 0;
//     if (checks.length) score++;
//     if (checks.case) score++;
//     if (checks.number) score++;
//     if (checks.special) score++;
    
//     let strengthText = '';
//     let color = '';
//     if (score === 0) {
//       strengthText = 'Enter password';
//       color = 'gray';
//     } else if (score <= 2) {
//       strengthText = 'Weak';
//       color = 'red';
//     } else if (score === 3) {
//       strengthText = 'Medium';
//       color = 'yellow';
//     } else if (score === 4) {
//       strengthText = 'Strong';
//       color = 'green';
//     }
    
//     setPasswordStrength({ score, text: strengthText, color });
//     return checks;
//   };

//   // Check if passwords match
//   const checkPasswordMatch = (newPass, confirmPass) => {
//     if (confirmPass && newPass !== confirmPass) {
//       setPasswordsMatch(false);
//       return false;
//     } else {
//       setPasswordsMatch(true);
//       return true;
//     }
//   };

//   // Handle password update
//   const handleUpdatePassword = () => {
//     if (!currentPassword) {
//       setShowPasswordError('Please enter your current password');
//       setTimeout(() => setShowPasswordError(''), 3000);
//       return;
//     }
    
//     const checks = checkPasswordStrength(newPassword);
//     if (!checks.length || !checks.case || !checks.number || !checks.special) {
//       setShowPasswordError('Please meet all password requirements');
//       setTimeout(() => setShowPasswordError(''), 3000);
//       return;
//     }
    
//     if (!checkPasswordMatch(newPassword, confirmPassword)) {
//       setShowPasswordError('Passwords do not match');
//       setTimeout(() => setShowPasswordError(''), 3000);
//       return;
//     }
    
//     // Simulate API call
//     setShowPasswordUpdateSuccess(true);
//     setTimeout(() => setShowPasswordUpdateSuccess(false), 3000);
    
//     // Reset form
//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//     setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
//     setPasswordChecks({ length: false, case: false, number: false, special: false });
//   };

//   // Handle reset password form
//   const handleResetPasswordForm = () => {
//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//     setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
//     setPasswordChecks({ length: false, case: false, number: false, special: false });
//     setPasswordsMatch(true);
//     setShowPasswordError('');
//   };

//   // Handle logout from specific session
//   const handleLogoutSession = (sessionId) => {
//     setSessions(sessions.filter(s => s.id !== sessionId));
//     alert('Session terminated successfully');
//   };

//   // Handle logout from all devices
//   const handleLogoutAllDevices = () => {
//     if (confirm('Are you sure you want to logout from all devices? You will need to login again on all devices.')) {
//       setSessions(sessions.filter(s => s.isCurrent));
//       alert('Logged out from all other devices');
//     }
//   };

//   const getDeviceIcon = (iconType) => {
//     switch(iconType) {
//       case 'monitor':
//         return <Monitor className="w-4 h-4" />;
//       case 'smartphone':
//         return <Smartphone className="w-4 h-4" />;
//       case 'globe':
//         return <Globe className="w-4 h-4" />;
//       default:
//         return <Monitor className="w-4 h-4" />;
//     }
//   };

//   // WhatsApp Plans
//   const whatsappPlans = [
//     {
//       id: 'basic',
//       name: "WhatsApp Basic",
//       channel: "WhatsApp",
//       monthlyPrice: 49,
//       yearlyPrice: 490,
//       features: [
//         "10,000 WhatsApp messages/month",
//         "Basic automation",
//         "Template messages",
//         "24/7 support",
//         "Basic analytics"
//       ],
//       icon: MessageCircle,
//       color: "from-green-600 to-emerald-600",
//       popular: false
//     },
//     {
//       id: 'pro',
//       name: "WhatsApp Pro",
//       channel: "WhatsApp",
//       monthlyPrice: 99,
//       yearlyPrice: 990,
//       features: [
//         "50,000 WhatsApp messages/month",
//         "Advanced automation",
//         "Custom templates",
//         "Priority support",
//         "Advanced analytics",
//         "Broadcast lists",
//         "Click tracking"
//       ],
//       icon: MessageCircle,
//       color: "from-green-600 to-teal-600",
//       popular: true,
//       highlight: true
//     },
//     {
//       id: 'business',
//       name: "WhatsApp Business",
//       channel: "WhatsApp",
//       monthlyPrice: 199,
//       yearlyPrice: 1990,
//       features: [
//         "Unlimited WhatsApp messages",
//         "AI-powered automation",
//         "Dedicated account manager",
//         "Custom integrations",
//         "Real-time analytics",
//         "API access",
//         "SLA guarantee"
//       ],
//       icon: MessageCircle,
//       color: "from-emerald-600 to-green-700",
//       popular: false
//     },
//   ];

//   // Email Plans
//   const emailPlans = [
//     {
//       id: 'basic',
//       name: "Email Basic",
//       channel: "Email",
//       monthlyPrice: 29,
//       yearlyPrice: 290,
//       features: [
//         "50,000 emails/month",
//         "Email templates",
//         "Basic segmentation",
//         "Standard support",
//         "Basic reporting"
//       ],
//       icon: Mail,
//       color: "from-blue-600 to-indigo-600",
//       popular: false
//     },
//     {
//       id: 'pro',
//       name: "Email Pro",
//       channel: "Email",
//       monthlyPrice: 79,
//       yearlyPrice: 790,
//       features: [
//         "200,000 emails/month",
//         "Advanced templates",
//         "Advanced segmentation",
//         "Priority support",
//         "A/B testing",
//         "Automation workflows",
//         "Detailed analytics"
//       ],
//       icon: Mail,
//       color: "from-blue-600 to-purple-600",
//       popular: true
//     },
//     {
//       id: 'business',
//       name: "Email Business",
//       channel: "Email",
//       monthlyPrice: 149,
//       yearlyPrice: 1490,
//       features: [
//         "Unlimited emails",
//         "Custom templates",
//         "AI segmentation",
//         "Dedicated support",
//         "Advanced analytics",
//         "API access",
//         "Custom reporting"
//       ],
//       icon: Mail,
//       color: "from-indigo-600 to-purple-700",
//       popular: false,
//       highlight: true
//     },
//   ];

//   // Combined WhatsApp + Email Plans
//   const combinedPlans = [
//     {
//       id: 'starter',
//       name: "Starter Suite",
//       monthlyPrice: 69,
//       yearlyPrice: 690,
//       features: [
//         "WhatsApp: 10,000 messages",
//         "Email: 50,000 emails",
//         "Basic automation",
//         "Standard support",
//         "Basic analytics",
//         "Template library"
//       ],
//       icon: Briefcase,
//       color: "from-gray-600 to-gray-800",
//       popular: false
//     },
//     {
//       id: 'professional',
//       name: "Professional Suite",
//       monthlyPrice: 159,
//       yearlyPrice: 1590,
//       features: [
//         "WhatsApp: 50,000 messages",
//         "Email: 200,000 emails",
//         "Advanced automation",
//         "Priority support",
//         "Advanced analytics",
//         "A/B testing",
//         "API access",
//         "Custom integrations"
//       ],
//       icon: Rocket,
//       color: "from-purple-600 to-pink-600",
//       popular: true,
//       highlight: true
//     },
//     {
//       id: 'enterprise',
//       name: "Enterprise Suite",
//       monthlyPrice: 299,
//       yearlyPrice: 2990,
//       features: [
//         "WhatsApp: Unlimited",
//         "Email: Unlimited",
//         "AI-powered automation",
//         "Dedicated account manager",
//         "Real-time analytics",
//         "Custom reporting",
//         "SLA guarantee",
//         "24/7 priority support"
//       ],
//       icon: Star,
//       color: "from-amber-600 to-orange-600",
//       popular: false
//     },
//   ];

//   // Transaction data with month/year
//   const transactions = [
//     { id: 1, date: "2024-03-01", month: 3, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "paid", invoice: "INV-2024-001" },
//     { id: 2, date: "2024-03-01", month: 3, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "paid", invoice: "INV-2024-002" },
//     { id: 3, date: "2024-03-15", month: 3, year: 2024, type: "Combined", description: "Combined Suite - Professional", amount: "$159", status: "paid", invoice: "INV-2024-003" },
//     { id: 4, date: "2024-04-01", month: 4, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "paid", invoice: "INV-2024-004" },
//     { id: 5, date: "2024-04-01", month: 4, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "paid", invoice: "INV-2024-005" },
//     { id: 6, date: "2024-05-01", month: 5, year: 2024, type: "Combined", description: "Combined Suite - Professional", amount: "$159", status: "paid", invoice: "INV-2024-006" },
//     { id: 7, date: "2024-06-01", month: 6, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "pending", invoice: "INV-2024-007" },
//     { id: 8, date: "2024-06-01", month: 6, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "pending", invoice: "INV-2024-008" },
//   ];

//   // Filter transactions by month and year
//   const filteredTransactions = transactions.filter((t) => {
//     return t.month === selectedMonth && t.year === selectedYear;
//   });

//   const exportPDF = async () => {
//     try {
//       const { jsPDF } = await import("jspdf");
//       const doc = new jsPDF();
      
//       doc.setFontSize(20);
//       doc.setTextColor(59, 130, 246);
//       doc.text("Billing Report", 20, 20);
      
//       doc.setFontSize(10);
//       doc.setTextColor(100, 100, 100);
//       doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
//       doc.text(`Period: ${getMonthName(selectedMonth)} ${selectedYear}`, 20, 36);
      
//       doc.setFontSize(12);
//       doc.setTextColor(0, 0, 0);
//       doc.text(`Total Transactions: ${filteredTransactions.length}`, 20, 50);
      
//       const totalAmount = filteredTransactions.reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0);
//       doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, 56);
      
//       doc.setFontSize(14);
//       doc.text("Transaction Details", 20, 70);
      
//       let y = 80;
//       filteredTransactions.forEach((item) => {
//         if (y > 270) {
//           doc.addPage();
//           y = 20;
//         }
//         doc.setFontSize(10);
//         doc.text(`${item.date} - ${item.type} - ${item.description} - ${item.amount} - ${item.status}`, 20, y);
//         y += 8;
//       });
      
//       doc.save(`billing_report_${selectedMonth}_${selectedYear}.pdf`);
//       alert("Report exported successfully!");
//     } catch (error) {
//       console.error("Failed to export PDF:", error);
//       alert("Failed to export PDF. Please make sure jspdf is installed.\nRun: npm install jspdf");
//     }
//   };

//   const handleSaveProfile = () => {
//     console.log('Profile settings saved:', profileData);
//     alert('Profile settings saved successfully!');
//   };

//   const handleSecurityChange = (key, value) => {
//     setSecuritySettings({ ...securitySettings, [key]: value });
//     console.log('Security setting changed:', { key, value });
//   };

//   const handleSaveSecurity = () => {
//     console.log('Security settings saved:', securitySettings);
//     alert('Security settings saved successfully!');
//   };

//   const handlePlanSelection = (type, planId) => {
//     if (type === 'whatsapp') {
//       setSelectedWhatsAppPlan(planId);
//     } else if (type === 'email') {
//       setSelectedEmailPlan(planId);
//     } else if (type === 'combined') {
//       setSelectedCombinedPlan(planId);
//     }
//     const plan = type === 'whatsapp' 
//       ? whatsappPlans.find(p => p.id === planId)
//       : type === 'email'
//       ? emailPlans.find(p => p.id === planId)
//       : combinedPlans.find(p => p.id === planId);
//     alert(`You've selected the ${plan.name} plan! ${isYearly ? 'Yearly' : 'Monthly'} billing will be applied.`);
//   };

//   const getSavings = (monthlyPrice, yearlyPrice) => {
//     const savings = (monthlyPrice * 12) - yearlyPrice;
//     return Math.round((savings / (monthlyPrice * 12)) * 100);
//   };

//   const getMonthName = (month) => {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     return months[month - 1];
//   };

//   const PlanCard = ({ plan, type, isSelected, onSelect }) => {
//     const Icon = plan.icon;
//     const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
//     const savings = getSavings(plan.monthlyPrice, plan.yearlyPrice);
    
//     return (
//       <div
//         className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
//           plan.highlight
//             ? type === 'combined'
//               ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500 shadow-lg ring-2 ring-purple-400"
//               : type === 'whatsapp'
//               ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500 shadow-lg ring-2 ring-green-400"
//               : "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500 shadow-lg ring-2 ring-blue-400"
//             : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-purple-300"
//         } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
//       >
//         {plan.popular && (
//           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//             <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
//               Most Popular
//             </span>
//           </div>
//         )}
        
//         {/* Channel Badge */}
//         <div className="absolute top-4 right-4">
//           <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
//             type === 'whatsapp' 
//               ? 'bg-green-100 text-green-700' 
//               : type === 'email'
//               ? 'bg-blue-100 text-blue-700'
//               : 'bg-purple-100 text-purple-700'
//           }`}>
//             {type === 'whatsapp' && <MessageCircle className="w-3 h-3" />}
//             {type === 'email' && <Mail className="w-3 h-3" />}
//             {type === 'combined' && <Rocket className="w-3 h-3" />}
//             {type === 'whatsapp' ? 'WhatsApp' : type === 'email' ? 'Email' : 'Combined Suite'}
//           </span>
//         </div>
        
//         <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
        
//         <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
//         <div className="mt-4 mb-2">
//           <span className="text-3xl font-bold text-gray-900 dark:text-white">${currentPrice}</span>
//           <span className="text-gray-500 dark:text-gray-400">/{isYearly ? 'year' : 'month'}</span>
//         </div>
        
//         {isYearly && (
//           <p className="text-xs text-green-600 mb-2">
//             Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice)}/year ({savings}% off)
//           </p>
//         )}
        
//         <ul className="space-y-2 mt-4">
//           {plan.features.map((feature, idx) => (
//             <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//               <CheckCircle className="w-4 h-4 text-green-500" />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
        
//         <button
//           onClick={() => onSelect(plan.id)}
//           className={`mt-6 w-full py-2 rounded-lg transition-all duration-300 ${
//             isSelected
//               ? type === 'combined'
//                 ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
//                 : type === 'whatsapp'
//                 ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
//                 : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
//               : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//           }`}
//         >
//           {isSelected ? "Current Plan" : "Select Plan"}
//         </button>
//       </div>
//     );
//   };

//   // Close dropdowns when clicking outside
//   const handleClickOutside = (e) => {
//     if (isMonthOpen && !e.target.closest('.month-dropdown')) {
//       setIsMonthOpen(false);
//     }
//     if (isYearOpen && !e.target.closest('.year-dropdown')) {
//       setIsYearOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [isMonthOpen, isYearOpen]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
//           <h1 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//             Settings
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             Manage your account and preferences
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
//             <div className="space-y-1">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
//                       activeTab === tab.id
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
//                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="text-sm font-medium">{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
//             {/* Profile Settings */}
//             {activeTab === 'profile' && (
//               <div className="space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
//                 <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
//                   <div className="relative">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-medium shadow-lg">
//                       JD
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
//                       <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
//                       <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
//                       <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
//                       <input type="text" value={profileData.company} onChange={(e) => setProfileData({...profileData, company: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
//                       <input type="text" value={profileData.position} onChange={(e) => setProfileData({...profileData, position: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
//                       <input type="text" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
//                       <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows="3" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
//                     </div>
//                   </div>
//                   <button onClick={handleSaveProfile} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
//                     <Save className="w-4 h-4" />
//                     <span>Save Changes</span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Billing Settings */}
//             {activeTab === 'billing' && (
//               <div className="space-y-8" style={{animation: 'fadeIn 0.3s ease-out'}}>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-4">
//                   Billing & Subscription
//                 </h3>

//                 {/* Month/Year Filter Card with Custom Dropdowns */}
//                 <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-lg">
//                   <div className="flex flex-wrap gap-4 items-end justify-between">
//                     <div className="flex flex-wrap gap-4">
//                       {/* Month Dropdown */}
//                       <div className="month-dropdown">
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
//                           <Calendar className="w-4 h-4" />
//                           Month
//                         </label>
//                         <div className="relative w-44 mt-1">
//                           <div
//                             onClick={() => setIsMonthOpen(!isMonthOpen)}
//                             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer flex justify-between items-center hover:border-blue-400 transition-all duration-200"
//                           >
//                             <span className="text-gray-900 dark:text-white">{getMonthName(selectedMonth)}</span>
//                             <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMonthOpen ? 'rotate-180' : ''}`} />
//                           </div>

//                           {isMonthOpen && (
//                             <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//                               {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
//                                 <div
//                                   key={month}
//                                   onClick={() => {
//                                     setSelectedMonth(month);
//                                     setIsMonthOpen(false);
//                                   }}
//                                   className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 text-gray-900 dark:text-white"
//                                 >
//                                   {getMonthName(month)}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Year Dropdown */}
//                       <div className="year-dropdown">
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
//                           <Calendar className="w-4 h-4" />
//                           Year
//                         </label>
//                         <div className="relative w-32 mt-1">
//                           <div
//                             onClick={() => setIsYearOpen(!isYearOpen)}
//                             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer flex justify-between items-center hover:border-blue-400 transition-all duration-200"
//                           >
//                             <span className="text-gray-900 dark:text-white">{selectedYear}</span>
//                             <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isYearOpen ? 'rotate-180' : ''}`} />
//                           </div>

//                           {isYearOpen && (
//                             <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
//                               {Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i).map(year => (
//                                 <div
//                                   key={year}
//                                   onClick={() => {
//                                     setSelectedYear(year);
//                                     setIsYearOpen(false);
//                                   }}
//                                   className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 text-gray-900 dark:text-white"
//                                 >
//                                   {year}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={exportPDF}
//                       className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
//                     >
//                       <Download className="w-4 h-4" />
//                       Export Report
//                     </button>
//                   </div>
//                 </div>

//                 {/* Billing Toggle */}
//                 <div className="flex justify-center items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
//                   <span className={`text-sm font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>Monthly</span>
//                   <button
//                     onClick={() => setIsYearly(!isYearly)}
//                     className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gradient-to-r from-blue-600 to-purple-600"
//                   >
//                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
//                   </button>
//                   <span className={`text-sm font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
//                     Yearly <span className="text-green-600 text-xs ml-1">Save up to 20%</span>
//                   </span>
//                 </div>

//                 {/* Combined WhatsApp + Email Suite Section */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
//                       <Rocket className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Combined WhatsApp + Email Suite</h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Complete communication solution with both channels</p>
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-3 gap-6">
//                     {combinedPlans.map((plan) => (
//                       <PlanCard
//                         key={plan.id}
//                         plan={plan}
//                         type="combined"
//                         isSelected={selectedCombinedPlan === plan.id}
//                         onSelect={(planId) => handlePlanSelection('combined', planId)}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* WhatsApp Section */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-4 mt-8">
//                     <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                       <MessageCircle className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h4 className="text-xl font-semibold text-gray-900 dark:text-white">WhatsApp Business Suite</h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Standalone WhatsApp marketing solution</p>
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-3 gap-6">
//                     {whatsappPlans.map((plan) => (
//                       <PlanCard
//                         key={plan.id}
//                         plan={plan}
//                         type="whatsapp"
//                         isSelected={selectedWhatsAppPlan === plan.id}
//                         onSelect={(planId) => handlePlanSelection('whatsapp', planId)}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Email Section */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-4 mt-8">
//                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                       <Mail className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Email Marketing Suite</h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Standalone email marketing solution</p>
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-3 gap-6">
//                     {emailPlans.map((plan) => (
//                       <PlanCard
//                         key={plan.id}
//                         plan={plan}
//                         type="email"
//                         isSelected={selectedEmailPlan === plan.id}
//                         onSelect={(planId) => handlePlanSelection('email', planId)}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Combined Usage Summary */}
//                 <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200">
//                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Combined Usage Summary</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">WhatsApp Messages (This Month)</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">45,000 / 50,000</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
//                       </div>
//                       <div className="flex justify-between items-center mt-2">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Email Sent (This Month)</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">180,000 / 200,000</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Total (Separate Plans)</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">$248</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Combined Suite Price</span>
//                         <span className="font-semibold text-purple-600">$159</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</span>
//                         <span className="font-semibold text-green-600">$89 (36%)</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Yearly Savings</span>
//                         <span className="font-semibold text-green-600">$1,068 (36%)</span>
//                       </div>
//                       <button className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
//                         Switch to Combined Suite
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Collapsible Transaction History */}
//                 <div className="border rounded-xl overflow-hidden">
//                   <button
//                     onClick={() => setShowTransactionHistory(!showTransactionHistory)}
//                     className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//                       <span className="font-semibold text-gray-900 dark:text-white">Transaction History</span>
//                       <span className="text-sm text-gray-500 dark:text-gray-400">
//                         ({filteredTransactions.length} transactions for {getMonthName(selectedMonth)} {selectedYear})
//                       </span>
//                     </div>
//                     {showTransactionHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                   </button>
                  
//                   {showTransactionHistory && (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-50 dark:bg-gray-900 border-b">
//                           <tr>
//                             <th className="p-3 text-left text-gray-700 dark:text-gray-300">Date</th>
//                             <th className="p-3 text-left text-gray-700 dark:text-gray-300">Channel</th>
//                             <th className="p-3 text-left text-gray-700 dark:text-gray-300">Description</th>
//                             <th className="p-3 text-right text-gray-700 dark:text-gray-300">Amount</th>
//                             <th className="p-3 text-center text-gray-700 dark:text-gray-300">Status</th>
//                             <th className="p-3 text-center text-gray-700 dark:text-gray-300">Invoice</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {filteredTransactions.map((transaction) => (
//                             <tr key={transaction.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
//                               <td className="p-3 text-gray-900 dark:text-white">{transaction.date}</td>
//                               <td className="p-3">
//                                 <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
//                                   transaction.type === 'WhatsApp' 
//                                     ? 'bg-green-100 text-green-700' 
//                                     : transaction.type === 'Email'
//                                     ? 'bg-blue-100 text-blue-700'
//                                     : 'bg-purple-100 text-purple-700'
//                                 }`}>
//                                   {transaction.type === 'WhatsApp' && <MessageCircle className="w-3 h-3" />}
//                                   {transaction.type === 'Email' && <Mail className="w-3 h-3" />}
//                                   {transaction.type === 'Combined' && <Rocket className="w-3 h-3" />}
//                                   {transaction.type}
//                                 </span>
//                               </td>
//                               <td className="p-3 text-gray-600 dark:text-gray-400">{transaction.description}</td>
//                               <td className="p-3 text-right font-medium text-gray-900 dark:text-white">{transaction.amount}</td>
//                               <td className="p-3 text-center">
//                                 <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
//                                   transaction.status === 'paid' 
//                                     ? 'bg-green-100 text-green-700' 
//                                     : 'bg-yellow-100 text-yellow-700'
//                                 }`}>
//                                   {transaction.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
//                                   {transaction.status}
//                                 </span>
//                               </td>
//                               <td className="p-3 text-center">
//                                 <button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
//                                   {transaction.invoice}
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                           {filteredTransactions.length === 0 && (
//                             <tr>
//                               <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
//                                 <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                                 No transactions found for {getMonthName(selectedMonth)} {selectedYear}
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Security Settings - Enhanced with Change Password */}
//             {activeTab === 'security' && (
//               <div className="space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
//                   Security Settings
//                 </h3>
                
//                 <div className="space-y-4">
//                   {/* Two-Factor Authentication */}
//                   <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
//                     </div>
//                     <button
//                       onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
//                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                         securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
//                       }`}
//                     >
//                       <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                         securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
//                       }`} />
//                     </button>
//                   </div>

//                   {/* Session Timeout */}
//                   <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Session Timeout (minutes)
//                     </label>
//                     <select
//                       value={securitySettings.sessionTimeout}
//                       onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
//                       className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="15">15 minutes</option>
//                       <option value="30">30 minutes</option>
//                       <option value="60">1 hour</option>
//                       <option value="120">2 hours</option>
//                     </select>
//                   </div>

//                   {/* Change Password Section */}
//                   <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
//                     <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                       <div className="flex items-center gap-2">
//                         <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                           <Lock className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 dark:text-white">Change Password</h4>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-4 space-y-4">
//                       {showPasswordUpdateSuccess && (
//                         <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-green-700 dark:text-green-400 text-sm">
//                           Password updated successfully!
//                         </div>
//                       )}

//                       {showPasswordError && (
//                         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
//                           {showPasswordError}
//                         </div>
//                       )}

//                       {/* Current Password */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                           Current Password
//                         </label>
//                         <input
//                           type="password"
//                           value={currentPassword}
//                           onChange={(e) => setCurrentPassword(e.target.value)}
//                           className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>

//                       {/* New Password */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                           New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showNewPassword ? "text" : "password"}
//                             value={newPassword}
//                             onChange={(e) => {
//                               const value = e.target.value;
//                               setNewPassword(value);
//                               checkPasswordStrength(value);
//                               checkPasswordMatch(value, confirmPassword);
//                             }}
//                             className="w-full px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                           <span
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                           >
//                             👁
//                           </span>
//                         </div>

//                         {/* Strength UI */}
//                         <div className="mt-3 space-y-2">
//                           <div className="flex items-center gap-2">
//                             <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                               <div 
//                                 className={`h-full transition-all duration-300 rounded-full ${
//                                   passwordStrength.color === 'red' ? 'w-1/4 bg-red-500' :
//                                   passwordStrength.color === 'yellow' ? 'w-3/4 bg-yellow-500' :
//                                   passwordStrength.color === 'green' ? 'w-full bg-green-500' : 'w-0'
//                                 }`}
//                               ></div>
//                             </div>
//                             <span className={`text-xs ${
//                               passwordStrength.color === 'red' ? 'text-red-500' :
//                               passwordStrength.color === 'yellow' ? 'text-yellow-500' :
//                               passwordStrength.color === 'green' ? 'text-green-500' : 'text-gray-500'
//                             }`}>
//                               {passwordStrength.text}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Confirm Password */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                           Confirm New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             value={confirmPassword}
//                             onChange={(e) => {
//                               const value = e.target.value;
//                               setConfirmPassword(value);
//                               checkPasswordMatch(newPassword, value);
//                             }}
//                             className="w-full px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                           <span
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                           >
//                             👁
//                           </span>
//                         </div>
//                         {!passwordsMatch && confirmPassword && (
//                           <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
//                         )}
//                       </div>

//                       {/* Buttons */}
//                       <div className="flex gap-3">
//                         <button 
//                           onClick={handleUpdatePassword}
//                           className="flex-1 md:flex-none px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
//                         >
//                           Update Password
//                         </button>
//                         <button 
//                           onClick={handleResetPasswordForm}
//                           className="flex-1 md:flex-none px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Active Sessions */}
//                   <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
//                     <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                       <h4 className="font-semibold text-gray-900 dark:text-white">Active Sessions</h4>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage devices where you're logged in</p>
//                     </div>
                    
//                     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                       {sessions.map((session) => (
//                         <div key={session.id} className="p-4 flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className={`p-2 ${session.isCurrent ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'} rounded-lg`}>
//                               {getDeviceIcon(session.icon)}
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">{session.location} • {session.lastActive}</p>
//                             </div>
//                           </div>
//                           {!session.isCurrent ? 
//                             <button onClick={() => handleLogoutSession(session.id)} className="text-xs text-red-600 hover:text-red-700">
//                               Logout
//                             </button> :
//                             <span className="text-xs text-green-600">Active Now</span>
//                           }
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
//                       <button 
//                         onClick={handleLogoutAllDevices}
//                         className="text-sm text-red-600 hover:text-red-700 font-medium"
//                       >
//                         Logout from all devices
//                       </button>
//                     </div>
//                   </div>

//                   {/* Save Security Settings Button */}
//                   <button onClick={handleSaveSecurity} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
//                     <Save className="w-4 h-4" />
//                     <span>Save Security Settings</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



import { User, CreditCard, Shield, Save, Download, Calendar, TrendingUp, Zap, Star, CheckCircle, Clock, AlertCircle, MessageCircle, Mail, Briefcase, Rocket, ChevronDown, ChevronUp, Lock, Smartphone, Monitor, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [activeTab, setActiveTab] = useState('profile');
  const currentYear = new Date().getFullYear();
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    company: 'Acme Inc.',
    position: 'Product Manager',
    location: 'New York, USA',
    bio: 'Product manager with 5+ years of experience in SaaS'
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipWhitelisting: false
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: 'Enter password', color: 'gray' });
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    case: false,
    number: false,
    special: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordUpdateSuccess, setShowPasswordUpdateSuccess] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState('');

  // Active sessions state
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session', isCurrent: true, icon: 'monitor', lastActive: 'Just now' },
    { id: 2, device: 'Safari on Mac', location: 'California, USA', time: '2 hours ago', isCurrent: false, icon: 'monitor', lastActive: '2 hours ago' },
    { id: 3, device: 'Firefox on Linux', location: 'London, UK', time: 'Yesterday', isCurrent: false, icon: 'globe', lastActive: 'Yesterday' },
    { id: 4, device: 'Edge on iPhone', location: 'Tokyo, Japan', time: '3 days ago', isCurrent: false, icon: 'smartphone', lastActive: '3 days ago' }
  ]);

  // Billing state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedWhatsAppPlan, setSelectedWhatsAppPlan] = useState('pro');
  const [selectedEmailPlan, setSelectedEmailPlan] = useState('business');
  const [selectedCombinedPlan, setSelectedCombinedPlan] = useState('professional');
  const [isYearly, setIsYearly] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  // Function to handle checkout navigation with plan details
  const handleProceedToCheckout = (planType, planDetails, billingCycle) => {
    const checkoutData = {
      planType: planType, // 'whatsapp', 'email', 'combined'
      planId: planDetails.id,
      planName: planDetails.name,
      amount: billingCycle === 'yearly' ? planDetails.yearlyPrice : planDetails.monthlyPrice,
      billingCycle: billingCycle,
      features: planDetails.features,
      channel: planDetails.channel || (planType === 'combined' ? 'Combined Suite' : planType === 'whatsapp' ? 'WhatsApp' : 'Email')
    };
    
    // Store in localStorage to persist across navigation
    localStorage.setItem('selectedPlan', JSON.stringify(checkoutData));
    navigate('/checkout');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      case: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordChecks(checks);
    
    let score = 0;
    if (checks.length) score++;
    if (checks.case) score++;
    if (checks.number) score++;
    if (checks.special) score++;
    
    let strengthText = '';
    let color = '';
    if (score === 0) {
      strengthText = 'Enter password';
      color = 'gray';
    } else if (score <= 2) {
      strengthText = 'Weak';
      color = 'red';
    } else if (score === 3) {
      strengthText = 'Medium';
      color = 'yellow';
    } else if (score === 4) {
      strengthText = 'Strong';
      color = 'green';
    }
    
    setPasswordStrength({ score, text: strengthText, color });
    return checks;
  };

  // Check if passwords match
  const checkPasswordMatch = (newPass, confirmPass) => {
    if (confirmPass && newPass !== confirmPass) {
      setPasswordsMatch(false);
      return false;
    } else {
      setPasswordsMatch(true);
      return true;
    }
  };

  // Handle password update
  const handleUpdatePassword = () => {
    if (!currentPassword) {
      setShowPasswordError('Please enter your current password');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    const checks = checkPasswordStrength(newPassword);
    if (!checks.length || !checks.case || !checks.number || !checks.special) {
      setShowPasswordError('Please meet all password requirements');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    if (!checkPasswordMatch(newPassword, confirmPassword)) {
      setShowPasswordError('Passwords do not match');
      setTimeout(() => setShowPasswordError(''), 3000);
      return;
    }
    
    // Simulate API call
    setShowPasswordUpdateSuccess(true);
    setTimeout(() => setShowPasswordUpdateSuccess(false), 3000);
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
    setPasswordChecks({ length: false, case: false, number: false, special: false });
  };

  // Handle reset password form
  const handleResetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStrength({ score: 0, text: 'Enter password', color: 'gray' });
    setPasswordChecks({ length: false, case: false, number: false, special: false });
    setPasswordsMatch(true);
    setShowPasswordError('');
  };

  // Handle logout from specific session
  const handleLogoutSession = (sessionId) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    alert('Session terminated successfully');
  };

  // Handle logout from all devices
  const handleLogoutAllDevices = () => {
    if (confirm('Are you sure you want to logout from all devices? You will need to login again on all devices.')) {
      setSessions(sessions.filter(s => s.isCurrent));
      alert('Logged out from all other devices');
    }
  };

  const getDeviceIcon = (iconType) => {
    switch(iconType) {
      case 'monitor':
        return <Monitor className="w-4 h-4" />;
      case 'smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'globe':
        return <Globe className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  // WhatsApp Plans
  const whatsappPlans = [
    {
      id: 'basic',
      name: "WhatsApp Basic",
      channel: "WhatsApp",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "10,000 WhatsApp messages/month",
        "Basic automation",
        "Template messages",
        "24/7 support",
        "Basic analytics"
      ],
      icon: MessageCircle,
      color: "from-green-600 to-emerald-600",
      popular: false
    },
    {
      id: 'pro',
      name: "WhatsApp Pro",
      channel: "WhatsApp",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "50,000 WhatsApp messages/month",
        "Advanced automation",
        "Custom templates",
        "Priority support",
        "Advanced analytics",
        "Broadcast lists",
        "Click tracking"
      ],
      icon: MessageCircle,
      color: "from-green-600 to-teal-600",
      popular: true,
      highlight: true
    },
    {
      id: 'business',
      name: "WhatsApp Business",
      channel: "WhatsApp",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Unlimited WhatsApp messages",
        "AI-powered automation",
        "Dedicated account manager",
        "Custom integrations",
        "Real-time analytics",
        "API access",
        "SLA guarantee"
      ],
      icon: MessageCircle,
      color: "from-emerald-600 to-green-700",
      popular: false
    },
  ];

  // Email Plans
  const emailPlans = [
    {
      id: 'basic',
      name: "Email Basic",
      channel: "Email",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "50,000 emails/month",
        "Email templates",
        "Basic segmentation",
        "Standard support",
        "Basic reporting"
      ],
      icon: Mail,
      color: "from-blue-600 to-indigo-600",
      popular: false
    },
    {
      id: 'pro',
      name: "Email Pro",
      channel: "Email",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "200,000 emails/month",
        "Advanced templates",
        "Advanced segmentation",
        "Priority support",
        "A/B testing",
        "Automation workflows",
        "Detailed analytics"
      ],
      icon: Mail,
      color: "from-blue-600 to-purple-600",
      popular: true
    },
    {
      id: 'business',
      name: "Email Business",
      channel: "Email",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        "Unlimited emails",
        "Custom templates",
        "AI segmentation",
        "Dedicated support",
        "Advanced analytics",
        "API access",
        "Custom reporting"
      ],
      icon: Mail,
      color: "from-indigo-600 to-purple-700",
      popular: false,
      highlight: true
    },
  ];

  // Combined WhatsApp + Email Plans
  const combinedPlans = [
    {
      id: 'starter',
      name: "Starter Suite",
      monthlyPrice: 69,
      yearlyPrice: 690,
      features: [
        "WhatsApp: 10,000 messages",
        "Email: 50,000 emails",
        "Basic automation",
        "Standard support",
        "Basic analytics",
        "Template library"
      ],
      icon: Briefcase,
      color: "from-gray-600 to-gray-800",
      popular: false
    },
    {
      id: 'professional',
      name: "Professional Suite",
      monthlyPrice: 159,
      yearlyPrice: 1590,
      features: [
        "WhatsApp: 50,000 messages",
        "Email: 200,000 emails",
        "Advanced automation",
        "Priority support",
        "Advanced analytics",
        "A/B testing",
        "API access",
        "Custom integrations"
      ],
      icon: Rocket,
      color: "from-purple-600 to-pink-600",
      popular: true,
      highlight: true
    },
    {
      id: 'enterprise',
      name: "Enterprise Suite",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        "WhatsApp: Unlimited",
        "Email: Unlimited",
        "AI-powered automation",
        "Dedicated account manager",
        "Real-time analytics",
        "Custom reporting",
        "SLA guarantee",
        "24/7 priority support"
      ],
      icon: Star,
      color: "from-amber-600 to-orange-600",
      popular: false
    },
  ];

  // Transaction data with month/year
  const transactions = [
    { id: 1, date: "2024-03-01", month: 3, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "paid", invoice: "INV-2024-001" },
    { id: 2, date: "2024-03-01", month: 3, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "paid", invoice: "INV-2024-002" },
    { id: 3, date: "2024-03-15", month: 3, year: 2024, type: "Combined", description: "Combined Suite - Professional", amount: "$159", status: "paid", invoice: "INV-2024-003" },
    { id: 4, date: "2024-04-01", month: 4, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "paid", invoice: "INV-2024-004" },
    { id: 5, date: "2024-04-01", month: 4, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "paid", invoice: "INV-2024-005" },
    { id: 6, date: "2024-05-01", month: 5, year: 2024, type: "Combined", description: "Combined Suite - Professional", amount: "$159", status: "paid", invoice: "INV-2024-006" },
    { id: 7, date: "2024-06-01", month: 6, year: 2024, type: "WhatsApp", description: "WhatsApp Pro - Monthly", amount: "$99", status: "pending", invoice: "INV-2024-007" },
    { id: 8, date: "2024-06-01", month: 6, year: 2024, type: "Email", description: "Email Business - Monthly", amount: "$149", status: "pending", invoice: "INV-2024-008" },
  ];

  // Filter transactions by month and year
  const filteredTransactions = transactions.filter((t) => {
    return t.month === selectedMonth && t.year === selectedYear;
  });

  const exportPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246);
      doc.text("Billing Report", 20, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      doc.text(`Period: ${getMonthName(selectedMonth)} ${selectedYear}`, 20, 36);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Transactions: ${filteredTransactions.length}`, 20, 50);
      
      const totalAmount = filteredTransactions.reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0);
      doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, 56);
      
      doc.setFontSize(14);
      doc.text("Transaction Details", 20, 70);
      
      let y = 80;
      filteredTransactions.forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(10);
        doc.text(`${item.date} - ${item.type} - ${item.description} - ${item.amount} - ${item.status}`, 20, y);
        y += 8;
      });
      
      doc.save(`billing_report_${selectedMonth}_${selectedYear}.pdf`);
      alert("Report exported successfully!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. Please make sure jspdf is installed.\nRun: npm install jspdf");
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile settings saved:', profileData);
    alert('Profile settings saved successfully!');
  };

  const handleSecurityChange = (key, value) => {
    setSecuritySettings({ ...securitySettings, [key]: value });
    console.log('Security setting changed:', { key, value });
  };

  const handleSaveSecurity = () => {
    console.log('Security settings saved:', securitySettings);
    alert('Security settings saved successfully!');
  };

  const handlePlanSelection = (type, planId) => {
    if (type === 'whatsapp') {
      setSelectedWhatsAppPlan(planId);
    } else if (type === 'email') {
      setSelectedEmailPlan(planId);
    } else if (type === 'combined') {
      setSelectedCombinedPlan(planId);
    }
  };

  const getSavings = (monthlyPrice, yearlyPrice) => {
    const savings = (monthlyPrice * 12) - yearlyPrice;
    return Math.round((savings / (monthlyPrice * 12)) * 100);
  };

  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  };

  const PlanCard = ({ plan, type, isSelected, onSelect, onCheckout }) => {
    const Icon = plan.icon;
    const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const savings = getSavings(plan.monthlyPrice, plan.yearlyPrice);
    
    return (
      <div
        className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
          plan.highlight
            ? type === 'combined'
              ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500 shadow-lg ring-2 ring-purple-400"
              : type === 'whatsapp'
              ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500 shadow-lg ring-2 ring-green-400"
              : "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500 shadow-lg ring-2 ring-blue-400"
            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-purple-300"
        } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
        )}
        
        {/* Channel Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
            type === 'whatsapp' 
              ? 'bg-green-100 text-green-700' 
              : type === 'email'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}>
            {type === 'whatsapp' && <MessageCircle className="w-3 h-3" />}
            {type === 'email' && <Mail className="w-3 h-3" />}
            {type === 'combined' && <Rocket className="w-3 h-3" />}
            {type === 'whatsapp' ? 'WhatsApp' : type === 'email' ? 'Email' : 'Combined Suite'}
          </span>
        </div>
        
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
        <div className="mt-4 mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${currentPrice}</span>
          <span className="text-gray-500 dark:text-gray-400">/{isYearly ? 'year' : 'month'}</span>
        </div>
        
        {isYearly && (
          <p className="text-xs text-green-600 mb-2">
            Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice)}/year ({savings}% off)
          </p>
        )}
        
        <ul className="space-y-2 mt-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 space-y-2">
          <button
            onClick={() => onSelect(plan.id)}
            className={`w-full py-2 rounded-lg transition-all duration-300 ${
              isSelected
                ? type === 'combined'
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                  : type === 'whatsapp'
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {isSelected ? "Selected" : "Select Plan"}
          </button>
          <button
            onClick={() => onCheckout(plan)}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Buy Now →
          </button>
        </div>
      </div>
    );
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (e) => {
    if (isMonthOpen && !e.target.closest('.month-dropdown')) {
      setIsMonthOpen(false);
    }
    if (isYearOpen && !e.target.closest('.year-dropdown')) {
      setIsYearOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMonthOpen, isYearOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-medium shadow-lg">
                      JD
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                      <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                      <input type="text" value={profileData.company} onChange={(e) => setProfileData({...profileData, company: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                      <input type="text" value={profileData.position} onChange={(e) => setProfileData({...profileData, position: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                      <input type="text" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                      <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows="3" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                    </div>
                  </div>
                  <button onClick={handleSaveProfile} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div className="space-y-8" style={{animation: 'fadeIn 0.3s ease-out'}}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-4">
                  Billing & Subscription
                </h3>

                {/* Month/Year Filter Card with Custom Dropdowns */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 shadow-lg">
                  <div className="flex flex-wrap gap-4 items-end justify-between">
                    <div className="flex flex-wrap gap-4">
                      {/* Month Dropdown */}
                      <div className="month-dropdown">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Month
                        </label>
                        <div className="relative w-44 mt-1">
                          <div
                            onClick={() => setIsMonthOpen(!isMonthOpen)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer flex justify-between items-center hover:border-blue-400 transition-all duration-200"
                          >
                            <span className="text-gray-900 dark:text-white">{getMonthName(selectedMonth)}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMonthOpen ? 'rotate-180' : ''}`} />
                          </div>

                          {isMonthOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <div
                                  key={month}
                                  onClick={() => {
                                    setSelectedMonth(month);
                                    setIsMonthOpen(false);
                                  }}
                                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 text-gray-900 dark:text-white"
                                >
                                  {getMonthName(month)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Year Dropdown */}
                      <div className="year-dropdown">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Year
                        </label>
                        <div className="relative w-32 mt-1">
                          <div
                            onClick={() => setIsYearOpen(!isYearOpen)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer flex justify-between items-center hover:border-blue-400 transition-all duration-200"
                          >
                            <span className="text-gray-900 dark:text-white">{selectedYear}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isYearOpen ? 'rotate-180' : ''}`} />
                          </div>

                          {isYearOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                              {Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i).map(year => (
                                <div
                                  key={year}
                                  onClick={() => {
                                    setSelectedYear(year);
                                    setIsYearOpen(false);
                                  }}
                                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 text-gray-900 dark:text-white"
                                >
                                  {year}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={exportPDF}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
                  <span className={`text-sm font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>Monthly</span>
                  <button
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-sm font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                    Yearly <span className="text-green-600 text-xs ml-1">Save up to 20%</span>
                  </span>
                </div>

                {/* Combined WhatsApp + Email Suite Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Combined WhatsApp + Email Suite</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Complete communication solution with both channels</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {combinedPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        type="combined"
                        isSelected={selectedCombinedPlan === plan.id}
                        onSelect={(planId) => handlePlanSelection('combined', planId)}
                        onCheckout={(plan) => handleProceedToCheckout('combined', plan, isYearly ? 'yearly' : 'monthly')}
                      />
                    ))}
                  </div>
                </div>

                {/* WhatsApp Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4 mt-8">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">WhatsApp Business Suite</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Standalone WhatsApp marketing solution</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {whatsappPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        type="whatsapp"
                        isSelected={selectedWhatsAppPlan === plan.id}
                        onSelect={(planId) => handlePlanSelection('whatsapp', planId)}
                        onCheckout={(plan) => handleProceedToCheckout('whatsapp', plan, isYearly ? 'yearly' : 'monthly')}
                      />
                    ))}
                  </div>
                </div>

                {/* Email Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4 mt-8">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Email Marketing Suite</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Standalone email marketing solution</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {emailPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        type="email"
                        isSelected={selectedEmailPlan === plan.id}
                        onSelect={(planId) => handlePlanSelection('email', planId)}
                        onCheckout={(plan) => handleProceedToCheckout('email', plan, isYearly ? 'yearly' : 'monthly')}
                      />
                    ))}
                  </div>
                </div>

                {/* Combined Usage Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Combined Usage Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">WhatsApp Messages (This Month)</span>
                        <span className="font-semibold text-gray-900 dark:text-white">45,000 / 50,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Email Sent (This Month)</span>
                        <span className="font-semibold text-gray-900 dark:text-white">180,000 / 200,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Total (Separate Plans)</span>
                        <span className="font-semibold text-gray-900 dark:text-white">$248</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Combined Suite Price</span>
                        <span className="font-semibold text-purple-600">$159</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</span>
                        <span className="font-semibold text-green-600">$89 (36%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Yearly Savings</span>
                        <span className="font-semibold text-green-600">$1,068 (36%)</span>
                      </div>
                      <button className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                        Switch to Combined Suite
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Transaction History */}
                <div className="border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowTransactionHistory(!showTransactionHistory)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Transaction History</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({filteredTransactions.length} transactions for {getMonthName(selectedMonth)} {selectedYear})
                      </span>
                    </div>
                    {showTransactionHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  {showTransactionHistory && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b">
                          <tr>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300">Date</th>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300">Channel</th>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300">Description</th>
                            <th className="p-3 text-right text-gray-700 dark:text-gray-300">Amount</th>
                            <th className="p-3 text-center text-gray-700 dark:text-gray-300">Status</th>
                            <th className="p-3 text-center text-gray-700 dark:text-gray-300">Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <td className="p-3 text-gray-900 dark:text-white">{transaction.date}</td>
                              <td className="p-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                  transaction.type === 'WhatsApp' 
                                    ? 'bg-green-100 text-green-700' 
                                    : transaction.type === 'Email'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-purple-100 text-purple-700'
                                }`}>
                                  {transaction.type === 'WhatsApp' && <MessageCircle className="w-3 h-3" />}
                                  {transaction.type === 'Email' && <Mail className="w-3 h-3" />}
                                  {transaction.type === 'Combined' && <Rocket className="w-3 h-3" />}
                                  {transaction.type}
                                </span>
                              </td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{transaction.description}</td>
                              <td className="p-3 text-right font-medium text-gray-900 dark:text-white">{transaction.amount}</td>
                              <td className="p-3 text-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                  transaction.status === 'paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {transaction.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
                                  {transaction.invoice}
                                </button>
                              </td>
                            </tr>
                          ))}
                          {filteredTransactions.length === 0 && (
                            <tr>
                              <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                No transactions found for {getMonthName(selectedMonth)} {selectedYear}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Settings - Enhanced with Change Password */}
            {activeTab === 'security' && (
              <div className="space-y-6" style={{animation: 'fadeIn 0.3s ease-out'}}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                  Security Settings
                </h3>
                
                <div className="space-y-4">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                    <button
                      onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {/* Session Timeout */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  {/* Change Password Section */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Lock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Change Password</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {showPasswordUpdateSuccess && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-green-700 dark:text-green-400 text-sm">
                          Password updated successfully!
                        </div>
                      )}

                      {showPasswordError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
                          {showPasswordError}
                        </div>
                      )}

                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                              const value = e.target.value;
                              setNewPassword(value);
                              checkPasswordStrength(value);
                              checkPasswordMatch(value, confirmPassword);
                            }}
                            className="w-full px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                          >
                            👁
                          </span>
                        </div>

                        {/* Strength UI */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 rounded-full ${
                                  passwordStrength.color === 'red' ? 'w-1/4 bg-red-500' :
                                  passwordStrength.color === 'yellow' ? 'w-3/4 bg-yellow-500' :
                                  passwordStrength.color === 'green' ? 'w-full bg-green-500' : 'w-0'
                                }`}
                              ></div>
                            </div>
                            <span className={`text-xs ${
                              passwordStrength.color === 'red' ? 'text-red-500' :
                              passwordStrength.color === 'yellow' ? 'text-yellow-500' :
                              passwordStrength.color === 'green' ? 'text-green-500' : 'text-gray-500'
                            }`}>
                              {passwordStrength.text}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              const value = e.target.value;
                              setConfirmPassword(value);
                              checkPasswordMatch(newPassword, value);
                            }}
                            className="w-full px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                          >
                            👁
                          </span>
                        </div>
                        {!passwordsMatch && confirmPassword && (
                          <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button 
                          onClick={handleUpdatePassword}
                          className="flex-1 md:flex-none px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                        >
                          Update Password
                        </button>
                        <button 
                          onClick={handleResetPasswordForm}
                          className="flex-1 md:flex-none px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Active Sessions</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage devices where you're logged in</p>
                    </div>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {sessions.map((session) => (
                        <div key={session.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${session.isCurrent ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'} rounded-lg`}>
                              {getDeviceIcon(session.icon)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{session.location} • {session.lastActive}</p>
                            </div>
                          </div>
                          {!session.isCurrent ? 
                            <button onClick={() => handleLogoutSession(session.id)} className="text-xs text-red-600 hover:text-red-700">
                              Logout
                            </button> :
                            <span className="text-xs text-green-600">Active Now</span>
                          }
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={handleLogoutAllDevices}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Logout from all devices
                      </button>
                    </div>
                  </div>

                  {/* Save Security Settings Button */}
                  <button onClick={handleSaveSecurity} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Save className="w-4 h-4" />
                    <span>Save Security Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
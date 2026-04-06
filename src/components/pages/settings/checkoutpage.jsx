// import { useState } from "react";
// import {
//   Lock,
//   Shield,
//   CreditCard,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Users,
//   Gift,
//   Sparkles,
//   Award,
//   TrendingUp,
//   Zap,
//   Share2,
//   Briefcase,
//   Film,
//   MessageCircle
// } from "lucide-react";
// import Confetti from "react-confetti";

// // Vite uses import.meta.env
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://wrench-wise.com";

// export default function MechBootcampCheckoutPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     country: "IN",
//     source: "",
//     referralName: "",
//     referralEmail: "",
//     referralPhone: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "source" && value !== "Referral") {
//       setFormData((prev) => ({
//         ...prev, 
//         [name]: value,
//         referralName: "",
//         referralEmail: "",
//         referralPhone: "",
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     setPaymentStatus(null);

//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.source
//     ) {
//       setError("Please fill all required fields");
//       setIsSubmitting(false);
//       return;
//     }

//     if (formData.source === "Referral") {
//       if (!formData.referralName || !formData.referralEmail || !formData.referralPhone) {
//         setError("Please fill all referral details");
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     try {
//       const orderResponse = await fetch(`${BACKEND_URL}/api/pay/mech/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 8999, customer: formData }),
//       });

//       if (!orderResponse.ok) {
//         const text = await orderResponse.text();
//         throw new Error(`Server error ${orderResponse.status}: ${text.slice(0, 200)}`);
//       }

//       const orderData = await orderResponse.json();

//       if (!orderData.success) {
//         throw new Error(orderData.message || "Failed to create order");
//       }

//       if (!window.Razorpay) {
//         await new Promise((resolve, reject) => {
//           const script = document.createElement("script");
//           script.src = "https://checkout.razorpay.com/v1/checkout.js";
//           script.onload = resolve;
//           script.onerror = reject;
//           document.head.appendChild(script);
//         });
//       }

//       const options = {
//         key: RAZORPAY_KEY,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Master Thermal CFD with OpenFOAM",
//         description: "Complete Bootcamp Registration",
//         order_id: orderData.orderId,
//         handler: async (response) => {
//           const verifyResponse = await fetch(`${BACKEND_URL}/api/pay/mech/verify`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response),
//           });

//           const verifyData = await verifyResponse.json();

//           if (verifyData.success) {
//             setPaymentStatus("success");
//             setShowConfetti(true);
//             setTimeout(() => setShowConfetti(false), 8000);
//           } else {
//             setPaymentStatus("failure");
//           }
//           setIsSubmitting(false);
//         },
//         prefill: {
//           name: `${formData.firstName} ${formData.lastName}`,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#7C3AED" },
//         modal: {
//           ondismiss: () => {
//             setIsSubmitting(false);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       setError(error.message || "Payment failed. Please try again.");
//       setIsSubmitting(false);
//     }
//   };

//   const resetPayment = () => {
//     setPaymentStatus(null);
//     setShowConfetti(false);
//   };

//   const getSourceIcon = (source) => {
//     switch(source) {
//       case "Instagram": return <Share2 className="w-4 h-4" />;
//       case "LinkedIn": return <Briefcase className="w-4 h-4" />;
//       case "Facebook": return <Users className="w-4 h-4" />;
//       case "YouTube": return <Film className="w-4 h-4" />;
//       case "Referral": return <Gift className="w-4 h-4" />;
//       default: return <Users className="w-4 h-4" />;
//     }
//   };

//   const getSourceEmoji = (source) => {
//     switch(source) {
//       case "Instagram": return "📸";
//       case "LinkedIn": return "💼";
//       case "Facebook": return "👥";
//       case "YouTube": return "📺";
//       case "Referral": return "🎁";
//       default: return "📢";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       {showConfetti && (
//         <Confetti
//           recycle={false}
//           numberOfPieces={200}
//           gravity={0.1}
//           onConfettiComplete={() => setShowConfetti(false)}
//         />
//       )}

//       <div className="py-12 lg:py-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Payment Success Modal */}
//           {paymentStatus === "success" && (
//             <div className="fixed inset-0 z-50 overflow-y-auto">
//               <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
//                 <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up">
//                   <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-8 pt-10 pb-8 sm:p-10">
//                     <div className="flex flex-col items-center">
//                       <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 mb-6 animate-pulse">
//                         <CheckCircle className="h-16 w-16 text-white animate-bounce" />
//                       </div>
//                       <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
//                         🎉 Payment Successful!
//                       </h3>
//                       <div className="text-center mb-8">
//                         <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
//                           Congratulations,{" "}
//                           <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                             {formData.firstName}!
//                           </span>
//                         </p>
//                         <p className="text-gray-600 dark:text-gray-400">
//                           You are now enrolled in the Master Thermal CFD with OpenFOAM Bootcamp
//                         </p>
//                       </div>
//                       <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full mb-8 border border-green-200 dark:border-green-800 shadow-lg">
//                         <div className="space-y-3">
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                               <User className="w-4 h-4" /> Name:
//                             </span>
//                             <span className="font-semibold text-gray-900 dark:text-white">
//                               {formData.firstName} {formData.lastName}
//                             </span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                               <Mail className="w-4 h-4" /> Email:
//                             </span>
//                             <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" /> Amount Paid:
//                             </span>
//                             <span className="font-bold text-green-600 dark:text-green-400">₹8999</span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                               {getSourceIcon(formData.source)} Source:
//                             </span>
//                             <span className="font-semibold text-gray-900 dark:text-white">
//                               {getSourceEmoji(formData.source)} {formData.source}
//                             </span>
//                           </div>
//                           {formData.source === "Referral" && (
//                             <>
//                               <div className="border-t border-green-200 dark:border-green-800 my-2"></div>
//                               <div className="text-left">
//                                 <p className="text-gray-600 dark:text-gray-400 font-medium mb-2 flex items-center gap-2">
//                                   <Gift className="w-4 h-4" /> Referral Details:
//                                 </p>
//                                 <div className="space-y-1 ml-6">
//                                   <p className="text-sm text-gray-700 dark:text-gray-300">Name: {formData.referralName}</p>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300">Email: {formData.referralEmail}</p>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {formData.referralPhone}</p>
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                       <div className="w-full space-y-3">
//                         <button
//                           onClick={resetPayment}
//                           className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg"
//                         >
//                           Continue to Dashboard
//                         </button>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
//                           Check your email for enrollment details and access instructions
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Payment Failure Modal */}
//           {paymentStatus === "failure" && (
//             <div className="fixed inset-0 z-50 overflow-y-auto">
//               <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
//                 <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up">
//                   <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 px-8 pt-10 pb-8 sm:p-10">
//                     <div className="flex flex-col items-center">
//                       <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-red-400 to-rose-600 mb-6">
//                         <XCircle className="h-16 w-16 text-white animate-pulse" />
//                       </div>
//                       <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
//                         ⚠️ Payment Failed
//                       </h3>
//                       <div className="text-center mb-8">
//                         <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
//                           We couldn't process your payment
//                         </p>
//                         <p className="text-gray-600 dark:text-gray-400">
//                           Please check your payment details and try again
//                         </p>
//                       </div>
//                       <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full mb-8 border border-red-200 dark:border-red-800">
//                         <ul className="space-y-2 text-left">
//                           <li className="flex items-center text-gray-700 dark:text-gray-300">
//                             <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
//                             Check if your card details are correct
//                           </li>
//                           <li className="flex items-center text-gray-700 dark:text-gray-300">
//                             <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
//                             Ensure sufficient balance in your account
//                           </li>
//                           <li className="flex items-center text-gray-700 dark:text-gray-300">
//                             <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
//                             Try using a different payment method
//                           </li>
//                         </ul>
//                       </div>
//                       <div className="w-full space-y-3">
//                         <button
//                           onClick={resetPayment}
//                           className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg"
//                         >
//                           Try Payment Again
//                         </button>
//                         <button
//                           onClick={resetPayment}
//                           className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold transition"
//                         >
//                           Go Back to Form
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
//               <p className="text-red-700 dark:text-red-400 font-medium">⚠️ {error}</p>
//             </div>
//           )}

//           {/* Main Form - Hidden during payment status */}
//           {!paymentStatus && (
//             <>
//               {/* Pricing Card */}
//               <div className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-1 shadow-xl">
//                 <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
//                   <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                     <div>
//                       <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">Investment</p>
//                       <div className="flex items-baseline gap-2">
//                         <span className="text-4xl font-bold text-gray-900 dark:text-white">₹8,999</span>
//                         <span className="text-gray-500 dark:text-gray-400 line-through">₹15,999</span>
//                         <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-md text-sm font-semibold">
//                           Save 44%
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex gap-4">
//                       <div className="flex items-center gap-2">
//                         <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Career Growth</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Certification</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Live Projects</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Main Form Card */}
//               <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
//                 <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                     <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                     Secure Checkout Form
//                   </h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fill in your details to complete registration</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         First Name *
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           name="firstName"
//                           type="text"
//                           required
//                           value={formData.firstName}
//                           onChange={handleInputChange}
//                           className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                           placeholder="Enter your first name"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Last Name *
//                       </label>
//                       <input
//                         name="lastName"
//                         type="text"
//                         required
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                         placeholder="Enter your last name"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Email Address *
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           name="email"
//                           type="email"
//                           required
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                           placeholder="you@example.com"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Phone Number *
//                       </label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           name="phone"
//                           type="tel"
//                           required
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                           placeholder="+91 98765 43210"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Country *
//                     </label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <select
//                         name="country"
//                         required
//                         value={formData.country}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none"
//                       >
//                         <option value="IN">India</option>
//                         <option value="US">United States</option>
//                         <option value="UK">United Kingdom</option>
//                         <option value="CA">Canada</option>
//                         <option value="AU">Australia</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Source Section */}
//                   <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                       How did you hear about this bootcamp? *
//                     </label>
//                     <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                       {["Instagram", "LinkedIn", "Facebook", "YouTube", "Referral"].map((option) => (
//                         <label
//                           key={option}
//                           className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
//                             formData.source === option
//                               ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
//                               : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:shadow-md"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="source"
//                             value={option}
//                             checked={formData.source === option}
//                             onChange={handleInputChange}
//                             className="sr-only"
//                           />
//                           <span className="text-lg">{getSourceEmoji(option)}</span>
//                           <span className="text-sm font-medium">{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Referral Details */}
//                   {formData.source === "Referral" && (
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6 animate-fade-in">
//                       <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                           <Gift className="w-5 h-5 text-purple-600" />
//                           Referral Details
//                         </h3>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Referrer Name *
//                             </label>
//                             <input
//                               name="referralName"
//                               type="text"
//                               required={formData.source === "Referral"}
//                               value={formData.referralName}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                               placeholder="Enter referrer's full name"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Referrer Email *
//                             </label>
//                             <input
//                               name="referralEmail"
//                               type="email"
//                               required={formData.source === "Referral"}
//                               value={formData.referralEmail}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                               placeholder="referrer@example.com"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Referrer Phone *
//                             </label>
//                             <input
//                               name="referralPhone"
//                               type="tel"
//                               required={formData.source === "Referral"}
//                               value={formData.referralPhone}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                               placeholder="+91 98765 43210"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <div className="pt-4">
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                           Processing Payment...
//                         </>
//                       ) : (
//                         <>
//                           <Lock className="h-5 w-5 mr-2" />
//                           Complete Purchase - ₹8,999
//                         </>
//                       )}
//                     </button>

//                     {/* Security Info */}
//                     <div className="mt-6 text-center">
//                       <div className="flex items-center justify-center space-x-6">
//                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                           <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
//                           <span>256-bit SSL Secured</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                           <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                           <span>Razorpay Secure</span>
//                         </div>
//                       </div>
//                       <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
//                         Your payment information is encrypted and secure. We never store your card details.
//                       </p>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  Lock,
  Shield,
  CreditCard,
  Loader2,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  Gift,
  Sparkles,
  Award,
  TrendingUp,
  Zap,
  Share2,
  Briefcase,
  Film,
  MessageCircle,
  Rocket,
  Star
} from "lucide-react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";

// Vite uses import.meta.env
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://wrench-wise.com";

export default function MechBootcampCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get selected plan from localStorage (passed from Settings page)
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "IN",
    source: "",
    referralName: "",
    referralEmail: "",
    referralPhone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load selected plan from localStorage on component mount
  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    } else {
      // Fallback default plan if none selected
      setSelectedPlan({
        planType: 'combined',
        planId: 'professional',
        planName: 'Professional Suite',
        amount: 159,
        billingCycle: 'monthly',
        channel: 'Combined Suite',
        features: [
          "WhatsApp: 50,000 messages",
          "Email: 200,000 emails",
          "Advanced automation",
          "Priority support",
          "Advanced analytics"
        ]
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "source" && value !== "Referral") {
      setFormData((prev) => ({
        ...prev, 
        [name]: value,
        referralName: "",
        referralEmail: "",
        referralPhone: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setError("");
  };

  const getPlanIcon = () => {
    if (!selectedPlan) return <Rocket className="w-6 h-6" />;
    switch(selectedPlan.planType) {
      case 'whatsapp': return <MessageCircle className="w-6 h-6" />;
      case 'email': return <Mail className="w-6 h-6" />;
      case 'combined': return <Rocket className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  const getPlanColor = () => {
    if (!selectedPlan) return "from-purple-600 to-blue-600";
    switch(selectedPlan.planType) {
      case 'whatsapp': return "from-green-600 to-emerald-600";
      case 'email': return "from-blue-600 to-indigo-600";
      case 'combined': return "from-purple-600 to-pink-600";
      default: return "from-purple-600 to-blue-600";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setPaymentStatus(null);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.source
    ) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    if (formData.source === "Referral") {
      if (!formData.referralName || !formData.referralEmail || !formData.referralPhone) {
        setError("Please fill all referral details");
        setIsSubmitting(false);
        return;
      }
    }

    const amountToPay = selectedPlan ? selectedPlan.amount * 100 : 8999; // Convert to paise if needed, adjust based on your backend

    try {
      const orderResponse = await fetch(`${BACKEND_URL}/api/pay/mech/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amountToPay, 
          customer: formData,
          planDetails: selectedPlan 
        }),
      });

      if (!orderResponse.ok) {
        const text = await orderResponse.text();
        throw new Error(`Server error ${orderResponse.status}: ${text.slice(0, 200)}`);
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: selectedPlan ? selectedPlan.planName : "Master Thermal CFD with OpenFOAM",
        description: selectedPlan ? `${selectedPlan.channel} Plan - ${selectedPlan.billingCycle} billing` : "Complete Bootcamp Registration",
        order_id: orderData.orderId,
        handler: async (response) => {
          const verifyResponse = await fetch(`${BACKEND_URL}/api/pay/mech/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            setPaymentStatus("success");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
            // Clear the selected plan from storage after successful payment
            localStorage.removeItem('selectedPlan');
          } else {
            setPaymentStatus("failure");
          }
          setIsSubmitting(false);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#7C3AED" },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus(null);
    setShowConfetti(false);
  };

  const getSourceIcon = (source) => {
    switch(source) {
      case "Instagram": return <Share2 className="w-4 h-4" />;
      case "LinkedIn": return <Briefcase className="w-4 h-4" />;
      case "Facebook": return <Users className="w-4 h-4" />;
      case "YouTube": return <Film className="w-4 h-4" />;
      case "Referral": return <Gift className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getSourceEmoji = (source) => {
    switch(source) {
      case "Instagram": return "📸";
      case "LinkedIn": return "💼";
      case "Facebook": return "👥";
      case "YouTube": return "📺";
      case "Referral": return "🎁";
      default: return "📢";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Payment Success Modal */}
          {paymentStatus === "success" && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-8 pt-10 pb-8 sm:p-10">
                    <div className="flex flex-col items-center">
                      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 mb-6 animate-pulse">
                        <CheckCircle className="h-16 w-16 text-white animate-bounce" />
                      </div>
                      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                        🎉 Payment Successful!
                      </h3>
                      <div className="text-center mb-8">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                          Congratulations,{" "}
                          <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {formData.firstName}!
                          </span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          You have successfully purchased the {selectedPlan?.planName} plan
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full mb-8 border border-green-200 dark:border-green-800 shadow-lg">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <User className="w-4 h-4" /> Name:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formData.firstName} {formData.lastName}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <Mail className="w-4 h-4" /> Email:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" /> Plan:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">{selectedPlan?.planName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" /> Amount Paid:
                            </span>
                            <span className="font-bold text-green-600 dark:text-green-400">
                              ${selectedPlan?.amount} ({selectedPlan?.billingCycle})
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              {getSourceIcon(formData.source)} Source:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {getSourceEmoji(formData.source)} {formData.source}
                            </span>
                          </div>
                          {formData.source === "Referral" && (
                            <>
                              <div className="border-t border-green-200 dark:border-green-800 my-2"></div>
                              <div className="text-left">
                                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2 flex items-center gap-2">
                                  <Gift className="w-4 h-4" /> Referral Details:
                                </p>
                                <div className="space-y-1 ml-6">
                                  <p className="text-sm text-gray-700 dark:text-gray-300">Name: {formData.referralName}</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">Email: {formData.referralEmail}</p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">Phone: {formData.referralPhone}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-full space-y-3">
                        <button
                          onClick={resetPayment}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg"
                        >
                          Go to Dashboard
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                          Check your email for plan activation details and access instructions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Failure Modal */}
          {paymentStatus === "failure" && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up">
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 px-8 pt-10 pb-8 sm:p-10">
                    <div className="flex flex-col items-center">
                      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-red-400 to-rose-600 mb-6">
                        <XCircle className="h-16 w-16 text-white animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                        ⚠️ Payment Failed
                      </h3>
                      <div className="text-center mb-8">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                          We couldn't process your payment
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Please check your payment details and try again
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full mb-8 border border-red-200 dark:border-red-800">
                        <ul className="space-y-2 text-left">
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                            Check if your card details are correct
                          </li>
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                            Ensure sufficient balance in your account
                          </li>
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                            Try using a different payment method
                          </li>
                        </ul>
                      </div>
                      <div className="w-full space-y-3">
                        <button
                          onClick={resetPayment}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg"
                        >
                          Try Payment Again
                        </button>
                        <button
                          onClick={resetPayment}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold transition"
                        >
                          Go Back to Form
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
              <p className="text-red-700 dark:text-red-400 font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Main Form - Hidden during payment status */}
          {!paymentStatus && selectedPlan && (
            <>
              {/* Selected Plan Summary Card */}
              <div className={`mb-8 bg-gradient-to-r ${getPlanColor()} rounded-xl p-1 shadow-xl`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getPlanColor()} flex items-center justify-center`}>
                        {getPlanIcon()}
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">Selected Plan</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPlan.planName}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">({selectedPlan.channel})</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">${selectedPlan.amount}</span>
                        <span className="text-gray-500 dark:text-gray-400">/{selectedPlan.billingCycle}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Plan Features */}
                  {selectedPlan.features && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap gap-3">
                        {selectedPlan.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Form Card */}
              <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Complete Your Purchase
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fill in your details to activate your plan</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none"
                      >
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>

                  {/* Source Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      How did you hear about us? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {["Instagram", "LinkedIn", "Facebook", "YouTube", "Referral"].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                            formData.source === option
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                              : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:shadow-md"
                          }`}
                        >
                          <input
                            type="radio"
                            name="source"
                            value={option}
                            checked={formData.source === option}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="text-lg">{getSourceEmoji(option)}</span>
                          <span className="text-sm font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Referral Details */}
                  {formData.source === "Referral" && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 animate-fade-in">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <Gift className="w-5 h-5 text-purple-600" />
                          Referral Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Referrer Name *
                            </label>
                            <input
                              name="referralName"
                              type="text"
                              required={formData.source === "Referral"}
                              value={formData.referralName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                              placeholder="Enter referrer's full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Referrer Email *
                            </label>
                            <input
                              name="referralEmail"
                              type="email"
                              required={formData.source === "Referral"}
                              value={formData.referralEmail}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                              placeholder="referrer@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Referrer Phone *
                            </label>
                            <input
                              name="referralPhone"
                              type="tel"
                              required={formData.source === "Referral"}
                              value={formData.referralPhone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay ${selectedPlan.amount} ({selectedPlan.billingCycle})
                        </>
                      )}
                    </button>

                    {/* Security Info */}
                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span>256-bit SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>Razorpay Secure</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import toast from 'react-hot-toast';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// interface CheckoutPageProps {
//   searchParams: { id?: string };
// }

// export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState<any[]>([]);
//   const [payStatus, setPayStatus] = useState<any>({});

//   const router = useRouter();
//   const id = searchParams?.id;

//   useEffect(() => {
//     if (id) {
//       fetchPlan();
//       fetchPaymentSettings();
//     }
//   }, [id]);

//   const fetchPlan = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/${id}`);
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Plan fetch failed');
//       else setPlan(Array.isArray(data) ? data : [data]);
//     } catch (err) {
//       console.error(err);
//       toast.error('Plan fetch failed');
//     }
//   };

//   const fetchPaymentSettings = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentsettings`);
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Payment settings fetch failed');
//       else setPayStatus(data.settings);
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment settings fetch failed');
//     }
//   };

//   const handlePaypal = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/paypalpayment/${id}`, { method: 'POST' });
//       const data = await res.json();
//       if (data.approvalUrl) window.location.href = data.approvalUrl;
//       else toast.error('Payment failed');
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStripe = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/stripe/${id}`, { method: 'POST' });
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Payment failed');
//       else window.location.href = data.id;
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div
//         className="relative w-full h-64 md:h-96 bg-cover bg-center"
//         style={{ backgroundImage: 'url("/assets/images/jobportal/dee.jpg")' }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="absolute left-4 top-4 text-white">
//           <h6 className="text-sm md:text-base">Home &gt; Checkout</h6>
//           <h2 className="text-2xl md:text-4xl font-bold mt-2">Payment</h2>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
//         {/* Payment Gateways */}
//         <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-6">Choose Payment Gateway</h3>
//           <div className="flex flex-wrap gap-6">
//             {payStatus?.paypalStatus === 'true' && (
//               <button onClick={handlePaypal} className="border rounded-lg p-4 hover:shadow-lg transition">
//                 <Image src="/assets/images/jobportal/paypal.png" alt="PayPal" width={120} height={60} style={{ objectFit: 'contain' }} />
//               </button>
//             )}
//             {payStatus?.stripeStatus === 'true' && (
//               <button onClick={handleStripe} className="border rounded-lg p-4 hover:shadow-lg transition">
//                 <Image src="/assets/images/jobportal/stripe.png" alt="Stripe" width={120} height={60} style={{ objectFit: 'contain' }} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Plan Details */}
//         <div className="lg:w-1/2 flex flex-col gap-6">
//           {plan.map((item: any) => (
//             <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
//               <div className="p-6 border-b">
//                 <h5 className="text-xl font-semibold mb-2">{item.leble}</h5>
//                 {item.recommended && <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs">Recommended</span>}
//               </div>
//               <div className="p-6 text-center bg-indigo-500 text-white">
//                 <span className="text-3xl font-bold">${item.price}</span>
//               </div>
//               <ul className="p-6 space-y-2 text-gray-700">
//                 <li>Job Limit: {item.joblimit}</li>
//                 <li>Featured Job Limit: {item.featuredjoblimit}</li>
//                 <li>Highlight Job Limit: {item.highlightjoblimit}</li>
//                 <li>
//                   Recommended: {item.recommended ? <FaCheck className="inline text-blue-500 ml-2" /> : <FaTimes className="inline text-red-500 ml-2" />}
//                 </li>
//                 <li>
//                   Company Verified: {item.profileverify ? <FaCheck className="inline text-blue-500 ml-2" /> : <FaTimes className="inline text-red-500 ml-2" />}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }











// 'use client';

// import { useState, useEffect, use } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import toast from 'react-hot-toast';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// interface CheckoutPageProps {
//   searchParams: Promise<{ id?: string }> | { id?: string };
// }

// export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
//   // ✅ searchParams'i unwrap et (Promise ise çöz, değilse direkt kullan)
//   const resolvedSearchParams = use(searchParams);
//   const id = resolvedSearchParams?.id;
  
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState<any[]>([]);
//   const [payStatus, setPayStatus] = useState<any>({});

//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       fetchPlan();
//       fetchPaymentSettings();
//     }
//   }, [id]);

//   const fetchPlan = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/${id}`);
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Plan fetch failed');
//       else setPlan(Array.isArray(data) ? data : [data]);
//     } catch (err) {
//       console.error(err);
//       toast.error('Plan fetch failed');
//     }
//   };

//   const fetchPaymentSettings = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentsettings`);
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Payment settings fetch failed');
//       else setPayStatus(data.settings);
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment settings fetch failed');
//     }
//   };

//   const handlePaypal = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/paypalpayment/${id}`, { method: 'POST' });
//       const data = await res.json();
//       if (data.approvalUrl) window.location.href = data.approvalUrl;
//       else toast.error('Payment failed');
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStripe = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/stripe/${id}`, { method: 'POST' });
//       const data = await res.json();
//       if (!res.ok) toast.error(data.err || 'Payment failed');
//       else window.location.href = data.id;
//     } catch (err) {
//       console.error(err);
//       toast.error('Payment failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div
//         className="relative w-full h-64 md:h-96 bg-cover bg-center"
//         style={{ backgroundImage: 'url("/assets/images/jobportal/dee.jpg")' }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="absolute left-4 top-4 text-white">
//           <h6 className="text-sm md:text-base">Home &gt; Checkout</h6>
//           <h2 className="text-2xl md:text-4xl font-bold mt-2">Payment</h2>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
//         {/* Payment Gateways */}
//         <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-xl font-semibold mb-6">Choose Payment Gateway</h3>
//           <div className="flex flex-wrap gap-6">
//             {payStatus?.paypalStatus === 'true' && (
//               <button onClick={handlePaypal} className="border rounded-lg p-4 hover:shadow-lg transition">
//                 <Image src="/assets/images/jobportal/paypal.png" alt="PayPal" width={120} height={60} style={{ objectFit: 'contain' }} />
//               </button>
//             )}
//             {payStatus?.stripeStatus === 'true' && (
//               <button onClick={handleStripe} className="border rounded-lg p-4 hover:shadow-lg transition">
//                 <Image src="/assets/images/jobportal/stripe.png" alt="Stripe" width={120} height={60} style={{ objectFit: 'contain' }} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Plan Details */}
//         <div className="lg:w-1/2 flex flex-col gap-6">
//           {plan.map((item: any) => (
//             <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
//               <div className="p-6 border-b">
//                 <h5 className="text-xl font-semibold mb-2">{item.leble}</h5>
//                 {item.recommended && <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs">Recommended</span>}
//               </div>
//               <div className="p-6 text-center bg-indigo-500 text-white">
//                 <span className="text-3xl font-bold">${item.price}</span>
//               </div>
//               <ul className="p-6 space-y-2 text-gray-700">
//                 <li>Job Limit: {item.joblimit}</li>
//                 <li>Featured Job Limit: {item.featuredjoblimit}</li>
//                 <li>Highlight Job Limit: {item.highlightjoblimit}</li>
//                 <li>
//                   Recommended: {item.recommended ? <FaCheck className="inline text-blue-500 ml-2" /> : <FaTimes className="inline text-red-500 ml-2" />}
//                 </li>
//                 <li>
//                   Company Verified: {item.profileverify ? <FaCheck className="inline text-blue-500 ml-2" /> : <FaTimes className="inline text-red-500 ml-2" />}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes, FaPaypal, FaCreditCard } from 'react-icons/fa';

interface CheckoutPageProps {
  searchParams: Promise<{ id?: string }> | { id?: string };
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = use(searchParams);
  const id = resolvedSearchParams?.id;
  
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [paymentSettings, setPaymentSettings] = useState<any>({
    stripe: { enabled: false },
    paypal: { enabled: false }
  });
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      Promise.all([fetchPlan(), fetchPaymentSettings()]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/${id}`);
      const data = await res.json();
      if (!res.ok) toast.error(data.err || 'Plan fetch failed');
      else setPlan(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      console.error(err);
      toast.error('Plan fetch failed');
    }
  };

  const fetchPaymentSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentsettings`);
      const data = await res.json();
      if (!res.ok) {
        console.error('Payment settings fetch failed:', data.err);
      } else {
        // Mevcut yapıya göre ayarla
        setPaymentSettings(data.settings || { stripe: { enabled: false }, paypal: { enabled: false } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaypal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/paypalpayment/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.approvalUrl) window.location.href = data.approvalUrl;
      else toast.error('Payment failed');
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStripe = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/stripe/${id}`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) toast.error(data.err || 'Payment failed');
      else window.location.href = data.id;
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Payment gateway'lerin aktif olup olmadığını kontrol et
  const isPaypalEnabled = paymentSettings?.paypal?.enabled === true;
  const isStripeEnabled = paymentSettings?.stripe?.enabled === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-48 md:h-64">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h6 className="text-sm md:text-base opacity-80">Checkout</h6>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">Complete Your Payment</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Gateways */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h3>
            
            <div className="space-y-4">
              {/* PayPal */}
              {isPaypalEnabled && (
                <button
                  onClick={handlePaypal}
                  disabled={loading}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 disabled:opacity-50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition">
                      <FaPaypal className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">PayPal</h4>
                      <p className="text-sm text-gray-500">Pay securely with your PayPal account</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Stripe */}
              {isStripeEnabled && (
                <button
                  onClick={handleStripe}
                  disabled={loading}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 disabled:opacity-50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition">
                      <FaCreditCard className="w-6 h-6 text-purple-600 group-hover:text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">Credit Card</h4>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-purple-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )}

              {/* No Payment Methods */}
              {!isPaypalEnabled && !isStripeEnabled && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Payment Methods Available</h3>
                  <p className="text-gray-500">Please contact support to complete your purchase.</p>
                </div>
              )}
            </div>

            {/* Secure Payment Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            {plan && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h3 className="text-xl font-bold">Order Summary</h3>
                  <p className="text-blue-100 text-sm mt-1">Review your plan details</p>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{plan.leble}</h4>
                      {plan.recommended && (
                        <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full mt-1">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-800">${plan.price}</span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Job Limit:</span>
                      <span className="font-semibold">{plan.joblimit} jobs</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Featured Jobs:</span>
                      <span className="font-semibold">{plan.featuredjoblimit} per month</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Highlight Jobs:</span>
                      <span className="font-semibold">{plan.highlightjoblimit} per month</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Company Verification:</span>
                      {plan.profileverify ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>Total:</span>
                      <span className="text-xl">${plan.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Billed monthly. Cancel anytime.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
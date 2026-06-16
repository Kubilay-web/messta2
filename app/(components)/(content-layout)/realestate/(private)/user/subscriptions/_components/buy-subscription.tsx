// "use client";
// import { Button, message } from "antd";
// import React from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { GetStripeClientSecret } from "../../../../actions/payments";
// import CheckoutForm from "./checkout-form";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
// );

// function BuySubScription({ plan }: { plan: any }) {
//   const [clientSecret, setClientSecret] = React.useState<string>("");
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [showCheckoutForm, setShowCheckoutForm] =
//     React.useState<boolean>(false);

//   const getClientSecret = async () => {
//     try {
//       setLoading(true);
//       const response = await GetStripeClientSecret(plan.price);
//       if (response.error) throw new Error(response.error);
//       setClientSecret(response.clientSecret);
//       setShowCheckoutForm(true);
//     } catch (error: any) {
//       message.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <Button
//         block
//         disabled={plan.price === 0}
//         onClick={getClientSecret}
//         loading={loading}
//       >
//         Buy Now
//       </Button>

//       {clientSecret && showCheckoutForm && (
//         <Elements
//           stripe={stripePromise}
//           options={{
//             clientSecret: clientSecret,
//           }}
//         >
//           <CheckoutForm
//             showCheckoutForm={showCheckoutForm}
//             setShowCheckoutForm={setShowCheckoutForm}
//             plan={plan}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// }

// export default BuySubScription;







"use client";
import { Button, message } from "antd";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GetStripeClientSecret } from "../../../../actions/payments";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

interface BuySubscriptionProps {
  plan: any;
  disabled?: boolean;
}

function BuySubscription({ plan, disabled }: BuySubscriptionProps) {
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState<boolean>(false);

  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await GetStripeClientSecret(plan.price);
      if (response.error) throw new Error(response.error);
      setClientSecret(response.clientSecret);
      setShowCheckoutForm(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        block
        disabled={disabled || plan.price === 0 || loading}
        onClick={getClientSecret}
        loading={loading}
        style={{ backgroundColor: disabled ? "#d1d5db" : undefined }}
      >
        {disabled ? "Current Plan" : "Buy Now"}
      </Button>

      {clientSecret && showCheckoutForm && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            plan={plan}
          />
        </Elements>
      )}
    </div>
  );
}

export default BuySubscription;
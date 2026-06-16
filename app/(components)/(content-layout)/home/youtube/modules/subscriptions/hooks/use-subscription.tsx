// "use client";

// import { useSession } from "@/app/SessionProvider";
// import { useState } from "react";
// import { toast } from "sonner";


// interface UseSubscriptionProps {
//   userId: string;
//   isSubscribed: boolean;
//   fromVideoId?: string;
// }

// export const useSubscription = ({
//   userId,
//   isSubscribed,
//   fromVideoId,
// }: UseSubscriptionProps) => {
//   const { user } = useSession();
//   const [isPending, setIsPending] = useState(false);

//   const subscribe = async () => {
//     if (!user) {
//       toast.error("You must be logged in to subscribe");
//       return;
//     }

//     try {
//       setIsPending(true);

//       const res = await fetch("http://localhost:3000/api/video/subscriptions/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       if (!res.ok) throw new Error("Failed to subscribe");

//       toast.success("Subscribed");

//       // Opsiyonel: cache veya ilgili verileri yenile
//       if (fromVideoId) {
//         await fetch(`/api/videos/${fromVideoId}/invalidate`);
//       }
//       await fetch(`/api/users/${userId}/invalidate`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const unsubscribe = async () => {
//     if (!user) {
//       toast.error("You must be logged in to unsubscribe");
//       return;
//     }

//     try {
//       setIsPending(true);

//       const res = await fetch("/api/subscriptions/remove", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       if (!res.ok) throw new Error("Failed to unsubscribe");

//       toast.success("Unsubscribed");

//       // Opsiyonel: cache veya ilgili verileri yenile
//       if (fromVideoId) {
//         await fetch(`/api/videos/${fromVideoId}/invalidate`);
//       }
//       await fetch(`/api/users/${userId}/invalidate`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const onClick = () => {
//     if (isSubscribed) {
//       unsubscribe();
//     } else {
//       subscribe();
//     }
//   };

//   return { isPending, onClick };
// };

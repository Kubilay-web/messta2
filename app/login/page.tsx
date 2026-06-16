// "use client"
// import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { auth } from "@/shared/firebase/firebaseapi";
// import { useRouter } from "next/navigation";
// import nextConfig from '@/next.config';
// import Image from "next/image";
// import { ToastContainer, toast } from 'react-toastify';

// import Cover from "../(components)/(authentication-layout)/authentication/sign-in/cover/page";

// export default function Login() {

//     let { basePath } = nextConfig

//     const [passwordshow1, setpasswordshow1] = useState(false);

//     const [err, setError] = useState("");
//     const [err1, setError1] = useState("");
//     const [data, setData] = useState({
//         "email": "adminnextjs@gmail.com",
//         "password": "1234567890",
//     });
//     const { email, password } = data;
//     const changeHandler = (e: any) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//         setError("");
//     };
//     const Login = (e: React.FormEvent) => {
//         e.preventDefault();

//         auth.signInWithEmailAndPassword(email, password)
//           .then(user => {
//             console.log(user);

//             // Show success message
//             toast.success('Login successful', {
//                 position: 'top-right',
//                 autoClose: 1500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//               });
//               setTimeout(() => {
//                 RouteChange();
//               }, 1200);
//           })
//           .catch(err => {
//             setError(err.message);

//             // Show error message
//             toast.error('Invalid details', {
//                 position: 'top-right',
//                 autoClose: 1500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//               });
//           });
//       };

//       const Login1 = (_e: any) => {

//         if (data.email === "adminnextjs@gmail.com" && data.password === "1234567890") {
//             // Show toast immediately when login button is clicked
//             toast.success('Login successful', {
//                 position: 'top-right',
//                 autoClose: 1500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//               });
//           setTimeout(() => {
//             RouteChange(); // Navigate after toast delay
//           }, 2000);
//         } else {
//           setError1("The Auction details did not Match");
//           setData({
//             email: "adminnextjs@gmail.com",
//             password: "1234567890",
//           });

//             toast.error('Invalid login credentials', {
//               position: 'top-right',
//               autoClose: 1500,
//               hideProgressBar: false,
//               closeOnClick: true,

//               pauseOnHover: true,
//               draggable: true,
//             });
//         }
//       };
//     const router = useRouter();
//     const RouteChange = () => {
//         let path = "/home/facebook/pages/home";
//         router.push(path);
//     };

//     useEffect(() => {
//         const body = document.body.classList
//         body.add("authentication-background")

//         return () => {
//             body.remove("authentication-background")
//         };
//     });

//     return (
//         <div>
//             <div>
//                 <Cover/>
//                 <ToastContainer />

//             </div>
//         </div>
//     );
// }




// "use client";
// import { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
// import Cover from "../(components)/(authentication-layout)/authentication/sign-in/cover/page";

// export default function Login() {
//   useEffect(() => {
//     const body = document.body.classList;
//     body.add("authentication-background");

//     return () => {
//       body.remove("authentication-background");
//     };
//   });

//   return (
//     <div>
//       <div>
//         <Cover />
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }




import Cover from "../(components)/(authentication-layout)/authentication/sign-in/cover/page";
import { headers } from "next/headers";

export default async function Login() {
  const headersList = await headers();
  const host = headersList.get("x-host") || headersList.get("host") || "";

  return <Cover host={host} />;
}
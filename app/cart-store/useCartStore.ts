// // app/cart-store/useCartStore.ts
// import { CartProductType } from "@/app/lib/types";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AppliedCouponType {
//   couponId: string;
//   couponCode: string;
//   discountPercentage: number;
//   discountAmount: number;
//   expiryDate: string;
// }

// interface State {
//   cart: CartProductType[];
//   totalItems: number;
//   subtotal: number;
//   shippingFee: number;
//   totalPrice: number; // ← BU EKLENDİ
//   appliedCoupon: AppliedCouponType | null;
// }

// interface Actions {
//   addToCart: (item: CartProductType) => void;
//   updateProductQuantity: (product: CartProductType, quantity: number) => void;
//   removeMultipleFromCart: (items: CartProductType[]) => void;
//   removeFromCart: (item: CartProductType) => void;
//   emptyCart: () => void;
//   setCart: (newCart: CartProductType[]) => void;
//   setAppliedCoupon: (coupon: AppliedCouponType | null) => void;
//   removeCoupon: () => void;
//   setShippingFee: (fee: number) => void;
//   clearCart: () => void;

//   // Hesaplama fonksiyonları
//   calculateSubtotal: () => number;
//   calculateDiscount: () => number;
//   calculateTotal: () => number;
//   recalculateAll: () => void;
// }

// const INITIAL_STATE: State = {
//   cart: [],
//   totalItems: 0,
//   subtotal: 0,
//   shippingFee: 0,
//   totalPrice: 0, // ← BU EKLENDİ
//   appliedCoupon: null,
// };

// export const useCartStore = create(
//   persist<State & Actions>(
//     (set, get) => ({
//       cart: INITIAL_STATE.cart,
//       totalItems: INITIAL_STATE.totalItems,
//       subtotal: INITIAL_STATE.subtotal,
//       shippingFee: INITIAL_STATE.shippingFee,
//       totalPrice: INITIAL_STATE.totalPrice,
//       appliedCoupon: INITIAL_STATE.appliedCoupon,

//       // HESAPLAMA FONKSİYONLARI
//       calculateSubtotal: () => {
//         const cart = get().cart;
//         return cart.reduce(
//           (sum, item) => sum + (item.price * item.quantity),
//           0
//         );
//       },

//       calculateDiscount: () => {
//         const appliedCoupon = get().appliedCoupon;
//         return appliedCoupon ? appliedCoupon.discountAmount : 0;
//       },

//       calculateTotal: () => {
//         const subtotal = get().calculateSubtotal();
//         const discount = get().calculateDiscount();
//         const shippingFee = get().shippingFee;

//         // Total = Subtotal - Discount + Shipping
//         return Math.max(0, subtotal - discount + shippingFee);
//       },

//       recalculateAll: () => {
//         const subtotal = get().calculateSubtotal();
//         const total = get().calculateTotal();

//         set({
//           subtotal,
//           totalPrice: total
//         });
//       },

//       // CART İŞLEMLERİ
//       addToCart: (product: CartProductType) => {
//         if (!product) return;

//         const cart = get().cart;
//         const cartItem = cart.find(
//           (item) =>
//             item.productId === product.productId &&
//             item.variantId === product.variantId &&
//             item.sizeId === product.sizeId
//         );

//         if (cartItem) {
//           const updatedCart = cart.map((item) =>
//             item.productId === product.productId &&
//             item.variantId === product.variantId &&
//             item.sizeId === product.sizeId
//               ? {
//                   ...item,
//                   quantity: item.quantity + product.quantity,
//                   totalPrice: item.price * (item.quantity + product.quantity)
//                 }
//               : item
//           );

//           set(() => ({
//             cart: updatedCart,
//             totalItems: updatedCart.length,
//           }));

//           get().recalculateAll();
//         } else {
//           const newItem = {
//             ...product,
//             totalPrice: product.price * product.quantity
//           };

//           const updatedCart = [...cart, newItem];

//           set(() => ({
//             cart: updatedCart,
//             totalItems: updatedCart.length,
//           }));

//           get().recalculateAll();
//         }
//       },

//       updateProductQuantity: (product: CartProductType, quantity: number) => {
//         if (quantity <= 0) {
//           get().removeFromCart(product);
//           return;
//         }

//         const cart = get().cart;
//         const updatedCart = cart.map((item) =>
//           item.productId === product.productId &&
//           item.variantId === product.variantId &&
//           item.sizeId === product.sizeId
//             ? {
//                 ...item,
//                 quantity: quantity,
//                 totalPrice: item.price * quantity
//               }
//             : item
//         );

//         set(() => ({
//           cart: updatedCart,
//         }));

//         get().recalculateAll();
//       },

//       removeFromCart: (product: CartProductType) => {
//         const cart = get().cart;
//         const updatedCart = cart.filter(
//           (item) =>
//             !(
//               item.productId === product.productId &&
//               item.variantId === product.variantId &&
//               item.sizeId === product.sizeId
//             )
//         );

//         set(() => ({
//           cart: updatedCart,
//           totalItems: updatedCart.length,
//         }));

//         get().recalculateAll();
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//       },

//       removeMultipleFromCart: (products: CartProductType[]) => {
//         const cart = get().cart;
//         const updatedCart = cart.filter(
//           (item) =>
//             !products.some(
//               (product) =>
//                 product.productId === item.productId &&
//                 product.variantId === item.variantId &&
//                 product.sizeId === item.sizeId
//             )
//         );

//         set(() => ({
//           cart: updatedCart,
//           totalItems: updatedCart.length,
//         }));

//         get().recalculateAll();
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//       },

//       emptyCart: () => {
//         set(() => ({
//           cart: [],
//           totalItems: 0,
//           subtotal: 0,
//           shippingFee: 0,
//           totalPrice: 0,
//           appliedCoupon: null,
//         }));

//         localStorage.removeItem("cart");
//         localStorage.removeItem("appliedCoupon");
//         localStorage.removeItem("shippingFee");
//       },

//       setCart: (newCart: CartProductType[]) => {
//         const cartWithTotals = newCart.map(item => ({
//           ...item,
//           totalPrice: item.price * item.quantity
//         }));

//         const savedCoupon = localStorage.getItem("appliedCoupon");
//         const appliedCoupon = savedCoupon ? JSON.parse(savedCoupon) : null;

//         const savedShippingFee = localStorage.getItem("shippingFee");
//         const shippingFee = savedShippingFee ? parseFloat(savedShippingFee) : 0;

//         const subtotal = cartWithTotals.reduce(
//           (sum, item) => sum + (item.price * item.quantity),
//           0
//         );

//         const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
//         const totalPrice = Math.max(0, subtotal - discount + shippingFee);

//         set(() => ({
//           cart: cartWithTotals,
//           totalItems: cartWithTotals.length,
//           subtotal: subtotal,
//           shippingFee: shippingFee,
//           totalPrice: totalPrice,
//           appliedCoupon: appliedCoupon,
//         }));
//       },

//       setAppliedCoupon: (coupon: AppliedCouponType | null) => {
//         if (!coupon) {
//           set(() => ({
//             appliedCoupon: null,
//           }));

//           get().recalculateAll();
//           localStorage.removeItem("appliedCoupon");
//         } else {
//           set(() => ({
//             appliedCoupon: coupon,
//           }));

//           get().recalculateAll();
//           localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
//         }
//       },

//       removeCoupon: () => {
//         set(() => ({
//           appliedCoupon: null,
//         }));

//         get().recalculateAll();
//         localStorage.removeItem("appliedCoupon");
//       },

//       setShippingFee: (fee: number) => {
//         const feeValue = Math.max(0, fee);

//         set(() => ({
//           shippingFee: feeValue,
//         }));

//         get().recalculateAll();
//         localStorage.setItem("shippingFee", feeValue.toString());
//       },

//       clearCart: () => {
//         localStorage.removeItem("cart");
//         localStorage.removeItem("appliedCoupon");
//         localStorage.removeItem("shippingFee");
//         set({
//           cart: [],
//           totalItems: 0,
//           subtotal: 0,
//           shippingFee: 0,
//           totalPrice: 0,
//           appliedCoupon: null
//         });
//       },
//     }),
//     {
//       name: "cart-store",
//       partialize: (state) => ({
//         cart: state.cart,
//         totalItems: state.totalItems,
//         subtotal: state.subtotal,
//         shippingFee: state.shippingFee,
//         totalPrice: state.totalPrice,
//         appliedCoupon: state.appliedCoupon,
//       }),
//     }
//   )
// );







// app/cart-store/useCartStore.ts



// import { CartProductType } from "@/app/lib/types";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export interface AppliedCouponType {
//   couponId: string;
//   couponCode: string;
//   discountPercentage: number;
//   discountAmount: number;
//   expiryDate: string;
//   minPurchaseAmount?: number;
//   maxDiscountAmount?: number;
//   isActive: boolean;
//   appliedToCartTotal: boolean;
// }

// interface CartStoreState {
//   cart: CartProductType[];
//   subtotal: number;
//   shippingFee: number;
//   totalPrice: number;
//   appliedCoupon: AppliedCouponType | null;
//   couponApplied: boolean;
// }

// interface CartStoreActions {
//   addToCart: (item: CartProductType) => void;
//   updateProductQuantity: (product: CartProductType, quantity: number) => void;
//   removeMultipleFromCart: (items: CartProductType[]) => void;
//   removeFromCart: (item: CartProductType) => void;
//   emptyCart: () => void;
//   setCart: (newCart: CartProductType[]) => void;
//   setAppliedCoupon: (coupon: AppliedCouponType | null) => void;
//   removeCoupon: () => void;
//   setShippingFee: (fee: number) => void;
//   clearCart: () => void;
  
//   // Hesaplama fonksiyonları
//   calculateSubtotal: () => number;
//   calculateDiscount: (coupon?: AppliedCouponType | null) => number;
//   calculateTotal: () => number;
//   recalculateAll: () => void;
  
//   // Yardımcı fonksiyonlar
//   getItemCount: () => number;
//   getCartTotalForCoupon: () => number;
// }

// const INITIAL_STATE: CartStoreState = {
//   cart: [],
//   subtotal: 0,
//   shippingFee: 0,
//   totalPrice: 0,
//   appliedCoupon: null,
//   couponApplied: false,
// };

// export const useCartStore = create(
//   persist<CartStoreState & CartStoreActions>(
//     (set, get) => ({
//       ...INITIAL_STATE,

//       // YARDIMCI FONKSİYONLAR
//       getItemCount: () => {
//         const cart = get().cart;
//         return cart.reduce((count, item) => count + item.quantity, 0);
//       },

//       getCartTotalForCoupon: () => {
//         const cart = get().cart;
//         const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         const shippingFee = get().shippingFee;
//         return subtotal + shippingFee;
//       },

//       // HESAPLAMA FONKSİYONLARI
//       calculateSubtotal: () => {
//         const cart = get().cart;
//         return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       },

//       calculateDiscount: (coupon = null) => {
//         const appliedCoupon = coupon || get().appliedCoupon;
//         if (!appliedCoupon) return 0;

//         const cartTotal = get().calculateSubtotal();
//         const shippingFee = get().shippingFee;
//         const totalForDiscount = cartTotal + shippingFee;

//         // Minimum satın alma tutarı kontrolü
//         if (appliedCoupon.minPurchaseAmount && totalForDiscount < appliedCoupon.minPurchaseAmount) {
//           return 0;
//         }

//         // Yüzdelik indirim hesaplama
//         let discountAmount = 0;
//         if (appliedCoupon.appliedToCartTotal) {
//           discountAmount = (totalForDiscount * appliedCoupon.discountPercentage) / 100;
//         } else {
//           discountAmount = (cartTotal * appliedCoupon.discountPercentage) / 100;
//         }

//         // Maksimum indirim tutarı kontrolü
//         if (appliedCoupon.maxDiscountAmount && discountAmount > appliedCoupon.maxDiscountAmount) {
//           discountAmount = appliedCoupon.maxDiscountAmount;
//         }

//         // Toplam fiyattan fazla indirim olamaz
//         if (discountAmount > totalForDiscount) {
//           discountAmount = totalForDiscount;
//         }

//         return discountAmount;
//       },

//       calculateTotal: () => {
//         const subtotal = get().calculateSubtotal();
//         const shippingFee = get().shippingFee;
//         const discount = get().calculateDiscount();
        
//         return Math.max(0, subtotal + shippingFee - discount);
//       },

//       recalculateAll: () => {
//         const subtotal = get().calculateSubtotal();
//         const discount = get().calculateDiscount();
//         const total = get().calculateTotal();

//         set({
//           subtotal,
//           totalPrice: total,
//         });
//       },

//       // CART İŞLEMLERİ
//       addToCart: (product: CartProductType) => {
//         if (!product) return;

//         const cart = get().cart;
//         const existingItemIndex = cart.findIndex(
//           (item) =>
//             item.productId === product.productId &&
//             item.variantId === product.variantId &&
//             item.sizeId === product.sizeId,
//         );

//         let updatedCart: CartProductType[];

//         if (existingItemIndex > -1) {
//           const existingItem = cart[existingItemIndex];
//           const requestedQuantity = existingItem.quantity + product.quantity;
//           const availableStock = existingItem.stock || 0;
//           const finalQuantity = Math.min(requestedQuantity, availableStock);

//           if (finalQuantity <= 0) {
//             updatedCart = cart.filter(
//               (_, index) => index !== existingItemIndex,
//             );
//           } else {
//             updatedCart = [...cart];
//             updatedCart[existingItemIndex] = {
//               ...updatedCart[existingItemIndex],
//               quantity: finalQuantity,
//             };
//           }
//         } else {
//           const availableStock = product.stock || 0;
//           const finalQuantity = Math.min(product.quantity, availableStock);

//           if (finalQuantity <= 0) {
//             updatedCart = [...cart];
//           } else {
//             updatedCart = [
//               ...cart,
//               {
//                 ...product,
//                 quantity: finalQuantity,
//               },
//             ];
//           }
//         }

//         set((state) => ({
//           cart: updatedCart,
//           couponApplied: false, // Sepet değişti, kuponu yeniden hesapla
//         }));

//         get().recalculateAll();
//       },

//       updateProductQuantity: (product: CartProductType, quantity: number) => {
//         if (quantity <= 0) {
//           get().removeFromCart(product);
//           return;
//         }

//         const availableStock = product.stock || 0;
//         if (quantity > availableStock) {
//           quantity = availableStock;
//         }

//         const cart = get().cart;
//         const updatedCart = cart.map((item) =>
//           item.productId === product.productId &&
//           item.variantId === product.variantId &&
//           item.sizeId === product.sizeId
//             ? { ...item, quantity }
//             : item,
//         );

//         set(() => ({
//           cart: updatedCart,
//           couponApplied: false, // Miktar değişti, kuponu yeniden hesapla
//         }));

//         get().recalculateAll();
//       },

//       removeFromCart: (product: CartProductType) => {
//         const cart = get().cart;
//         const updatedCart = cart.filter(
//           (item) =>
//             !(
//               item.productId === product.productId &&
//               item.variantId === product.variantId &&
//               item.sizeId === product.sizeId
//             ),
//         );

//         set(() => ({
//           cart: updatedCart,
//           couponApplied: false, // Ürün kaldırıldı, kuponu yeniden hesapla
//         }));

//         get().recalculateAll();
//       },

//       removeMultipleFromCart: (products: CartProductType[]) => {
//         const cart = get().cart;
//         const updatedCart = cart.filter(
//           (item) =>
//             !products.some(
//               (product) =>
//                 product.productId === item.productId &&
//                 product.variantId === item.variantId &&
//                 item.sizeId === product.sizeId,
//             ),
//         );

//         set(() => ({
//           cart: updatedCart,
//           couponApplied: false,
//         }));

//         get().recalculateAll();
//       },

//       emptyCart: () => {
//         set(() => ({
//           cart: [],
//           subtotal: 0,
//           shippingFee: 0,
//           totalPrice: 0,
//           appliedCoupon: null,
//           couponApplied: false,
//         }));
//       },

//       setCart: (newCart: CartProductType[]) => {
//         const subtotal = newCart.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0,
//         );

//         const discount = get().appliedCoupon
//           ? get().calculateDiscount(get().appliedCoupon)
//           : 0;
//         const shippingFee = get().shippingFee;
//         const totalPrice = Math.max(0, subtotal + shippingFee - discount);

//         set(() => ({
//           cart: newCart,
//           subtotal,
//           totalPrice,
//           couponApplied: false,
//         }));
//       },

//       setAppliedCoupon: (coupon: AppliedCouponType | null) => {
//         if (!coupon) {
//           set(() => ({
//             appliedCoupon: null,
//             couponApplied: false,
//           }));
//         } else {
//           // Kuponu hesapla
//           const discountAmount = get().calculateDiscount(coupon);
          
//           // Güncellenmiş kupon object'i oluştur
//           const updatedCoupon = {
//             ...coupon,
//             discountAmount,
//           };

//           set(() => ({
//             appliedCoupon: updatedCoupon,
//             couponApplied: true,
//           }));
//         }

//         get().recalculateAll();
//       },

//       removeCoupon: () => {
//         set(() => ({
//           appliedCoupon: null,
//           couponApplied: false,
//         }));

//         get().recalculateAll();
//       },

//       setShippingFee: (fee: number) => {
//         const feeValue = Math.max(0, fee);

//         set(() => ({
//           shippingFee: feeValue,
//           couponApplied: false, // Kargo ücreti değişti, kuponu yeniden hesapla
//         }));

//         get().recalculateAll();
//       },

//       clearCart: () => {
//         set(() => ({
//           cart: [],
//           subtotal: 0,
//           shippingFee: 0,
//           totalPrice: 0,
//           appliedCoupon: null,
//           couponApplied: false,
//         }));
//       },
//     }),
//     {
//       name: "cart-store",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         cart: state.cart,
//         subtotal: state.subtotal,
//         shippingFee: state.shippingFee,
//         totalPrice: state.totalPrice,
//         appliedCoupon: state.appliedCoupon,
//         couponApplied: state.couponApplied,
//       }),
//     },
//   ),
// );






// app/cart-store/useCartStore.ts
import { CartProductType } from "@/app/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from 'js-cookie';

export interface AppliedCouponType {
  couponId: string;
  couponCode: string;
  discountPercentage: number;
  discountAmount: number;
  expiryDate: string;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  appliedToCartTotal: boolean;
}

interface CartStoreState {
  cart: CartProductType[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  appliedCoupon: AppliedCouponType | null;
  couponApplied: boolean;
}

interface CartStoreActions {
  addToCart: (item: CartProductType) => void;
  updateProductQuantity: (product: CartProductType, quantity: number) => void;
  removeMultipleFromCart: (items: CartProductType[]) => void;
  removeFromCart: (item: CartProductType) => void;
  emptyCart: () => void;
  setCart: (newCart: CartProductType[]) => void;
  setAppliedCoupon: (coupon: AppliedCouponType | null) => void;
  removeCoupon: () => void;
  setShippingFee: (fee: number) => void;
  clearCart: () => void;
  
  // Hesaplama fonksiyonları
  calculateSubtotal: () => number;
  calculateDiscount: (coupon?: AppliedCouponType | null) => number;
  calculateTotal: () => number;
  recalculateAll: () => void;
  
  // Yardımcı fonksiyonlar
  getItemCount: () => number;
  getCartTotalForCoupon: () => number;
  
  // Cookie işlemleri
  syncCartToCookie: () => void;
  loadCartFromCookie: () => void;
  clearCookieCart: () => void;
}

const INITIAL_STATE: CartStoreState = {
  cart: [],
  subtotal: 0,
  shippingFee: 0,
  totalPrice: 0,
  appliedCoupon: null,
  couponApplied: false,
};

// Cookie Storage Sınıfı
const createCookieStorage = () => ({
  getItem: (name: string): string | null => {
    try {
      const cookieValue = Cookies.get(name);
      return cookieValue || null;
    } catch (error) {
      console.error('Error reading cookie:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: string): void => {
    try {
      // 30 gün geçerli cookie (sayfa kapanınca bile kalır)
      Cookies.set(name, value, { 
        expires: 30, 
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },
  
  removeItem: (name: string): void => {
    try {
      Cookies.remove(name, { path: '/' });
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  },
});

// Custom Storage - Hem localStorage hem cookie
const createHybridStorage = () => {
  const cookieStorage = createCookieStorage();
  
  return {
    getItem: (name: string): string | null => {
      try {
        // Önce localStorage'dan oku
        const localStorageValue = localStorage.getItem(name);
        
        // Eğer localStorage'da varsa, cookie'yi de güncelle
        if (localStorageValue) {
          // Cookie'de yoksa veya eskiyse güncelle
          const cookieValue = cookieStorage.getItem(name);
          if (!cookieValue || cookieValue !== localStorageValue) {
            cookieStorage.setItem(name, localStorageValue);
          }
          return localStorageValue;
        }
        
        // localStorage'da yoksa cookie'den oku
        const cookieValue = cookieStorage.getItem(name);
        if (cookieValue) {
          // Cookie'den okuduysak localStorage'a da yaz
          localStorage.setItem(name, cookieValue);
          return cookieValue;
        }
        
        return null;
      } catch (error) {
        console.error('Error reading hybrid storage:', error);
        
        // Fallback: cookie'den oku
        try {
          return cookieStorage.getItem(name);
        } catch (cookieError) {
          console.error('Error reading from cookie fallback:', cookieError);
          return null;
        }
      }
    },
    
    setItem: (name: string, value: string): void => {
      try {
        // Hem localStorage'a hem cookie'ye yaz
        localStorage.setItem(name, value);
        cookieStorage.setItem(name, value);
      } catch (error) {
        console.error('Error writing to hybrid storage:', error);
        
        // Fallback: cookie'ye yaz
        try {
          cookieStorage.setItem(name, value);
        } catch (cookieError) {
          console.error('Error writing to cookie fallback:', cookieError);
        }
      }
    },
    
    removeItem: (name: string): void => {
      try {
        // Hem localStorage'dan hem cookie'den sil
        localStorage.removeItem(name);
        cookieStorage.removeItem(name);
      } catch (error) {
        console.error('Error removing from hybrid storage:', error);
        
        // Fallback: cookie'den sil
        try {
          cookieStorage.removeItem(name);
        } catch (cookieError) {
          console.error('Error removing from cookie fallback:', cookieError);
        }
      }
    },
  };
};

// Cart Cookie Manager
const CartCookieManager = {
  // Cookie key'leri
  CART_COOKIE_KEY: 'cart_data',
  COUPON_COOKIE_KEY: 'cart_coupon',
  
  // Cart'ı cookie'ye kaydet
  saveCartToCookie: (cartData: any): void => {
    try {
      const dataToSave = {
        cart: cartData.cart,
        subtotal: cartData.subtotal,
        shippingFee: cartData.shippingFee,
        totalPrice: cartData.totalPrice,
        timestamp: Date.now(),
      };
      
      // Cookie'ye JSON string olarak kaydet
      const cookieStorage = createCookieStorage();
      cookieStorage.setItem(CartCookieManager.CART_COOKIE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving cart to cookie:', error);
    }
  },
  
  // Coupon'ı cookie'ye kaydet
  saveCouponToCookie: (couponData: any): void => {
    try {
      if (!couponData) {
        CartCookieManager.removeCouponFromCookie();
        return;
      }
      
      const cookieStorage = createCookieStorage();
      cookieStorage.setItem(CartCookieManager.COUPON_COOKIE_KEY, JSON.stringify(couponData));
    } catch (error) {
      console.error('Error saving coupon to cookie:', error);
    }
  },
  
  // Cookie'den cart'ı yükle
  loadCartFromCookie: (): any => {
    try {
      const cookieStorage = createCookieStorage();
      const cartCookie = cookieStorage.getItem(CartCookieManager.CART_COOKIE_KEY);
      
      if (!cartCookie) return null;
      
      const parsedData = JSON.parse(cartCookie);
      
      // Cookie eski mi kontrol et (30 gün)
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (parsedData.timestamp && parsedData.timestamp < thirtyDaysAgo) {
        CartCookieManager.clearCartCookie();
        return null;
      }
      
      return parsedData;
    } catch (error) {
      console.error('Error loading cart from cookie:', error);
      return null;
    }
  },
  
  // Cookie'den coupon'ı yükle
  loadCouponFromCookie: (): any => {
    try {
      const cookieStorage = createCookieStorage();
      const couponCookie = cookieStorage.getItem(CartCookieManager.COUPON_COOKIE_KEY);
      
      if (!couponCookie) return null;
      
      return JSON.parse(couponCookie);
    } catch (error) {
      console.error('Error loading coupon from cookie:', error);
      return null;
    }
  },
  
  // Cart cookie'yi temizle
  clearCartCookie: (): void => {
    const cookieStorage = createCookieStorage();
    cookieStorage.removeItem(CartCookieManager.CART_COOKIE_KEY);
  },
  
  // Coupon cookie'yi temizle
  removeCouponFromCookie: (): void => {
    const cookieStorage = createCookieStorage();
    cookieStorage.removeItem(CartCookieManager.COUPON_COOKIE_KEY);
  },
  
  // Tüm cart cookie'lerini temizle
  clearAllCookies: (): void => {
    CartCookieManager.clearCartCookie();
    CartCookieManager.removeCouponFromCookie();
  },
};

export const useCartStore = create(
  persist<CartStoreState & CartStoreActions>(
    (set, get) => ({
      ...INITIAL_STATE,

      // COOKIE İŞLEMLERİ
      syncCartToCookie: () => {
        const state = get();
        CartCookieManager.saveCartToCookie({
          cart: state.cart,
          subtotal: state.subtotal,
          shippingFee: state.shippingFee,
          totalPrice: state.totalPrice,
        });
        
        if (state.appliedCoupon) {
          CartCookieManager.saveCouponToCookie(state.appliedCoupon);
        } else {
          CartCookieManager.removeCouponFromCookie();
        }
      },

      loadCartFromCookie: () => {
        const cartData = CartCookieManager.loadCartFromCookie();
        const couponData = CartCookieManager.loadCouponFromCookie();
        
        if (cartData) {
          set({
            cart: cartData.cart || [],
            subtotal: cartData.subtotal || 0,
            shippingFee: cartData.shippingFee || 0,
            totalPrice: cartData.totalPrice || 0,
            appliedCoupon: couponData,
            couponApplied: !!couponData,
          });
          
          // Ayrıca localStorage'ı da güncelle
          if (cartData.cart) {
            try {
              localStorage.setItem('cart-store', JSON.stringify({
                state: {
                  cart: cartData.cart,
                  subtotal: cartData.subtotal,
                  shippingFee: cartData.shippingFee,
                  totalPrice: cartData.totalPrice,
                  appliedCoupon: couponData,
                  couponApplied: !!couponData,
                },
                version: 0,
              }));
            } catch (error) {
              console.error('Error syncing to localStorage:', error);
            }
          }
        }
      },

      clearCookieCart: () => {
        CartCookieManager.clearAllCookies();
      },

      // YARDIMCI FONKSİYONLAR
      getItemCount: () => {
        const cart = get().cart;
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      getCartTotalForCoupon: () => {
        const cart = get().cart;
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingFee = get().shippingFee;
        return subtotal + shippingFee;
      },

      // HESAPLAMA FONKSİYONLARI
      calculateSubtotal: () => {
        const cart = get().cart;
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      calculateDiscount: (coupon = null) => {
        const appliedCoupon = coupon || get().appliedCoupon;
        if (!appliedCoupon) return 0;

        const cartTotal = get().calculateSubtotal();
        const shippingFee = get().shippingFee;
        const totalForDiscount = cartTotal + shippingFee;

        // Minimum satın alma tutarı kontrolü
        if (appliedCoupon.minPurchaseAmount && totalForDiscount < appliedCoupon.minPurchaseAmount) {
          return 0;
        }

        // Yüzdelik indirim hesaplama
        let discountAmount = 0;
        if (appliedCoupon.appliedToCartTotal) {
          discountAmount = (totalForDiscount * appliedCoupon.discountPercentage) / 100;
        } else {
          discountAmount = (cartTotal * appliedCoupon.discountPercentage) / 100;
        }

        // Maksimum indirim tutarı kontrolü
        if (appliedCoupon.maxDiscountAmount && discountAmount > appliedCoupon.maxDiscountAmount) {
          discountAmount = appliedCoupon.maxDiscountAmount;
        }

        // Toplam fiyattan fazla indirim olamaz
        if (discountAmount > totalForDiscount) {
          discountAmount = totalForDiscount;
        }

        return discountAmount;
      },

      calculateTotal: () => {
        const subtotal = get().calculateSubtotal();
        const shippingFee = get().shippingFee;
        const discount = get().calculateDiscount();
        
        return Math.max(0, subtotal + shippingFee - discount);
      },

      recalculateAll: () => {
        const subtotal = get().calculateSubtotal();
        const discount = get().calculateDiscount();
        const total = get().calculateTotal();

        set({
          subtotal,
          totalPrice: total,
        });
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      // CART İŞLEMLERİ
      addToCart: (product: CartProductType) => {
        if (!product) return;

        const cart = get().cart;
        const existingItemIndex = cart.findIndex(
          (item) =>
            item.productId === product.productId &&
            item.variantId === product.variantId &&
            item.sizeId === product.sizeId,
        );

        let updatedCart: CartProductType[];

        if (existingItemIndex > -1) {
          const existingItem = cart[existingItemIndex];
          const requestedQuantity = existingItem.quantity + product.quantity;
          const availableStock = existingItem.stock || 0;
          const finalQuantity = Math.min(requestedQuantity, availableStock);

          if (finalQuantity <= 0) {
            updatedCart = cart.filter(
              (_, index) => index !== existingItemIndex,
            );
          } else {
            updatedCart = [...cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: finalQuantity,
            };
          }
        } else {
          const availableStock = product.stock || 0;
          const finalQuantity = Math.min(product.quantity, availableStock);

          if (finalQuantity <= 0) {
            updatedCart = [...cart];
          } else {
            updatedCart = [
              ...cart,
              {
                ...product,
                quantity: finalQuantity,
              },
            ];
          }
        }

        set((state) => ({
          cart: updatedCart,
          couponApplied: false, // Sepet değişti, kuponu yeniden hesapla
        }));

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      updateProductQuantity: (product: CartProductType, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(product);
          return;
        }

        const availableStock = product.stock || 0;
        if (quantity > availableStock) {
          quantity = availableStock;
        }

        const cart = get().cart;
        const updatedCart = cart.map((item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId &&
          item.sizeId === product.sizeId
            ? { ...item, quantity }
            : item,
        );

        set(() => ({
          cart: updatedCart,
          couponApplied: false, // Miktar değişti, kuponu yeniden hesapla
        }));

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      removeFromCart: (product: CartProductType) => {
        const cart = get().cart;
        const updatedCart = cart.filter(
          (item) =>
            !(
              item.productId === product.productId &&
              item.variantId === product.variantId &&
              item.sizeId === product.sizeId
            ),
        );

        set(() => ({
          cart: updatedCart,
          couponApplied: false, // Ürün kaldırıldı, kuponu yeniden hesapla
        }));

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      removeMultipleFromCart: (products: CartProductType[]) => {
        const cart = get().cart;
        const updatedCart = cart.filter(
          (item) =>
            !products.some(
              (product) =>
                product.productId === item.productId &&
                product.variantId === item.variantId &&
                item.sizeId === product.sizeId,
            ),
        );

        set(() => ({
          cart: updatedCart,
          couponApplied: false,
        }));

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      emptyCart: () => {
        set(() => ({
          cart: [],
          subtotal: 0,
          shippingFee: 0,
          totalPrice: 0,
          appliedCoupon: null,
          couponApplied: false,
        }));
        
        // Cookie'yi temizle
        get().clearCookieCart();
      },

      setCart: (newCart: CartProductType[]) => {
        const subtotal = newCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        const discount = get().appliedCoupon
          ? get().calculateDiscount(get().appliedCoupon)
          : 0;
        const shippingFee = get().shippingFee;
        const totalPrice = Math.max(0, subtotal + shippingFee - discount);

        set(() => ({
          cart: newCart,
          subtotal,
          totalPrice,
          couponApplied: false,
        }));
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      setAppliedCoupon: (coupon: AppliedCouponType | null) => {
        if (!coupon) {
          set(() => ({
            appliedCoupon: null,
            couponApplied: false,
          }));
          
          // Cookie'den kuponu kaldır
          CartCookieManager.removeCouponFromCookie();
        } else {
          // Kuponu hesapla
          const discountAmount = get().calculateDiscount(coupon);
          
          // Güncellenmiş kupon object'i oluştur
          const updatedCoupon = {
            ...coupon,
            discountAmount,
          };

          set(() => ({
            appliedCoupon: updatedCoupon,
            couponApplied: true,
          }));
          
          // Cookie'ye kuponu kaydet
          CartCookieManager.saveCouponToCookie(updatedCoupon);
        }

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      removeCoupon: () => {
        set(() => ({
          appliedCoupon: null,
          couponApplied: false,
        }));
        
        // Cookie'den kuponu kaldır
        CartCookieManager.removeCouponFromCookie();

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      setShippingFee: (fee: number) => {
        const feeValue = Math.max(0, fee);

        set(() => ({
          shippingFee: feeValue,
          couponApplied: false, // Kargo ücreti değişti, kuponu yeniden hesapla
        }));

        get().recalculateAll();
        
        // Cookie'yi güncelle
        get().syncCartToCookie();
      },

      clearCart: () => {
        set(() => ({
          cart: [],
          subtotal: 0,
          shippingFee: 0,
          totalPrice: 0,
          appliedCoupon: null,
          couponApplied: false,
        }));
        
        // Tüm cookie'leri temizle
        get().clearCookieCart();
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => createHybridStorage()),
      partialize: (state) => ({
        cart: state.cart,
        subtotal: state.subtotal,
        shippingFee: state.shippingFee,
        totalPrice: state.totalPrice,
        appliedCoupon: state.appliedCoupon,
        couponApplied: state.couponApplied,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Error during rehydration:', error);
          }
          
          // Sayfa yüklendiğinde cookie'den cart'ı kontrol et
          if (state) {
            // localStorage'dan yüklendikten sonra cookie ile sync et
            setTimeout(() => {
              const cookieData = CartCookieManager.loadCartFromCookie();
              const couponData = CartCookieManager.loadCouponFromCookie();
              
              if (cookieData && cookieData.cart) {
                // Eğer cookie'de daha güncel veri varsa, onu kullan
                const localStorageCartCount = state.cart?.length || 0;
                const cookieCartCount = cookieData.cart.length;
                
                if (cookieCartCount > localStorageCartCount) {
                  state.cart = cookieData.cart;
                  state.subtotal = cookieData.subtotal || 0;
                  state.shippingFee = cookieData.shippingFee || 0;
                  state.totalPrice = cookieData.totalPrice || 0;
                  
                  if (couponData) {
                    state.appliedCoupon = couponData;
                    state.couponApplied = true;
                  }
                }
              }
            }, 100);
          }
        };
      },
    },
  ),
);

// Hook olarak export edilen yardımcı fonksiyonlar
export const useCartInitializer = () => {
  const { loadCartFromCookie } = useCartStore();
  
  // Component mount olduğunda cookie'den cart'ı yükle
  const initializeCart = () => {
    if (typeof window !== 'undefined') {
      loadCartFromCookie();
    }
  };
  
  return { initializeCart };
};

// Cookie-based cart hook'u
export const useCookieCart = () => {
  const { 
    syncCartToCookie, 
    loadCartFromCookie, 
    clearCookieCart,
    ...cartActions 
  } = useCartStore();
  
  return {
    ...cartActions,
    // Cookie işlemlerini expose et
    syncCartToCookie,
    loadCartFromCookie,
    clearCookieCart,
    
    // Cookie'de cart var mı kontrolü
    hasCartInCookie: () => {
      if (typeof window === 'undefined') return false;
      return !!CartCookieManager.loadCartFromCookie();
    },
    
    // Cookie'deki cart boyutu
    getCookieCartSize: () => {
      const cookieData = CartCookieManager.loadCartFromCookie();
      if (!cookieData || !cookieData.cart) return 0;
      return cookieData.cart.length;
    },
  };
};
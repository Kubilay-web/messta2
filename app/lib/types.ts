import {
  getAllStoreProducts,
  getProductPageData,
  getProducts,
  getRatingStatistics,
  getShippingDetails,
  retrieveProductDetails,
} from "@/app/queries/product";
import {
  getAllStores,
  getStoreDefaultShippingDetails,
  getStoreOrders,
  getStorePageDetails,
} from "@/app/queries/store";
import { getAllSubCategories } from "@/app/queries/subCategory";
import {
  Cart,
  CartItem,
  Category,
  Color,
  FreeShipping,
  FreeShippingCountry,
  OfferTag,
  Prisma,
  ProductVariantImage,
  Review,
  ReviewImage,
  ShippingAddress,
  ShippingFeeMethod,
  ShippingRate,
  Size,
  Spec,
  Store,
  Country as CountryPrisma,
  SubCategory,
  User,
  Coupon,
  OrderGroup,
  OrderItem,
} from "@prisma/client";
import countries from "@/app/data/countries.json";
import { getOrder, getOrderJob } from "@/app/queries/order";
import {
  getUserOrders,
  getUserPayments,
  getUserWishlist,
} from "@/app/queries/profile";
import { getHomeFeaturedCategories } from "@/app/queries/home";
import { NextResponse } from "next/server";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export const notificationsInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      content: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface MessageCountInfo {
  unreadCount: number;
}

export interface DashboardSidebarMenuInterface {
  label: string;
  icon: string;
  link: string;
}

export type SubCategoryWithCategoryType = Prisma.PromiseReturnType<
  typeof getAllSubCategories
>[0];

// Product + variant
// export type ProductWithVariantType = {
//   productId: string;
//   variantId: string;
//   name: string;
//   description: string;
//   variantName: string;
//   variantDescription: string;
//   images: { id?: string; url: string }[];
//   categoryId: string;
//   subCategoryId: string;
//   isSale: boolean;
//   brand: string;
//   sku: string;
//   colors: { id?: string; color: string }[];
//   sizes: {
//     id?: string;
//     size: string;
//     quantity: number;
//     price: number;
//     discount: number;
//   }[];
//   keywords: string[];
//   createdAt: Date;
//   updatedAt: Date;
// };

// types/product.ts

export interface ProductWithVariantType {
  productId: string;
  variantId: string;
  name: string;
  description: string;
  variantName: string;
  variantDescription: string;
  images: { id?: string; url: string }[];
  variantImage: string;
  categoryId: string;
  subCategoryId: string;
  offerTagId: string;
  isSale: boolean;
  saleEndDate: string;
  brand: string;
  sku: string;
  weight: number;
  colors: { id?: string; color: string }[];
  sizes: {
    id?: string;
    size: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  product_specs: { name: string; value: string }[];
  variant_specs: { name: string; value: string }[];
  keywords: string[];
  questions: { question: string; answer: string }[];
  freeShippingForAllCountries: boolean;
  freeShippingCountriesId: { id?: string; label: string; value: string }[];
  shippingFeeMethod: ShippingFeeMethod;
  createdAt: Date;
  updatedAt: Date;
}

// Store product
export type StoreProductType = Prisma.PromiseReturnType<
  typeof getAllStoreProducts
>[0];

export type StoreDefaultShippingType = Prisma.PromiseReturnType<
  typeof getStoreDefaultShippingDetails
>;

export type CountryWithShippingRatesType = {
  countryId: string;
  countryName: string;
  shippingRate: ShippingRate;
};

export interface Country {
  name: string;
  code: string;
  city: string;
  region: string;
}

export type SelectMenuOption = (typeof countries)[number];

export type ProductType = Prisma.PromiseReturnType<
  typeof getProducts
>["products"][0];

export type VariantSimplified = {
  variantId: string;
  variantSlug: string;
  variantName: string;
  images: ProductVariantImage[];
  sizes: Size[];
};

export type VariantImageType = {
  url: string;
  image: string;
};

export type ProductPageType = Prisma.PromiseReturnType<
  typeof retrieveProductDetails
>;

export type ProductPageDataType = Prisma.PromiseReturnType<
  typeof getProductPageData
>;

// export type CartProductType = {
//   productId: string;
//   variantId: string;
//   productSlug: string;
//   variantSlug: string;
//   name: string;
//   variantName: string;
//   image: string;
//   variantImage: string;
//   sku:string;
//   sizeId: string;
//   size: string;
//   quantity: number;
//   price: number;
//   stock: number;
//   weight: number;
//   shippingMethod: string;
//   shippingService: string;
//   shippingFee: number;
//   extraShippingFee: number;
//   deliveryTimeMin: number;
//   deliveryTimeMax: number;
//   isFreeShipping: boolean;
//   totalPrice:number;

//     // Store bilgileri - BU KISIM EKSİK
//   storeId: string;
//   storeName: string;
//   storeLogo?: string;
//   storeUrl?: string;
// };




// app/lib/types.ts

export interface CartProductType {
  productId: string;
  variantId: string;
  sizeId: string;
  productSlug: string;
  variantSlug: string;
  sku: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  shippingFee: number;
  totalPrice: number;
  
  // Store bilgileri
  storeId: string;
  storeName: string;
  storeLogo: string;
  storeUrl: string;
  
  // Variant bilgileri
  variantName: string;
  variantImage: string;
  
  // Stok ve ağırlık
  stock: number;
  weight: number;
  
  // Kargo bilgileri
  shippingMethod: string;
  shippingService: string;
  extraShippingFee: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  isFreeShipping: boolean;
  
  // İndirim
  discount?: number;
  discountedPrice?: number;
  
  // Kategori
  categoryId?: string;
  categoryName?: string;
  categoryUrl?: string;
}



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



export type ProductVariantDataType = {
  id: string;
  variantName: string;
  slug: string;
  sku: string;
  variantImage: string;
  weight: number;
  isSale: boolean;
  saleEndDate: string | null;
  variantDescription: string | null;
  images: {
    url: string;
  }[];
  sizes: Size[];
  specs: Spec[];
  colors: { name: string }[];
  keywords: string;
};

export type ProductShippingDetailsType = Prisma.PromiseReturnType<
  typeof getShippingDetails
>;

export type RatingStatisticsType = Prisma.PromiseReturnType<
  typeof getRatingStatistics
>;

export type ShippingDetailsType = {
  countryCode: string;
  countryName: string;
  city: string;
  shippingFeeMethod: string;
  shippingFee: number;
  extraShippingFee: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  isFreeShipping: boolean;
  shippingService: string;
  returnPolicy: string;
};

export type FreeShippingWithCountriesType = FreeShipping & {
  eligibaleCountries: FreeShippingCountry[];
};

export type StatisticsCardType = Prisma.PromiseReturnType<
  typeof getRatingStatistics
>["ratingStatistics"];

export type ReviewWithImageType = Review & {
  images: ReviewImage[];
  user: User;
};

export type ReviewsOrderType = {
  orderBy: "latest" | "oldest" | "highest";
};

export type ReviewsFiltersType = {
  rating?: number;
  hasImages?: boolean;
};

export type SortOrder = "asc" | "desc";

export type ReviewDetailsType = {
  id: string;
  review: string;
  rating: number;
  images: { url: string }[];
  size: string;
  quantity: string;
  variant: string;
  variantImage: string;
  color: string;
};

export type VariantInfoType = {
  variantName: string;
  variantSlug: string;
  variantImage: string;
  variantUrl: string;
  images: ProductVariantImage[];
  sizes: Size[];
  colors: string;
};

export interface ProductPageData {
  productId: string;
  variantId: string;
  productSlug: string;
  variantSlug: string;
  name: string;
  description: string;
  variantName: string;
  sku: string;
  colors: Color[];
  saleEndDate: string | null;
  rating: number;
  variantDescription: string | null;
  variantImage: string;
  weight: number;
  category: Category;
  subCategory: SubCategory;
  offerTag: OfferTag | null;
  isSale: boolean;
  images: ProductVariantImage[];
  sizes: Size[];
  shippingDetails: ShippingDetailsType | boolean;
  store: {
    id: string;
    name: string;
    url: string;
    logo: string;
    followersCount: number;
    isUserFollowingStore: boolean;
  };
  reviewsStatistics: RatingStatisticsType;
  variantInfo: {
    variantName: string;
    variantSlug: string;
    variantImage: string;
    variantUrl: string;
    images: ProductVariantImage[];
    sizes: Size[];
    colors: Color[];
  }[];
}

export type CartWithCartItemsType = Cart & {
  cartItems: CartItem[];
  coupon: (Coupon & { store: Store }) | null;
};

export type UserShippingAddressType = ShippingAddress & {
  country: CountryPrisma;
  user: User;
};

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Processing = "Processing",
  Shipped = "Shipped",
  OutforDelivery = "OutforDelivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Failed = "Failed",
  Refunded = "Refunded",
  Returned = "Returned",
  PartiallyShipped = "PartiallyShipped",
  OnHold = "OnHold",
}

export enum ProductStatus {
  Pending = "Pending",
  Processing = "Processing",
  ReadyForShipment = "ReadyForShipment",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
  Returned = "Returned",
  Refunded = "Refunded",
  FailedDelivery = "FailedDelivery",
  OnHold = "OnHold",
  Backordered = "Backordered",
  PartiallyShipped = "PartiallyShipped",
  ExchangeRequested = "ExchangeRequested",
  AwaitingPickup = "AwaitingPickup",
}

export type OrderFulltType = Prisma.PromiseReturnType<typeof getOrder>;

export type OrderFullJobType = Prisma.PromiseReturnType<typeof getOrderJob>;

export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
  Declined = "Declined",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
  PartiallyRefunded = "PartiallyRefunded",
  Chargeback = "Chargeback",
}

export type OrderGroupWithItemsType = OrderGroup & {
  items: OrderItem[];
  store: Store;
  _count: {
    items: number;
  };
  coupon: Coupon | null;
};

export interface SearchResult {
  name: string;
  link: string;
  image: string;
}

export type OrderTableFilter =
  | ""
  | "unpaid"
  | "toShip"
  | "shipped"
  | "delivered";

export type OrderTableDateFilter =
  | ""
  | "last-6-months"
  | "last-1-year"
  | "last-2-years";

export type PaymentTableFilter = "" | "paypal" | "credit-card";

export type PaymentTableDateFilter =
  | ""
  | "last-6-months"
  | "last-1-year"
  | "last-2-years";

export type ReviewFilter = "5" | "4" | "3" | "2" | "1" | "";

export type ReviewDateFilter =
  | ""
  | "last-6-months"
  | "last-1-year"
  | "last-2-years";

export type UserOrderType = Prisma.PromiseReturnType<
  typeof getUserOrders
>["orders"][0];

export type UserPaymentType = Prisma.PromiseReturnType<
  typeof getUserPayments
>["payments"][0];

export type ProductWishlistType = Prisma.PromiseReturnType<
  typeof getUserWishlist
>["wishlist"][0];

export type FiltersQueryType = {
  search: string;
  category: string;
  subCategory: string;
  offer: string;
  size: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
  color: string;
};

export type CatgegoryWithSubsType = Category & {
  subCategories: SubCategory[];
};

export type StoreOrderType = Prisma.PromiseReturnType<typeof getStoreOrders>[0];

export type ProductSimpleVariantType = {
  variantId: string;
  variantSlug: string;
  variantName: string;
  variantImage: string;
  images: ProductVariantImage[];
  sizes: Size[];
};

export type ProductSize = {
  size: string;
  price: number;
  discount: number;
  quantity: number;
};

export type ProductWithVariants = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  sales: number;
  numReviews: number;
  variants: {
    id: string;
    variantName: string;
    variantImage: string;
    slug: string;
    sizes: Size[];
    images: ProductVariantImage[];
  }[];
};

export type SimpleProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  rating: number;
  image: string;
  variantSlug: string;
  price: number;
};

export type FeaturedCategoryType = Prisma.PromiseReturnType<
  typeof getHomeFeaturedCategories
>[0];

export type StoreType = {
  name: string;
  description: string;
  email: string;
  phone: string;
  logo: string;
  cover: string;
  url: string;
  defaultShippingService: string;
  defaultDeliveryTimeMax?: number;
  defaultDeliveryTimeMin?: number;
  defaultShippingFeeFixed?: number;
  defaultShippingFeeForAdditionalItem?: number;
  defaultShippingFeePerItem?: number;
  defaultShippingFeePerKg?: number;
  returnPolicy?: string;
};

export type AdminStoreType = Prisma.PromiseReturnType<typeof getAllStores>[0];

export enum StoreStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  DISABLED = "DISABLED",
}

export type StoreDetailsType = Prisma.PromiseReturnType<
  typeof getStorePageDetails
>;

// StackOverFlow

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: null;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;






export interface AppliedCouponType {
  couponId: string;
  code: string;
  discountPercentage: number;
  discountAmount: number;
  storeId: string;
  storeName: string;
  subtotal: number;
  totalAfterDiscount: number;
}

export interface CouponValidationRequest {
  couponCode: string;
  userId?: string;
}

export interface CouponValidationResponse {
  valid: boolean;
  message: string;
  coupon?: {
    id: string;
    code: string;
    discount: number;
    storeName: string;
  };
}

export interface CouponApplyRequest {
  couponCode: string;
  cart: CartProductType[];
}

export interface CouponApplyResponse {
  success: boolean;
  message: string;
  coupon?: AppliedCouponType;
}

export interface CouponRemoveRequest {
  couponId: string;
  userId?: string;
}

export interface CouponRemoveResponse {
  success: boolean;
  message: string;
  coupon?: {
    id: string;
    code: string;
  };
}
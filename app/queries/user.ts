"use server";

import { CartItem, PrismaClient, ShippingAddress } from "@prisma/client";
import { validateRequest } from "@/app/auth";
import { CartProductType, CartWithCartItemsType } from "@/app/lib/types";
import { getCookie } from "cookies-next";
import {
  getDeliveryDetailsForStoreByCountry,
  getProductShippingFee,
  getShippingDetails,
} from "./product";
import { cookies } from "next/headers";
import { Country as CountryDB } from "@prisma/client";

// Prisma client
const prisma = new PrismaClient();

/**
 * @name followStore
 * @description - Kullanıcının bir mağazayı takip etme ve takipten çıkma işlemi.
 *                - Eğer kullanıcı mağazayı takip etmiyorsa, mağazayı takip eder.
 *                - Eğer kullanıcı mağazayı zaten takip ediyorsa, takipten çıkar.
 * @param storeId - Takip edilecek/edilecek mağazanın ID'si.
 * @returns {boolean} - Eğer kullanıcı mağazayı takip ediyorsa true, takipten çıkarsa false döner.
 */
export const followStore = async (storeId: string): Promise<boolean> => {
  try {
    // Şu anki doğrulama kullanıcı bilgisini al
    const { user } = await validateRequest();

    // Kullanıcının doğrulanmamış olduğuna bak
    if (!user) throw new Error("Unauthenticated");

    // Mağazanın mevcut olup olmadığını kontrol et
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) throw new Error("Store not found.");

    // Kullanıcıyı kontrol et
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userData) throw new Error("User not found.");

    // Kullanıcının zaten mağazayı takip edip etmediğini kontrol et
    const userFollowingStore = await prisma.userFollowingStore.findFirst({
      where: {
        userId: user.id,
        storeId: storeId,
      },
    });

    if (userFollowingStore) {
      // Eğer zaten takip ediyorsa, takipten çıkar
      await prisma.userFollowingStore.delete({
        where: { id: userFollowingStore.id },
      });
      return false;
    } else {
      // Eğer takip etmiyorsa, takip et
      await prisma.userFollowingStore.create({
        data: {
          userId: user.id,
          storeId: storeId,
        },
      });
      return true;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong.");
  }
};

/**
 * @name UserInfo
 * @description - Kullanıcı bilgilerini döndürür.
 * @returns {object | null} - Eğer kullanıcı varsa kullanıcı bilgilerini döndürür, yoksa null döner.
 */
export const UserInfo = async () => {
  try {
    const result = await validateRequest();
    if (result.user) {
      return result.user; // Kullanıcı varsa döndür
    }
    return null; // Kullanıcı yoksa null döndür
  } catch (error) {
    console.error("Error in UserInfo:", error);
    return null; // Hata durumunda null döndür
  }
};

export const saveUserCart = async (
  cartProducts: CartProductType[],
): Promise<boolean> => {
  // Get current user
  const { user } = await validateRequest();

  // Ensure user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  const userId = user.id;

  // Search for existing user cart
  const userCart = await prisma.cart.findFirst({
    where: { userId },
  });

  // Delete any existing user cart
  if (userCart) {
    await prisma.cart.delete({
      where: {
        userId,
      },
    });
  }

  // Fetch product, variant, and size data from the database for validation
  const validatedCartItems = await Promise.all(
    cartProducts.map(async (cartProduct) => {
      const { productId, variantId, sizeId, quantity } = cartProduct;

      // Fetch the product, variant, and size from the database
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          store: true,
          freeShipping: {
            include: {
              eligableCountries: true,
            },
          },
          variants: {
            where: {
              id: variantId,
            },
            include: {
              sizes: {
                where: {
                  id: sizeId,
                },
              },
              images: true,
            },
          },
        },
      });

      if (
        !product ||
        product.variants === 0 ||
        product.variants[0].sizes.length === 0
      ) {
        throw new Error(
          `Invalid product, variant, or size combination for productId ${productId}, variantId ${variantId}, sizeId ${sizeId}`,
        );
      }

      const variant = product.variants[0];
      const size = variant.sizes[0];

      // Validate stock and price
      const validQuantity = Math.min(quantity, size.quantity);

      const price = size.discount
        ? size.price - size.price * (size.discount / 100)
        : size.price;

      // Calculate Shipping details
      const countryCookie = (await cookies()).get("userCountry");

      let details = {
        shippingFee: 0,
        extraShippingFee: 0,
        isFreeShipping: false,
      };

      if (countryCookie?.value) {
        const country = JSON.parse(countryCookie.value);
        const temp_details = await getShippingDetails(
          product.shippingFeeMethod,
          country,
          product.store,
          product.freeShipping,
        );
        if (typeof temp_details !== "boolean") {
          details = temp_details;
        }
      }

      let shippingFee = 0;
      const { shippingFeeMethod } = product;
      if (shippingFeeMethod === "ITEM") {
        shippingFee =
          quantity === 1
            ? details.shippingFee
            : details.shippingFee + details.extraShippingFee * (quantity - 1);
      } else if (shippingFeeMethod === "WEIGHT") {
        shippingFee = details.shippingFee * variant.weight * quantity;
      } else if (shippingFeeMethod === "FIXED") {
        shippingFee = details.shippingFee;
      }

      const totalPrice = price * validQuantity + shippingFee;
      return {
        productId,
        variantId,
        productSlug: product.slug,
        variantSlug: variant.slug,
        sizeId,
        storeId: product.storeId,
        sku: variant.sku,
        name: `${product.name} · ${variant.variantName}`,
        image: variant.images[0].url,
        size: size.size,
        quantity: validQuantity,
        price,
        shippingFee,
        totalPrice,
      };
    }),
  );

  // Recalculate the cart's total price and shipping fees
  const subTotal = validatedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingFees = validatedCartItems.reduce(
    (acc, item) => acc + item.shippingFee,
    0,
  );

  const total = subTotal + shippingFees;

  // Save the validated items to the cart in the database
  const cart = await prisma.cart.create({
    data: {
      cartItems: {
        create: validatedCartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          sizeId: item.sizeId,
          storeId: item.storeId,
          sku: item.sku,
          productSlug: item.productSlug,
          variantSlug: item.variantSlug,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
          shippingFee: item.shippingFee,
          totalPrice: item.totalPrice,
        })),
      },
      shippingFees,
      subTotal,
      total,
      userId,
    },
  });
  if (cart) return true;
  return false;
};

export const upsertShippingAddress = async (address: ShippingAddress) => {
  try {
    const { user } = await validateRequest(); // Kullanıcı doğrulama
    if (!user) throw new Error("Unauthenticated."); // Eğer kullanıcı doğrulanmamışsa hata fırlat
    if (!address) throw new Error("Please provide address data."); // Eğer adres verilmemişse hata fırlat

    // Eğer varsayılan adres işaretlenmişse, mevcut varsayılan adresi güncelle
    if (address.default) {
      const existingAddress = await prisma.shippingAddress.findUnique({
        where: { id: address.id },
      });

      if (existingAddress) {
        await prisma.shippingAddress.updateMany({
          where: {
            userId: user.id,
            default: true,
          },
          data: {
            default: false,
          },
        });
      }
    }

    // `user` ve `timestamp`'ları çıkartıyoruz
    const { id, createdAt, updatedAt, user: addressUser, ...rest } = address;

    // Prisma upsert işlemi
    const upsertedAddress = await prisma.shippingAddress.upsert({
      where: { id }, // Adresi bulmak için id kullanılıyor
      update: {
        ...rest, // Diğer adres verileri
        updatedAt: new Date(),
        userId: user.id, // Kullanıcı id'sini buraya ekliyoruz
      },
      create: {
        id,
        ...rest, // Diğer adres verileri
        userId: user.id, // Kullanıcı id'si ile adresi oluşturuyoruz
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return upsertedAddress; // Güncellenen veya oluşturulan adresi döndür
  } catch (error) {
    throw error; // Hata oluşursa, hatayı yakala ve fırlat
  }
};

export const getUserShippingAddresses = async () => {
  try {
    // Get current user
    const { user } = await validateRequest();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Retrieve all shipping addresses for the specified user
    const shippingAddresses = await prisma.shippingAddress.findMany({
      where: {
        userId: user.id,
      },
      include: {
        country: true,
        user: true,
      },
    });

    return shippingAddresses;
  } catch (error) {
    // Log and re-throw any errors
    throw error;
  }
};

export const placeOrder = async (
  shippingAddress: ShippingAddress,
  cartId: string,
): Promise<{ orderId: string }> => {
  // Ensure the user is authenticated
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthenticated.");

  const userId = user.id;

  // Fetch user's cart with all items
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: true,
      coupon: true,
    },
  });

  if (!cart) throw new Error("Cart not found.");

  const cartItems = cart.cartItems;
  const cartCoupon = cart.coupon; // The coupon, if it exists

  // Fetch product, variant, and size data from the database for validation
  const validatedCartItems = await Promise.all(
    cartItems.map(async (cartProduct) => {
      const { productId, variantId, sizeId, quantity } = cartProduct;

      // Fetch the product, variant, and size from the database
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          store: true,
          freeShipping: {
            include: {
              eligableCountries: true,
            },
          },
          variants: {
            where: {
              id: variantId,
            },
            include: {
              sizes: {
                where: {
                  id: sizeId,
                },
              },
              images: true,
            },
          },
        },
      });

      if (
        !product ||
        product.variants.length === 0 ||
        product.variants[0].sizes.length === 0
      ) {
        throw new Error(
          `Invalid product, variant, or size combination for productId ${productId}, variantId ${variantId}, sizeId ${sizeId}`,
        );
      }

      const variant = product.variants[0];
      const size = variant.sizes[0];

      // Validate stock and price
      const validQuantity = Math.min(quantity, size.quantity);

      const price = size.discount
        ? size.price - size.price * (size.discount / 100)
        : size.price;

      // Calculate Shipping details
      const countryId = shippingAddress.countryId;

      const temp_country = await prisma.country.findUnique({
        where: {
          id: countryId,
        },
      });

      if (!temp_country)
        throw new Error("Failed to get Shipping details for order.");

      const country = {
        name: temp_country.name,
        code: temp_country.code,
        city: "",
        region: "",
      };

      let details = {
        shippingFee: 0,
        extraShippingFee: 0,
        isFreeShipping: false,
      };

      if (country) {
        const temp_details = await getShippingDetails(
          product.shippingFeeMethod,
          country,
          product.store,
          product.freeShipping,
        );
        if (typeof temp_details !== "boolean") {
          details = temp_details;
        }
      }
      let shippingFee = 0;
      const { shippingFeeMethod } = product;
      if (shippingFeeMethod === "ITEM") {
        shippingFee =
          quantity === 1
            ? details.shippingFee
            : details.shippingFee + details.extraShippingFee * (quantity - 1);
      } else if (shippingFeeMethod === "WEIGHT") {
        shippingFee = details.shippingFee * variant.weight * quantity;
      } else if (shippingFeeMethod === "FIXED") {
        shippingFee = details.shippingFee;
      }

      const totalPrice = price * validQuantity + shippingFee;
      return {
        productId,
        variantId,
        productSlug: product.slug,
        variantSlug: variant.slug,
        sizeId,
        storeId: product.storeId,
        sku: variant.sku,
        name: `${product.name} · ${variant.variantName}`,
        image: variant.images[0].url,
        size: size.size,
        quantity: validQuantity,
        price,
        shippingFee,
        totalPrice,
      };
    }),
  );

  // Define the type for grouped items by store
  type GroupedItems = { [storeId: string]: typeof validatedCartItems };

  // Group validated items by store
  const groupedItems = validatedCartItems.reduce<GroupedItems>((acc, item) => {
    if (!acc[item.storeId]) acc[item.storeId] = [];
    acc[item.storeId].push(item);
    return acc;
  }, {} as GroupedItems);

  // Create the order
  const order = await prisma.order.create({
    data: {
      userId: userId,
      shippingAddressId: shippingAddress.id,
      orderStatus: "Pending",
      paymentStatus: "Pending",
      subTotal: 0, // Will calculate below
      shippingFees: 0, // Will calculate below
      total: 0, // Will calculate below
    },
  });

  // Iterate over each store's items and create OrderGroup and OrderItems
  let orderTotalPrice = 0;
  let orderShippingFee = 0;

  for (const [storeId, items] of Object.entries(groupedItems)) {
    // Calculate store-specific totals
    const groupedTotalPrice = items.reduce(
      (acc, item) => acc + item.totalPrice,
      0,
    );

    const groupShippingFees = items.reduce(
      (acc, item) => acc + item.shippingFee,
      0,
    );

    const { shippingService, deliveryTimeMin, deliveryTimeMax } =
      await getDeliveryDetailsForStoreByCountry(
        storeId,
        shippingAddress.countryId,
      );

    // Check coupon store
    const check = storeId === cartCoupon?.storeId;

    // Calculate discount based on coupon
    let discountedAmount = 0;
    if (check && cartCoupon) {
      discountedAmount = (groupedTotalPrice * cartCoupon.discount) / 100;
    }

    // Calculate the total after applying the discount
    const totalAfterDiscount = groupedTotalPrice - discountedAmount;
    // Create an OrderGroup for this store
    const orderGroup = await prisma.orderGroup.create({
      data: {
        orderId: order.id,
        storeId: storeId,
        status: "Pending",
        subTotal: groupedTotalPrice - groupShippingFees,
        shippingFees: groupShippingFees,
        total: totalAfterDiscount,
        shippingService: shippingService || "International Delivery",
        shippingDeliveryMin: deliveryTimeMin || 7,
        shippingDeliveryMax: deliveryTimeMax || 30,
        couponId: check && cartCoupon ? cartCoupon?.id : null,
      },
    });

    // Create OrderItems for this OrderGroup
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderGroupId: orderGroup.id,
          productId: item.productId,
          variantId: item.variantId,
          sizeId: item.sizeId,
          productSlug: item.productSlug,
          variantSlug: item.variantSlug,
          sku: item.sku,
          name: item.name,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          shippingFee: item.shippingFee,
          totalPrice: item.totalPrice,
        },
      });
    }

    // Update order totals
    orderTotalPrice += totalAfterDiscount;
    orderShippingFee += groupShippingFees;
  }

  // Update the main order with the final totals
  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      subTotal: orderTotalPrice - orderShippingFee,
      shippingFees: orderShippingFee,
      total: orderTotalPrice,
    },
  });

  // await prisma.cart.delete({
  //   where: {
  //     id: cartId,
  //   },
  // });

  return {
    orderId: order.id,
  };
};

export const emptyUserCart = async () => {
  try {
    // Ensure the user is authenticated
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthenticated.");

    const userId = user.id;

    const res = await prisma.cart.delete({
      where: {
        userId,
      },
    });
    if (res) return true;
  } catch (error) {
    throw error;
  }
};

export const updateCartWithLatest = async (
  cartProducts: CartProductType[],
): Promise<CartProductType[]> => {
  // Fetch product, variant, and size data from the database for validation
  const validatedCartItems = await Promise.all(
    cartProducts.map(async (cartProduct) => {
      const { productId, variantId, sizeId, quantity } = cartProduct;

      // Fetch the product, variant, and size from the database
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          store: true,
          freeShipping: {
            include: {
              eligableCountries: true,
            },
          },
          variants: {
            where: {
              id: variantId,
            },
            include: {
              sizes: {
                where: {
                  id: sizeId,
                },
              },
              images: true,
            },
          },
        },
      });

      if (
        !product ||
        product.variants.length === 0 ||
        product.variants[0].sizes.length === 0
      ) {
        throw new Error(
          `Invalid product, variant, or size combination for productId ${productId}, variantId ${variantId}, sizeId ${sizeId}`,
        );
      }

      const variant = product.variants[0];
      const size = variant.sizes[0];

      // Calculate Shipping details
      // const countryCookie = getCookie("userCountry", { cookies });

      const countryCookie = await getCookie("userCountry", { cookies });

      let details = {
        shippingService: product.store.defaultShippingService,
        shippingFee: 0,
        extraShippingFee: 0,
        isFreeShipping: false,
        deliveryTimeMin: 0,
        deliveryTimeMax: 0,
      };

      if (countryCookie) {
        const country = JSON.parse(countryCookie);
        const temp_details = await getShippingDetails(
          product.shippingFeeMethod,
          country,
          product.store,
          product.freeShipping,
        );

        if (typeof temp_details !== "boolean") {
          details = temp_details;
        }
      }

      const price = size.discount
        ? size.price - (size.price * size.discount) / 100
        : size.price;

      const validated_qty = Math.min(quantity, size.quantity);

      return {
        productId,
        variantId,
        productSlug: product.slug,
        variantSlug: variant.slug,
        sizeId,
        sku: variant.sku,
        name: product.name,
        variantName: variant.variantName,
        image: variant.images[0].url,
        variantImage: variant.variantImage,
        stock: size.quantity,
        weight: variant.weight,
        shippingMethod: product.shippingFeeMethod,
        size: size.size,
        quantity: validated_qty,
        price,
        shippingService: details.shippingService,
        shippingFee: details.shippingFee,
        extraShippingFee: details.extraShippingFee,
        deliveryTimeMin: details.deliveryTimeMin,
        deliveryTimeMax: details.deliveryTimeMax,
        isFreeShipping: details.isFreeShipping,
      };
    }),
  );
  return validatedCartItems;
};

export const addToWishlist = async (
  productId: string,
  variantId: string,
  sizeId?: string,
) => {
  // Ensure the user is authenticated
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthenticated.");

  const userId = user.id;

  try {
    const existingWIshlistItem = await prisma.wishlist.findFirst({
      where: {
        userId,
        productId,
        variantId,
      },
    });

    if (existingWIshlistItem) {
      throw new Error("Product is already in the wishlist");
    }

    return await prisma.wishlist.create({
      data: {
        userId,
        productId,
        variantId,
        sizeId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateCheckoutProductstWithLatest = async (
  cartProducts: CartItem[],
  address: CountryDB | undefined,
): Promise<CartWithCartItemsType> => {
  // Fetch product, variant, and size data from the database for validation
  const validatedCartItems = await Promise.all(
    cartProducts.map(async (cartProduct) => {
      const { productId, variantId, sizeId, quantity } = cartProduct;

      // Fetch the product, variant, and size from the database
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          store: true,
          freeShipping: {
            include: {
              eligableCountries: true,
            },
          },
          variants: {
            where: {
              id: variantId,
            },
            include: {
              sizes: {
                where: {
                  id: sizeId,
                },
              },
              images: true,
            },
          },
        },
      });

      if (
        !product ||
        product.variants.length === 0 ||
        product.variants[0].sizes.length === 0
      ) {
        throw new Error(
          `Invalid product, variant, or size combination for productId ${productId}, variantId ${variantId}, sizeId ${sizeId}`,
        );
      }

      const variant = product.variants[0];
      const size = variant.sizes[0];

      // Calculate Shipping details
      // const countryCookie = getCookie("userCountry", { cookies });

      const countryCookie = await getCookie("userCountry", { cookies });

      const country = address
        ? address
        : countryCookie
          ? JSON.parse(countryCookie)
          : null;

      if (!country) {
        throw new Error("Couldn't retrieve country data");
      }

      let shippingFee = 0;

      const { shippingFeeMethod, freeShipping, store } = product;

      const fee = await getProductShippingFee(
        shippingFeeMethod,
        country,
        store,
        freeShipping,
        variant.weight,
        quantity,
      );

      if (fee) {
        shippingFee = fee;
      }

      const price = size.discount
        ? size.price - (size.price * size.discount) / 100
        : size.price;

      const validated_qty = Math.min(quantity, size.quantity);

      const totalPrice = price * validated_qty + shippingFee;

      try {
        const newCartItem = await prisma.cartItem.update({
          where: {
            id: cartProduct.id,
          },
          data: {
            name: `${product.name} · ${variant.variantName}`,
            image: variant.images[0].url,
            price,
            quantity: validated_qty,
            shippingFee,
            totalPrice,
          },
        });
        return newCartItem;
      } catch (error) {
        return cartProduct;
      }
    }),
  );

  // Apply coupon if exist
  const cartCoupon = await prisma.cart.findUnique({
    where: {
      id: cartProducts[0].cartId,
    },
    select: {
      coupon: {
        include: {
          store: true,
        },
      },
    },
  });
  // Recalculate the cart's total price and shipping fees
  const subTotal = validatedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingFees = validatedCartItems.reduce(
    (acc, item) => acc + item.shippingFee,
    0,
  );

  let total = subTotal + shippingFees;

  // Apply coupon discount if applicable
  if (cartCoupon?.coupon) {
    const { coupon } = cartCoupon;

    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    if (currentDate > startDate && currentDate < endDate) {
      // Check if the coupon applies to any store in the cart
      const applicableStoreItems = validatedCartItems.filter(
        (item) => item.storeId === coupon.storeId,
      );

      if (applicableStoreItems.length > 0) {
        // Calculate subtotal for the coupon's store (including shipping fees)
        const storeSubTotal = applicableStoreItems.reduce(
          (acc, item) => acc + item.price * item.quantity + item.shippingFee,
          0,
        );
        // Apply coupon discount to the store's subtotal
        const discountedAmount = (storeSubTotal * coupon.discount) / 100;
        total -= discountedAmount;
      }
    }
  }

  const cart = await prisma.cart.update({
    where: {
      id: cartProducts[0].cartId,
    },
    data: {
      subTotal,
      shippingFees,
      total,
    },
    include: {
      cartItems: true,
      coupon: {
        include: {
          store: true,
        },
      },
    },
  });

  if (!cart) throw new Error("Somethign went wrong !");

  return cart;
};

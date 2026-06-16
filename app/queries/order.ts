"use server";

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { OrderStatus, ProductStatus } from "@/app/lib/types";

// Function: getOrder
// Description: Retrieves a specific order by its ID and the current user's ID, including associated groups, items, store information,
//              item count, and shipping address.
// Parameters:
//   - params: orderId.
// Returns: Object containing order details with groups sorted by totalPrice in descending order.
export const getOrder = async (orderId: string) => {
  // Retrieve current user
  const { user } = await validateRequest();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Get order details, with groups, poroduct items, and ordered by total price
  const order = await db.order.findUnique({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      groups: {
        include: {
          items: true,
          store: true,
          coupon: true,
          _count: {
            select: {
              items: true,
            },
          },
        },
        orderBy: {
          total: "desc",
        },
      },
      shippingAddress: {
        include: {
          country: true,
          user: true,
        },
      },
      paymentDetails: true,
    },
  });

  return order;
};

/**
 * @name updateOrderGroupStatus
 * @description - Updates the status of a specified order group.
 *              - Throws an error if the user is not authenticated or lacks seller privileges.
 * @access User
 * @param storeId - The store id of the seller to verify ownership.
 * @param groupId - The ID of the order group whose status is to be updated.
 * @param status - The new status to be set for the order.
 * @returns {Object} - Updated order status.
 */

export const updateOrderGroupStatus = async (
  storeId: string,
  groupId: string,
  status: OrderStatus,
) => {
  // Retrieve current user
  const { user } = await validateRequest();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Verify seller permission
  if (user.role !== "SELLER")
    throw new Error(
      "Unauthorized Access: Seller Privileges Required for Entry.",
    );

  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  // Verify seller ownership
  if (!store) {
    throw new Error("Unauthorized Access !");
  }

  // Retrieve the order to be updated
  const order = await db.orderGroup.findUnique({
    where: {
      id: groupId,
      storeId: storeId,
    },
  });

  // Ensure order existence
  if (!order) throw new Error("Order not found.");

  // Update the order status
  const updatedOrder = await db.orderGroup.update({
    where: {
      id: groupId,
    },
    data: {
      status,
    },
  });

  return updatedOrder.status;
};

export const updateOrderItemStatus = async (
  storeId: string,
  orderItemId: string,
  status: ProductStatus,
) => {
  // Retrieve current user
  const { user } = await validateRequest();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Verify seller permission
  if (user.role !== "SELLER")
    throw new Error(
      "Unauthorized Access: Seller Privileges Required for Entry.",
    );

  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  // Verify seller ownership
  if (!store) {
    throw new Error("Unauthorized Access !");
  }

  // Retrieve the product item to be updated
  const product = await db.orderItem.findUnique({
    where: {
      id: orderItemId,
    },
  });

  // Ensure order existence
  if (!product) throw new Error("Order item not found.");

  // Update the order status
  const updatedProduct = await db.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: {
      status,
    },
  });

  return updatedProduct.status;
};

export const getOrderJob = async (orderId: string) => {
  // Retrieve current user
  const { user } = await validateRequest();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Get order details with company and plan information
  const order = await db.orderJob.findUnique({
    where: {
      order_id: orderId,
      company: {
        userId: user.id, // This assumes Company has a userId field
      },
    },
    include: {
      company: true, // Include full company details
      plan: true, // Include full plan details
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

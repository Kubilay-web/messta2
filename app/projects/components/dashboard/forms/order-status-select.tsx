import OrderStatusTag from "@/app/projects/components/shared/order-status";
import { useToast } from "@/app/projects/components/ui/use-toast";
import { OrderStatus } from "@/app/lib/types";
import { updateOrderGroupStatus } from "@/app/queries/order";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface Props {
  storeId: string;
  groupId: string;
  status: OrderStatus;
}

const OrderStatusSelect: FC<Props> = ({ groupId, status, storeId }) => {
  const [newStatus, setNewStatus] = useState<OrderStatus>(status);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  // Options
  const options = Object.values(OrderStatus).filter((s) => s !== newStatus);

  // Handle click
  const handleClick = async (selectedStatus: OrderStatus) => {
    try {
      const response = await updateOrderGroupStatus(
        storeId,
        groupId,
        selectedStatus,
      );
      if (response) {
        setNewStatus(response as OrderStatus);
        setIsOpen(false);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.toString(),
      });
    }
  };
  return (
    <div className="relative">
      {/* Current status */}
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <OrderStatusTag status={newStatus} />
      </div>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-[140px] rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-black">
          {options.map((option) => (
            <button
              key={option}
              className="flex w-full items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleClick(option)}
            >
              <OrderStatusTag status={option} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatusSelect;

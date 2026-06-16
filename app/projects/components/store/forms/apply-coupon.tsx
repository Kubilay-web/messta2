import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/projects/components/ui/form";
import { ApplyCouponFormSchema } from "@/app/lib/validation";
import { CartWithCartItemsType } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { applyCoupon } from "@/app/queries/coupon";

export default function ApplyCouponForm({
  cartId,
  setCartData,
}: {
  cartId: string;
  setCartData: Dispatch<SetStateAction<CartWithCartItemsType>>;
}) {
  // Form hook for managing form state and validation
  const form = useForm<z.infer<typeof ApplyCouponFormSchema>>({
    mode: "onChange", // Form validation mode
    resolver: zodResolver(ApplyCouponFormSchema), // Resolver for form validation
    defaultValues: {
      // Setting default form values from data (if available)
      coupon: "",
    },
  });

  // Loading status& Errors
  const { errors, isSubmitting } = form.formState;

  // Submit handler for form submission
  const handleSubmit = async (
    values: z.infer<typeof ApplyCouponFormSchema>
  ) => {
    try {
      const res = await applyCoupon(values.coupon, cartId);
      setCartData(res.cart);
      toast.success(res.message);
    } catch (error: any) {
      // Handling form submission errors
      toast.error(error.toString());
    }
  };

  return (
    <div className="rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Form items */}
          <div className="relative rounded-2xl bg-gray-100 p-1.5 shadow-sm hover:shadow-md">
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      className="w-full rounded-lg bg-transparent py-3 pl-8 pr-24 text-base text-main-primary focus:outline-none"
                      placeholder="Coupon"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              className="absolute right-2 top-1/2 w-20 -translate-y-1/2 rounded-2xl px-6 hover:bg-gray-600"
            >
              Apply
            </Button>
          </div>
          <div className="mt-3">
            {errors.coupon && (
              <FormMessage className="text-xs">
                {errors.coupon.message}
              </FormMessage>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

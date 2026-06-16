"use client";

import { Category } from "@prisma/client";
import { FC, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ShippingRateFormSchema } from "@/app/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/projects/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/projects/components/ui/form";
import { Input } from "@/app/projects/components/ui/input";
import { Button } from "@/app/projects/components/ui/button";

import { v4 } from "uuid";
import { useToast } from "@/app/projects/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CountryWithShippingRatesType } from "@/app/lib/types";
import { NumberInput } from "@tremor/react";
import { Textarea } from "@/app/projects/components/ui/textarea";

import { upsertShippingRate } from "@/app/queries/store";

interface ShippingRateDetailsProps {
  data?: CountryWithShippingRatesType;
  storeUrl: string;
}

const ShippingRateDetails: FC<ShippingRateDetailsProps> = ({
  data,
  storeUrl,
}) => {
  const form = useForm<z.infer<typeof ShippingRateFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ShippingRateFormSchema),
    defaultValues: {
      countryId: data?.countryId,
      countryName: data?.countryName,
      shippingService: data?.shippingRate
        ? data?.shippingRate.shippingService
        : "",
      shippingFeePerItem: data?.shippingRate
        ? data?.shippingRate.shippingFeePerItem
        : 0,
      shippingFeeForAdditionalItem: data?.shippingRate
        ? data?.shippingRate.shippingFeeForAdditionalItem
        : 0,
      shippingFeePerKg: data?.shippingRate
        ? data?.shippingRate.shippingFeePerKg
        : 0,
      shippingFeeFixed: data?.shippingRate
        ? data?.shippingRate.shippingFeeFixed
        : 0,
      deliveryTimeMin: data?.shippingRate
        ? data?.shippingRate.deliveryTimeMin
        : 1,
      deliveryTimeMax: data?.shippingRate
        ? data?.shippingRate.deliveryTimeMax
        : 1,
      returnPolicy: data?.shippingRate ? data.shippingRate.returnPolicy : "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const handleSubmit = async (
    values: z.infer<typeof ShippingRateFormSchema>,
  ) => {
    try {
      const response = await upsertShippingRate(storeUrl, {
        id: data?.shippingRate ? data.shippingRate.id : v4(),
        countryId: data?.countryId ? data.countryId : "",
        shippingService: values.shippingService,
        shippingFeePerItem: values.shippingFeePerItem,
        shippingFeeForAdditionalItem: values.shippingFeeForAdditionalItem,
        shippingFeePerKg: values.shippingFeePerKg,
        shippingFeeFixed: values.shippingFeeFixed,
        deliveryTimeMin: values.deliveryTimeMin,
        deliveryTimeMax: values.deliveryTimeMax,
        returnPolicy: values.returnPolicy,
        storeId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (response.id) {
        // Displaying success message
        toast({
          title: "Shipping rates updated sucessfully !",
        });

        // Redirect or Refresh data
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        description: `Something went wrong.`,
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Shipping Rate</CardTitle>
          <CardDescription>
            Update Shipping rate information for {data?.countryName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="hidden">
                <FormField
                  disabled
                  control={form.control}
                  name="countryId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  disabled
                  control={form.control}
                  name="countryName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="shippingService"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="Shipping service" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="shippingFeePerItem"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Shipping fee per item</FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          step={0.1}
                          min={0}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Shipping fee per item"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="shippingFeeForAdditionalItem"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Shipping fee for additional item</FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          step={0.1}
                          min={0}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Shipping fee per item"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="shippingFeePerKg"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Shipping fee per kg</FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          step={0.1}
                          min={0}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Shipping fee per kg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="shippingFeeFixed"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Fixed Shipping fee</FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          step={0.1}
                          min={0}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Fixed shipping fee"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="deliveryTimeMin"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Delivery time min </FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          min={1}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Minimum Delivery time (days)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="deliveryTimeMax"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Delivery time max </FormLabel>
                      <FormControl>
                        <NumberInput
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          min={1}
                          className="rounded-md pl-2 !shadow-none"
                          placeholder="Maximum Delivery time (days)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="returnPolicy"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Return policy</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="What's the return policy for your store ?"
                          className="p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "loading..." : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default ShippingRateDetails;

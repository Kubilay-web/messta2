"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Country } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema ve tipler
import { ShippingAddressSchema } from "@/app/lib/validation";
import { SelectMenuOption, UserShippingAddressType } from "@/app/lib/types";

// UI Bileşenleri
import CountrySelector from "@/app/projects/components/shared/country-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/projects/components/ui/form";
import { Input } from "@/app/projects/components/ui/input";
import { Button } from "@/app/projects/components/ui/button";
import { useToast } from "@/app/projects/components/ui/use-toast";

// Araçlar
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { upsertShippingAddress } from "@/app/queries/user";

interface AddressDetailsProps {
  data?: UserShippingAddressType;
  countries: Country[];
  setShow: Dispatch<SetStateAction<boolean>>;
}

const AddressDetails: FC<AddressDetailsProps> = ({
  data,
  countries,
  setShow,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>(
    data?.country?.name || countries[0]?.name || "Afghanistan",
  );

  // ✅ FORM OLUŞTURMA
  const form = useForm<z.infer<typeof ShippingAddressSchema>>({
    mode: "onChange",
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      phone: data?.phone ?? "",
      address1: data?.address1 ?? "",
      address2: data?.address2 ?? "",
      city: data?.city ?? "",
      state: data?.state ?? "",
      zip_code: data?.zip_code ?? "",
      countryId: data?.countryId ?? countries[0]?.id ?? "",
      default: data?.default ?? false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  // ✅ ÜLKE DEĞİŞTİĞİNDE FORM GÜNCELLE
  const handleCountryChange = (name: string) => {
    const selected = countries.find((c) => c.name === name);
    if (selected) {
      form.setValue("countryId", selected.id, { shouldValidate: true });
      setCountry(selected.name);
    }
  };

  // ✅ DATA VARSA FORMU RESETLE
  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        phone: data.phone ?? "",
        address1: data.address1 ?? "",
        address2: data.address2 ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        zip_code: data.zip_code ?? "",
        countryId: data.countryId ?? countries[0]?.id ?? "",
        default: data.default ?? false,
      });
      if (data.country?.name) handleCountryChange(data.country.name);
    }
  }, [data]);

  // ✅ FORM SUBMIT
  const handleSubmit = async (values: z.infer<typeof ShippingAddressSchema>) => {
    console.log("Form values:", values); // ✅ Artık undefined olmayacak

    try {
      const response = await upsertShippingAddress({
        id: data?.id ?? v4(),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        address1: values.address1.trim(),
        address2: values.address2?.trim() || "",
        city: values.city.trim(),
        countryId: values.countryId,
        state: values.state.trim(),
        default: values.default ?? false,
        zip_code: values.zip_code.trim(),
        userId: "", // backend dolduracak
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: data?.id
          ? "Shipping address updated successfully."
          : "New shipping address created.",
        duration: 3000,
      });

      router.refresh();
      setShow(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* CONTACT */}
          <div className="space-y-2">
            <FormLabel>Contact information</FormLabel>
            <div className="flex flex-col gap-3 md:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="First name*"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Last name*"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="!mt-3 flex-1 md:w-[calc(50%-8px)]">
                  <FormControl>
                    <Input
                      placeholder="Phone number*"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ADDRESS */}
          <div className="space-y-2">
            <FormLabel>Address</FormLabel>
            <FormField
              control={form.control}
              name="countryId"
              render={() => (
                <FormItem className="!mt-3 flex-1 md:w-[calc(50%-8px)]">
                  <FormControl>
                    <CountrySelector
                      id="countries"
                      open={isOpen}
                      onToggle={() => setIsOpen((prev) => !prev)}
                      onChange={(val) => handleCountryChange(val)}
                      selectedValue={
                        (countries.find(
                          (c) => c.name === country,
                        ) as SelectMenuOption) || countries[0]
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Street, house/apartment/unit*"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apt, suite, unit (optional)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="State*"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="City*"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem className="!mt-3 w-[calc(50%-8px)] flex-1">
                  <FormControl>
                    <Input
                      placeholder="Zip code*"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-md text-white"
          >
            {isLoading
              ? "Saving..."
              : data?.id
              ? "Save address information"
              : "Create address"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressDetails;

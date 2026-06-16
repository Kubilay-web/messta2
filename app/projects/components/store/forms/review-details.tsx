"use client";
import { Form, FormControl, FormField, FormItem } from "@/app/projects/components/ui/form";
import { AddReviewSchema } from "@/app/lib/validation";
import StarRatings from "react-star-ratings";
import {
  ProductVariantDataType,
  RatingStatisticsType,
  ReviewDetailsType,
  ReviewWithImageType,
} from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { z } from "zod";
import Select from "../ui/select";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { PulseLoader } from "react-spinners";
import ImageUploadStore from "../shared/upload-images";
import { upsertReview } from "@/app/queries/review";

export default function ReviewDetails({
  productId,
  data,
  variantsInfo,
  setReviews,
  reviews,
  setStatistics,
  setAverageRating,
}: {
  productId: string;
  data?: ReviewDetailsType;
  variantsInfo: ProductVariantDataType[];
  reviews: ReviewWithImageType[];
  setReviews: Dispatch<SetStateAction<ReviewWithImageType[]>>;
  setStatistics: Dispatch<SetStateAction<RatingStatisticsType>>;
  setAverageRating: Dispatch<SetStateAction<number>>;
}) {
  const [activeVariant, setActiveVariant] = useState<ProductVariantDataType>(
    variantsInfo[0],
  );
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [sizes, setSizes] = useState<{ name: string; value: string }[]>([]);

  const form = useForm<z.infer<typeof AddReviewSchema>>({
    mode: "onChange",
    resolver: zodResolver(AddReviewSchema),
    defaultValues: {
      variantName: data?.variant || activeVariant.variantName,
      variantImage: data?.variantImage || activeVariant.variantImage,
      rating: data?.rating || 0,
      size: data?.size || "",
      review: data?.review || "",
      quantity: data?.quantity || undefined,
      images: data?.images || [],
      color: data?.color,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleSubmit = async (values: z.infer<typeof AddReviewSchema>) => {
    try {
      const response = await upsertReview(productId, {
        // ID'yi kaldırdık, Prisma otomatik oluşturacak
        variant: values.variantName,
        variantImage: values.variantImage,
        images: values.images,
        quantity: values.quantity,
        rating: values.rating,
        review: values.review,
        size: values.size,
        color: values.color,
      });

      if (response.review.id) {
        const rev = reviews.filter((rev) => rev.id !== response.review.id);
        setReviews([...rev, response.review]);
        setStatistics(response.statistics);
        setAverageRating(response.rating);
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  const variants = variantsInfo.map((v) => ({
    name: v.variantName,
    value: v.variantName,
    image: v.variantImage,
    colors: Array.isArray(v.colors)
      ? v.colors.map((c) => c.name).join(",")
      : "",
  }));

  useEffect(() => {
    form.setValue("size", "");
    const name = form.getValues().variantName;
    const variant = variantsInfo.find((v) => v.variantName === name);
    if (variant) {
      const sizes_data = variant.sizes.map((s) => ({
        name: s.size,
        value: s.size,
      }));
      setActiveVariant(variant);
      if (sizes) setSizes(sizes_data);
      form.setValue(
        "color",
        (variant.colors && Array.isArray(variant.colors)
          ? variant.colors.map((c) => c.name)
          : []
        ).join(","),
      );
      form.setValue("variantImage", variant.variantImage);
    }
  }, [form.getValues().variantName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("quantity", e.target.value);
  };

  return (
    <div>
      <div className="rounded-xl bg-[#f5f5f5] p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="pt-4">
                <h1 className="text-2xl font-bold">Add a review</h1>
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-x-2">
                          <StarRatings
                            rating={field.value}
                            starRatedColor="#FFD804"
                            starEmptyColor="#e2dfdf"
                            starHoverColor="#FFD804"
                            changeRating={field.onChange}
                            numberOfStars={5}
                            name="rating"
                            starDimension="40px"
                            starSpacing="2px"
                          />
                          <span>
                            ( {form.getValues().rating.toFixed(1)} out of 5.0)
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-wrap gap-4">
                  <div className="w-full sm:w-fit">
                    <FormField
                      control={form.control}
                      name="variantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                              options={variants}
                              placeholder="Select product"
                              subPlaceholder="Please select a product"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            options={sizes}
                            placeholder="Select size"
                            subPlaceholder="Please select a size"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            name="quantity"
                            type="number"
                            placeholder="Quantity (Optional)"
                            onChange={handleInputChange}
                            value={field.value ? field.value.toString() : ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          className="min-h-32 w-full rounded-xl p-4 ring-1 ring-[transparent] focus:outline-none focus:ring-[#11BE86]"
                          placeholder="Write your review..."
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="w-full xl:border-r">
                      <FormControl>
                        <ImageUploadStore
                          value={field.value.map((image) => image.url)}
                          disabled={isLoading}
                          onChange={(url) => {
                            setImages((prevImages) => {
                              const updatedImages = [...prevImages, { url }];
                              if (updatedImages.length <= 3) {
                                field.onChange(updatedImages);
                                return updatedImages;
                              } else {
                                return prevImages;
                              }
                            });
                          }}
                          onRemove={(url) =>
                            field.onChange([
                              ...field.value.filter(
                                (current) => current.url !== url,
                              ),
                            ])
                          }
                          maxImages={3}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 text-destructive">
                {errors.rating && <p>{errors.rating.message}</p>}
                {errors.size && <p>{errors.size.message}</p>}
                {errors.review && <p>{errors.review.message}</p>}
              </div>
              <div className="flex w-full justify-end">
                <Button type="submit" className="h-12 w-36">
                  {isLoading ? (
                    <PulseLoader size={5} color="#fff" />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

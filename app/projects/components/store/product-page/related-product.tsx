"use client";
import { ProductType } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import ProductList from "../shared/product-list";

export default function RelatedProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="mt-4 space-y-1">
      <ProductList products={products} title="Related products" />
    </div>
  );
}

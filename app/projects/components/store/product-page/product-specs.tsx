import { cn } from "@/app/lib/utils";
import { FC } from "react";

interface Spec {
  name: string;
  value: string;
}

interface Props {
  specs: {
    product: Spec[];
    variant: Spec[] | undefined;
  };
}

const ProductSpecs: FC<Props> = ({ specs }) => {
  const { product, variant = [] } = specs;
  const newSpecs = [...product, ...variant];
  return (
    <div className="pt-6">
      {/* Title */}
      <div className="h-12">
        <h2 className="text-2xl font-bold text-main-primary">Specifications</h2>
      </div>
      {/* Product Specs Table */}
      <SpecTable data={newSpecs} />
    </div>
  );
};

export default ProductSpecs;

const SpecTable = ({
  data,
  noTopBorder,
}: {
  data: Spec[];
  noTopBorder?: boolean;
}) => {
  return (
    <ul
      className={cn("grid border md:grid-cols-2", {
        "border-t-0": noTopBorder,
      })}
    >
      {data.map((spec, i) => (
        <li
          key={i}
          className={cn("flex border-t", {
            "border-t-0": i === 0,
          })}
        >
          <div className="relative float-left flex text-sm leading-7">
            <div className="min-w-44 bg-[#f5f5f5] p-4 text-main-primary">
              <span className="leading-5">{spec.name}</span>
            </div>
            <div className="w-full flex-1 break-words p-4 leading-5 text-[#151515]">
              <span className="w-full flex-1 leading-5">{spec.value}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

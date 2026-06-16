
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';



const SpkPosSystemCard = ({ product }: any) => {
  return (
    <Fragment>
      <div className={`xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12 card-item ${product.category}`} data-category={product.category}>
        <div className={`box ${product.outOfStock ? 'out-of-stock' : ''}`}>
          <Image fill src={product.image} className="card-img-top" alt={product.name} />
          <div className="box-body">
            <div className="mb-2">
              <Link scroll={false} href="#!" className="font-medium text-[1rem]">{product.name}</Link>
              <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 block">{product.subcategory}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h5 className="font-semibold mb-0">${product.price}</h5>
                {product.originalPrice && (
                  <span className="text-textmuted dark:text-textmuted/50 text-[0.8125rem] line-through">${product.originalPrice}</span>
                )}
              </div>
              <div className="hs-tooltip ti-main-tooltip">
                <Link scroll={false} href="#!" className="ti-btn ti-btn-primary ti-btn-icon ti-btn-sm btn-wave hs-tooltip-toggle">
                  <i className="ri-add-fill"></i>
                  <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                    Add To Cart
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default SpkPosSystemCard;

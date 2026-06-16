import Link from 'next/link';
import React, { Fragment } from 'react'

interface BreadcrumbItem {
    label: string;
    to?: string;
    icon?: React.ReactNode; // Optional icon for the item
    isActive?: boolean;
  }
  
  interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?:React.ReactNode;
    SvgIcon?:string;
    SvgClass?:string;
    Svgstrokewidth?:string;
    Customerclass?:string;
  }

const SpkBreadcrumb : React.FC<BreadcrumbProps> = ({ items,Customerclass, separator, SvgIcon , SvgClass, Svgstrokewidth}) => {
  return (
    <Fragment>
      <ol className={`flex items-center whitespace-nowrap min-w-0 ${Customerclass}`} >
      {items.map((item, index) => (
        <li
          key={index}
          className={`text-sm ${
            item.isActive
              ? "text-primary dark:text-primary"
              : "text-gray-500 dark:text-[#8c9097] truncate"
          }`}
          aria-current={index === items.length - 1 ? "page" : undefined}
        >
          <Link
            className={`flex items-center ${
                item.isActive ? "text-primary dark:text-primary" : ""
              }`}
            href={item.to || "#"}
          >
             {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {item.label}
            {index !== items.length - 1 &&
              (separator ? (
                separator
              ) : (
                <svg
                  className={SvgClass}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={SvgIcon}
                    stroke="currentColor"
                    strokeWidth={Svgstrokewidth}
                    strokeLinecap="round"
                  />
                </svg>
              ))}
          </Link>
        </li>
      ))}
    </ol>
    </Fragment>
  )
}

export default SpkBreadcrumb
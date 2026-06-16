"use client";
import AddNewButton from "../../components/FormInputs/AddNewButton";
import React, { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option | Option[] | null; // Array olabileceğini belirt
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean; // isMultiple prop'u ekle
};

export default function FormMultipleSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
  isMultiple = true, // Varsayılan olarak true
}: FormSelectInputProps) {
  function handleChange(item: any) {
    setOption(item);
    console.log(item);
  }

  // Option'ların formatını kontrol et ve düzelt
  const formattedOptions = options?.map((opt: any) => {
    if (typeof opt === "string") {
      return { label: opt, value: opt };
    }
    if (opt && typeof opt === "object") {
      return {
        label: opt.label || opt.name || String(opt),
        value: opt.value || opt.id || String(opt),
      };
    }
    return opt;
  });

  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          classNames={{
            searchIcon: "hidden",
          }}
          isSearchable={isSearchable}
          primaryColor="blue"
          value={option}
          onChange={handleChange}
          options={formattedOptions}
          placeholder={label}
          isMultiple={isMultiple}
          isClearable={true}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}

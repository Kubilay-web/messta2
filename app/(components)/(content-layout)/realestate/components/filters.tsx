"use client";

import {
  furnishingTypes,
  parkingTypes,
  propertyStatuses,
  propertyTypes,
} from "../constants";
import { Button, Form, Input, InputNumber, Modal, Select, Tag } from "antd";
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

function Filters({ searchParams }: { searchParams: SearchParams }) {
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  // ✅ URL parametrelerini form'a yükle
  useEffect(() => {
    const params: Record<string, any> = {};
    
    // Tüm URL parametrelerini al
    urlSearchParams.forEach((value, key) => {
      if (value) {
        params[key] = value;
      }
    });
    
    // Form değerlerini güncelle
    form.setFieldsValue(params);
  }, [urlSearchParams, form]);

  // ✅ FORM SUBMIT
  const onFinish = (values: Record<string, any>) => {
    const formattedData: Record<string, string> = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formattedData[key] = String(value);
      }
    });

    const queryString = new URLSearchParams(formattedData).toString();
    router.push(`${pathname}?${queryString}`);
    setShowFiltersModal(false);
  };

  // ✅ SADECE STRING OLAN PARAMETRELERİ GÖSTER
  const safeSearchParams: Record<string, string> = {};
  Object.entries(searchParams || {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      safeSearchParams[key] = value;
    }
  });

  // ✅ TÜM FİLTRELERİ TEMİZLE
  const handleClearAll = () => {
    form.resetFields();
    router.push(pathname);
  };

  // ✅ TEK FİLTREYİ KALDIR
  const handleRemoveFilter = (key: string) => {
    const currentParams = new URLSearchParams(urlSearchParams.toString());
    currentParams.delete(key);
    
    // Form'dan da kaldır
    form.setFieldValue(key, undefined);
    
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between p-5 border rounded-sm border-gray-300 mb-5 items-center mt-5">
        <div>
          {Object.keys(safeSearchParams).length === 0 ? (
            <span className="text-gray-500 text-sm">No filters applied</span>
          ) : (
            <div className="flex flex-wrap gap-5">
              {Object.entries(safeSearchParams).map(([key, value]) => (
                <div className="capitalize flex flex-col gap-1" key={key}>
                  <span className="text-gray-500 text-sm">{key}</span>
                  <Tag
                    closable
                    onClose={() => handleRemoveFilter(key)}
                    className="flex items-center gap-1 border border-solid border-primary"
                  >
                    <span className="text-primary text-sm">{value}</span>
                  </Tag>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleClearAll}>Clear</Button>
          <Button className="bg-primary" type="primary" onClick={() => setShowFiltersModal(true)}>
            Show Filters
          </Button>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        title={
          <h1 className="text-xl font-semibold text-primary text-center uppercase">
            Apply Filters
          </h1>
        }
        open={showFiltersModal}
        footer={null}
        onCancel={() => setShowFiltersModal(false)}
        centered
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Form.Item label="Property Type" name="type">
              <Select 
                options={propertyTypes} 
                allowClear 
                placeholder="Select type"
              />
            </Form.Item>

            <Form.Item label="Rent / Sale" name="status">
              <Select 
                options={propertyStatuses} 
                allowClear 
                placeholder="Select status"
              />
            </Form.Item>

            <Form.Item label="City" name="city">
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item label="Age" name="age">
              <InputNumber 
                className="w-full" 
                placeholder="Enter age" 
                min={0}
              />
            </Form.Item>

            <Form.Item label="Furnishing" name="furnishing">
              <Select 
                options={furnishingTypes} 
                allowClear 
                placeholder="Select furnishing"
              />
            </Form.Item>

            <Form.Item label="Parking" name="parking">
              <Select 
                options={parkingTypes} 
                allowClear 
                placeholder="Select parking"
              />
            </Form.Item>

            {/* Ek fiyat filtreleri */}
            <Form.Item label="Min Price" name="minPrice">
              <InputNumber 
                className="w-full" 
                placeholder="Min price" 
                min={0}
                prefix="$"
              />
            </Form.Item>

            <Form.Item label="Max Price" name="maxPrice">
              <InputNumber 
                className="w-full" 
                placeholder="Max price" 
                min={0}
                prefix="$"
              />
            </Form.Item>

            <Form.Item label="Bedrooms" name="bedrooms">
              <InputNumber 
                className="w-full" 
                placeholder="Bedrooms" 
                min={0}
              />
            </Form.Item>

            <Form.Item label="Bathrooms" name="bathrooms">
              <InputNumber 
                className="w-full" 
                placeholder="Bathrooms" 
                min={0}
              />
            </Form.Item>

            <Form.Item label="Area (sq.ft)" name="area">
              <InputNumber 
                className="w-full" 
                placeholder="Area" 
                min={0}
              />
            </Form.Item>

            <Form.Item label="Property Name" name="name">
              <Input placeholder="Search by name" />
            </Form.Item>

            <Form.Item label="Landmark" name="landmark">
              <Input placeholder="Search by landmark" />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input placeholder="Search by address" />
            </Form.Item>
          </div>

          <div className="mt-7 flex justify-end gap-5">
            <Button onClick={() => setShowFiltersModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Apply Filters
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Filters;
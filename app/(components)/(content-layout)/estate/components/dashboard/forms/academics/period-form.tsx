"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import TextInput from "../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import { PeriodCreateProps } from "../../../../types/types";
import useSchoolStore from "../../../../store/school";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";
import { createPeriod, updatePeriodById } from "../../../../actions/periods";
import { convertDateToIso } from "../../../../lib/convertDateToIso";
import { Period } from "../../academics/periods-page";


export default function PeriodForm({
  initialContent,
  editingId,
  schoolId
}: {
  initialContent?: Period;
  editingId?: string;
  schoolId:string;
}) {
  const initialValues = {
    year: editingId ? initialContent?.year : new Date().getFullYear(),
    startDate: editingId
      ? new Date(initialContent?.startDate as Date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    endDate: editingId
      ? new Date(initialContent?.endDate as Date).toISOString().split("T")[0]
      : (() => {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          return date.toISOString().split("T")[0];
        })(),
    term: editingId ? initialContent?.term : 1,
    isActive: editingId ? (initialContent?.isActive ?? false) : false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<PeriodCreateProps>({
    defaultValues: {
      year: initialValues.year,
      startDate: initialValues.startDate,
      endDate: initialValues.endDate,
      term: initialValues.term,
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();
  const [isActive, setIsActive] = useState<boolean>(initialValues.isActive);

  const getChangedFields = (
    formData: PeriodCreateProps
  ): Partial<PeriodCreateProps> => {
    const changedFields: Partial<PeriodCreateProps> = {};

    if (dirtyFields.year) changedFields.year = Number(formData.year);
    if (dirtyFields.term) changedFields.term = Number(formData.term);
    if (dirtyFields.startDate)
      changedFields.startDate = convertDateToIso(formData.startDate);
    if (dirtyFields.endDate)
      changedFields.endDate = convertDateToIso(formData.endDate);

    if (isActive !== initialValues.isActive) {
      changedFields.isActive = isActive;
    }

    return changedFields;
  };

  async function savePeriod(data: PeriodCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        const changedData = getChangedFields(data);

        if (Object.keys(changedData).length === 0) {
          setLoading(false);
          toast.error("No changes detected");
          return;
        }

        changedData.schoolId = school?.id ?? "";

        await updatePeriodById(editingId, changedData);
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        const newData = {
          ...data,
          schoolId: schoolId ?? "",
          year: Number(data.year),
          term: Number(data.term),
          startDate: convertDateToIso(data.startDate),
          endDate: convertDateToIso(data.endDate),
          isActive: isActive,
        };

        await createPeriod(newData);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="bg-white text-black p-2 rounded-lg">
      <Dialog>
        <DialogTrigger asChild>
          {editingId ? (
            <button title="Edit Period" className="text-black hover:text-gray-600">
              <Pencil className="w-4 h-4" />
            </button>
          ) : (
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-1" />
              Add New Period
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="bg-white text-black rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Period" : "Add New Period"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(savePeriod)}>
            <div className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Year"
                  name="year"
                  type="number"
                  className="bg-gray-100 text-black focus:ring-black focus:border-black"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Term"
                  name="term"
                  type="number"
                  min={1}
                  max={3}
                  className="bg-gray-100 text-black focus:ring-black focus:border-black"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Start Date"
                  name="startDate"
                  type="date"
                  className="bg-gray-100 text-black focus:ring-black focus:border-black"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="End Date"
                  name="endDate"
                  type="date"
                  className="bg-gray-100 text-black focus:ring-black focus:border-black"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="isActive" className="text-black">
                  Set as the current term
                </Label>
              </div>

              <SubmitButton
                title={editingId ? "Update Period" : "Add Period"}
                loading={loading}
                className="w-full bg-black text-white hover:bg-gray-800"
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
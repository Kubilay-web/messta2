"use client";

import LoadingButton from "../../../components/LoadingButton";
import LocationInput from "../../../components/LocationInput";
import RichTextEditor from "../../../components/RichTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import H1 from "../../../components/ui/h1";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Select from "../../../components/ui/select";
import { jobTypes } from "../../../lib/job-types";
import { CreateJobValues, createJobSchema } from "../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import { createJobPosting } from "./actions";

type Option = { id: string; name: string };

function toOptions(arr: any[] | undefined): Option[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item, idx) => ({
    id: (item as any).id ?? `${String((item as any).name ?? "opt")}-${idx}`,
    name: (item as any).name ?? String((item as any).id ?? `Option ${idx}`),
  }));
}

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      jobTypeId: "",
      salaryTypeId: "",
      companyId: "",
      vacancies: "",
      apply_email: "",
      apply_url: "",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setFocus,
    formState: { isSubmitting },
    trigger,
  } = form;

  const jobTypeOptions = toOptions(jobTypes);

  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    try {
      await createJobPosting(formData);
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    }
  }

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Post a New Job</H1>
        <p className="text-muted-foreground">
          Fill in the details below to publish your job listing.
        </p>
      </div>

      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide all the information about this job position
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Type */}
            <FormField
              control={control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} value={field.value ?? ""}>
                      <option value="" hidden>
                        Select job type
                      </option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary Type */}
            <FormField
              control={control}
              name="salaryTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Type</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <option value="" hidden>
                        Select salary type
                      </option>
                      {/* Buraya salaryTypes map ekle */}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company ID or Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vacancies */}
            <FormField
              control={control}
              name="vacancies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Vacancies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("cityId") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setValue("cityId", "", { shouldValidate: true })
                        }
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{String(watch("cityId"))}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* How to apply */}
            <div className="space-y-2">
              <Label htmlFor="apply_email">How to Apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="apply_email"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          id="apply_email"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="apply_url"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("apply_email");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={isSubmitting}>
              Submit Job
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}

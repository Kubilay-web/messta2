"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ResponsiveModal } from "../../../../components/responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { useSession } from "@/app/SessionProvider";

interface PlaylistCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Playlist name is required"),
});

export const PlaylistCreateModal = ({
  open,
  onOpenChange,
}: PlaylistCreateModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { user } = useSession();

  // Form submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // API request to create playlist (replace URL with your API endpoint)
      const response = await fetch("/api/video/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      toast.success("Playlist created");
      form.reset(); // Reset form
      onOpenChange(false); // Close modal
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <ResponsiveModal
      title="Create a playlist"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Playlist Name</FormLabel>
                <FormControl >
                  <Input {...field} placeholder="My favorite videos" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="text-white"
              disabled={form.formState.isSubmitting} // Disable submit button while submitting
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};

"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import toast from "react-hot-toast";
import Link from "next/link";
import { deleteContact } from "../../actions/admin";

type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id: string | undefined;
  // revPath: string;
};
export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = "",
}: ActionColumnProps) {
  const isActive = row.isActive;
  async function handleDelete() {
    try {
      if (model === "contact") {
        const res = await deleteContact(id);
        if (res?.ok) {
          toast.success(`Contact deleted successfully`);
          window.location.reload();
        } else {
          toast.error(`Couldn't delete contact`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`${model} Couldn't be deleted`);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-black bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* <DropdownMenuItem className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer">
              
            </DropdownMenuItem> */}
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer "
            >
              <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="text-black bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this{" "}
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                Permanently Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* <DropdownMenuItem
          className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer"
          onClick={() => handleDelete()}
        >
          <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
          <span>Delete</span>
        </DropdownMenuItem> */}
        {editEndpoint !== "#" && (
          <DropdownMenuItem>
            <Link href={editEndpoint} className="flex item gap-2">
              <Pencil className="w-4 h-4 " />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

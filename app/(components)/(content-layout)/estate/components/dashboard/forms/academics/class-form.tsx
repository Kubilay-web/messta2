// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../../components/ui/dialog";
// import { Check, FolderPlus, Pen, Pencil, Plus } from "lucide-react";
// import { useForm } from "react-hook-form";

// import toast from "react-hot-toast";
// import { Button } from "../../../../components/ui/button";
// import TextInput from "../../../../components/FormInputs/TextInput";
// import SubmitButton from "../../../../components/FormInputs/SubmitButton";
// import { ClassCreateProps } from "../../../../types/types";
// import { createClass } from "../../../../actions/classes";
// import useSchoolStore from "../../../../store/school";

// export type ClassProps = {
//   name: string;
// };
// export default function ClassForm({
//   initialContent,
//   editingId,
// }: {
//   userId?: string;
//   initialContent?: string;
//   editingId?: string;
// }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ClassCreateProps>({
//     defaultValues: {
//       title: initialContent || "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const { school } = useSchoolStore();
//   async function saveClass(data: ClassCreateProps) {
//     // data.userId = userId;
//     data.schoolId = school?.id ?? "";
//     try {
//       setLoading(true);
//       if (editingId) {
//         // await updateFolderById(editingId, data);
//         // setLoading(false);
//         // toast.success("Updated Successfully!");
//       } else {
//         const res = await createClass(data);
//         setLoading(false);
//         toast.success("Successfully Created!");
//         reset();
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   }

//   return (
//     <div>
//       <div className="py-1">
//         <Dialog>
//           <DialogTrigger asChild>
//             {editingId ? (
//               <button title="Edit Folder" className="text-blue-600">
//                 <Pencil className="w-4 h-4 " />
//               </button>
//             ) : (
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <Plus className="h-4 w-4" />
//                 <span className="sr-only">Add Class</span>
//               </Button>
//             )}
//           </DialogTrigger>

//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>
//                 {editingId ? "Edit Class" : "Add New Class"}
//               </DialogTitle>
//               {/* <DialogDescription>
//                 Please Write your Comment here, with respect
//               </DialogDescription> */}
//             </DialogHeader>
//             <form className="" onSubmit={handleSubmit(saveClass)}>
//               <div className="">
//                 <div className="space-y-3">
//                   <div className="grid gap-3">
//                     <TextInput
//                       register={register}
//                       errors={errors}
//                       label=""
//                       name="title"
//                       icon={Check}
//                     />
//                   </div>
//                 </div>
//                 <div className="py-3">
//                   <SubmitButton
//                     title={editingId ? "Update" : "Add"}
//                     loading={loading}
//                   />
//                 </div>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Check, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";
import TextInput from "../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../components/FormInputs/SubmitButton";
import { ClassCreateProps } from "../../../../types/types";
import { createClass, updateClass } from "../../../../actions/classes";
import { useRouter } from "next/navigation";

export type ClassProps = {
  name: string;
};

export default function ClassForm({
  initialContent,
  editingId,
  schoolId
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
  schoolId:string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function saveClass(data: ClassCreateProps) {
    data.schoolId = schoolId ?? "";
    try {
      setLoading(true);
      if (editingId) {
        await updateClass(editingId, data.title);
        toast.success("Class updated!");
      } else {
        await createClass(data);
        toast.success("Class created!");
        reset();
      }
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Class</span>
              </Button>
            )}
          </DialogTrigger>

          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                {editingId ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(saveClass)}>
              <div className="space-y-3">
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label=""
                    name="title"
                    placeholder="New Class.."
                    // icon={Check}
                  />
                </div>
              </div>

              <div className="py-3">
                <SubmitButton
                  title={editingId ? "Update" : "Add"}
                  loading={loading}
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
// "use client";
// import { useForm } from "react-hook-form";
// import TextInput from "../FormInputs/TextInput";
// import SubmitButton from "../FormInputs/SubmitButton";
// import { useState } from "react";

// import toast from "react-hot-toast";

// import { useRouter } from "next/navigation";

// import { Button } from "../ui/button";
// import Link from "next/link";
// import {
//   File,
//   Loader2,
//   Paperclip,
//   Plus,
//   Upload,
//   X,
//   XCircle,
// } from "lucide-react";
// import dynamic from "next/dynamic";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../components/ui/dialog";

// import { FaFilePdf, FaImage } from "react-icons/fa";
// import MultipleFileUpload, {
//   FileProps,
// } from "../FormInputs/MultipleFileUploader";
// import { createStudentDocs } from "../../actions/student-docs";
// import { StudentDocument } from "../StudentDocuments";
// // import { createFile, createMultipleFiles } from "../../actions/fileManager";
// // import { FileProps as CreateFileProps } from "../../types/types";

// export type CreateDoc = {
//   name: string;
//   type: string;
//   url: string;
//   size: number;
//   studentId: string;
// };

// export default function StudentDocumentFileUploadForm({
//   studentId,
//   docs,
//   setDocs,
// }: {
//   studentId: string;
//   docs: StudentDocument[];
//   setDocs: (docs: any) => void;
// }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [files, setFiles] = useState<FileProps[]>([]);
//   function handleImageRemove(fileIndex: any) {
//     const updatedFiles = files.filter((file, index) => index !== fileIndex);
//     setFiles(updatedFiles);
//   }

//   async function onSubmit() {
//     setSuccess(false);
//     const data: CreateDoc[] = files.map((file) => {
//       return {
//         name: file.title,
//         type: file.type,
//         url: file.url,
//         size: file.size,
//         studentId,
//       };
//     });
//     try {
//       setIsLoading(true);
//       const res = await createStudentDocs(data);
//       console.log(res);
//       toast.success("Files uploaded Successfully!");
//       setIsLoading(false);
//       setSuccess(true);
//       const newDocs = [...res.data, ...docs];
//       setDocs(newDocs);
//       setFiles([]);
//     } catch (error) {
//       setSuccess(false);
//       setIsLoading(false);
//       console.log(error);
//     }
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="w-4 h-4 mr-2" />
//           Add Document
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle></DialogTitle>
//         </DialogHeader>
//         <MultipleFileUpload
//           label="Upload Student Documents"
//           files={files}
//           setFiles={setFiles}
//           endpoint="fileUploads"
//         />
//         {isLoading ? (
//           <Button disabled>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Saving Please wait...
//           </Button>
//         ) : (
//           <>
//             {success ? (
//               <DialogFooter className="sm:justify-start">
//                 <DialogClose asChild>
//                   <Button
//                     onClick={() => setSuccess(false)}
//                     type="button"
//                     variant="secondary"
//                   >
//                     Close
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             ) : (
//               <Button onClick={onSubmit}>Save Files</Button>
//             )}
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }







"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { createStudentDocs } from "../../actions/student-docs";
import { StudentDocument } from "../StudentDocuments";

export type CreateDoc = {
  name: string;
  type: string;
  url: string;
  size: number;
  studentId: string;
};

export default function StudentDocumentFileUploadForm({
  studentId,
  docs,
  setDocs,
}: {
  studentId: string;
  docs: StudentDocument[];
  setDocs: (docs: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

  // Upload to Cloudinary
  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return {
      url: data.secure_url,
      type: data.resource_type,
      size: data.bytes,
      name: file.name,
    };
  }

  async function onSubmit() {
    if (files.length === 0) return;

    try {
      setIsLoading(true);
      setSuccess(false);

      // Upload all files
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );

      const payload: CreateDoc[] = uploadedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        url: file.url,
        size: file.size,
        studentId,
      }));

      const res = await createStudentDocs(payload);

      toast.success("Files uploaded successfully ✅");

      setSuccess(true);
      setDocs([...res.data, ...docs]);
      setFiles([]);
    } catch (error) {
      console.log(error);
      toast.error("Upload failed ❌");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100">
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Student Documents</DialogTitle>
        </DialogHeader>

        {/* File Input */}
        <div className="space-y-3">
          <input
            type="file"
            multiple
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
          />

          {files.length > 0 && (
            <div className="text-sm text-gray-600">
              {files.length} file(s) selected
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4">
          {isLoading ? (
            <Button
              disabled
              className="w-full bg-white text-black border border-gray-300"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </Button>
          ) : success ? (
            <DialogFooter className="sm:justify-between">
              <span className="text-sm text-green-600">
                Upload successful
              </span>
              <DialogClose asChild>
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="bg-white text-black border-gray-300 hover:bg-gray-100"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={files.length === 0}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Upload Files
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
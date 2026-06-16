import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  FileIcon,
  MoreVertical,
  Plus,
  Eye,
  Download,
  Trash2,
  FolderIcon,
  Loader2,
  X,
} from "lucide-react";
import {
  FaFileAlt,
  FaFileArchive,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaImage,
} from "react-icons/fa";
import { MdTextSnippet } from "react-icons/md";
import { getNormalDate } from "../lib/getNormalDate";
import { formatBytes } from "../lib/formatBytes";
import { useState } from "react";
import { deleteDocument, getStudentDocs } from "../actions/student-docs";
import StudentDocumentFileUploadForm from "./dashboard/StudentDocumentFileUploadForm";
import toast from "react-hot-toast";
const VibrantProgress = ({ value }: { value: number }) => {
  const getColorClass = (percentage: number) => {
    return percentage > 50 ? "bg-red-500" : "bg-green-500";
  };

  return (
    <div className="w-48 h-2 bg-lime-50 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${getColorClass(value)}`}
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};
export type StudentDocument = {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  studentId: string;
  createdAt: string;
  updatedAt: string;
};
function getFileIcon(extension: string | undefined) {
  switch (extension) {
    case "pdf":
      return <FaFilePdf className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FaImage className="w-5 mr-2 h-5 flex-shrink-0 text-blue-500" />;
    case "doc":
    case "docx":
      return (
        <FaFileWord className="w-5 mr-2 h-5 flex-shrink-0 text-blue-500" />
      );
    case "xls":
    case "xlsx":
      return (
        <FaFileExcel className="w-5 mr-2 h-5 flex-shrink-0 text-green-500" />
      );
    case "ppt":
    case "pptx":
      return (
        <FaFilePowerpoint className="w-5 mr-2 h-5 flex-shrink-0 text-orange-500" />
      );
    case "zip":
    case "gzip":
    case "tar":
      return (
        <FaFileArchive className="mr-2 w-6 h-6 flex-shrink-0 text-yellow-600" />
      );
    case "txt":
      return (
        <MdTextSnippet className="w-6 h-6 flex-shrink-0 text-gray-500 mr-2" />
      );
    default:
      return <FaFileAlt className="w-6 h-6 flex-shrink-0 text-gray-500 mr-2" />; // Default icon for other file types
  }
}
export default function StudentDocuments({ studentId }: { studentId: string }) {
  const totalSpace = Number((2 * 1073741824).toFixed(2));
  // const usedSpace = selectedFolder.files.reduce((acc, item) => {
  //   return acc + item.size;
  // }, 0);
  const usedSpace = 20000;
  const [docs, setDocs] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(false);
  async function handleFetchStudentDocs() {
    setLoading(true);
    try {
      const data = await getStudentDocs(studentId);
      setDocs(data);
      setLoading(false);
      // console.log(res);
    } catch (error) {
      setDocs([]);
      setLoading(false);
      console.log(error);
    }
  }

  const handleView = (id: string) => {
    console.log(`Viewing document with id: ${id}`);
    // In a real app, this would open the document for viewing
  };

  const [selectedFile, setSelectedFile] = useState<StudentDocument | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [extension, setExtension] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async (url: string, fileName: string = "Download") => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success("Download Successful");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download Failed");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleFileClick = (file: StudentDocument): void => {
    setSelectedFile(file);
    const fiLeExt = file.name.split(".").pop() as string;
    setExtension(fiLeExt);
    setIsSheetOpen(true);
  };
  const handleFileDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      const newDocs = docs.filter((doc) => doc.id !== id);
      setDocs(newDocs);
      toast.success("File Deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          Student Documents({docs.length})
        </CardTitle>
        <StudentDocumentFileUploadForm
          docs={docs}
          setDocs={setDocs}
          studentId={studentId}
        />
      </CardHeader>
      <CardContent>
        {docs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((doc) => {
                const fiLeExt = doc.name.split(".").pop() as string;
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getFileIcon(fiLeExt)}
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{formatBytes(doc.size)}</TableCell>
                    <TableCell>{getNormalDate(doc.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white text-black">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleFileClick(doc)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDownload(doc.url)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            <span>
                              {isDownloading ? "Downloading" : "Download"}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleFileDelete(doc.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <FolderIcon className="w-24 h-24 text-center text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 text-center mb-4">
              No documents loaded !
            </p>
            <p className="text-gray-500 text-center mb-6">
              If You have added the student docs, click on load documents
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading please wait...
          </Button>
        ) : (
          <Button size="lg" onClick={handleFetchStudentDocs}>
            {docs.length > 0 ? "Load Documents Again" : "Load Documents"}
          </Button>
        )}
      </CardFooter>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>File Information</SheetTitle>
            {/* <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X />
              </Button>
            </SheetClose> */}
          </SheetHeader>
          {/* const extension = file.title.split(".").pop();  */}
          {selectedFile && (
            <div className="mt-4">
              <div className="mb-4 flex items-center ">
                {getFileIcon(extension)}
                <div className="text-center font-semibold">
                  {selectedFile.name}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span>{getNormalDate(selectedFile.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Size</span>
                  <span>{formatBytes(selectedFile.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format</span>
                  <span>{selectedFile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Modified</span>
                  <span>{getNormalDate(selectedFile.updatedAt)}</span>
                </div>
              </div>
              <div className="border-t pt-3 mt-3 flex flex-col sm:flex-row gap-4 items-center justify-center p-4 bg-background ">
                <Button
                  onClick={() =>
                    handleDownload(selectedFile.url, selectedFile.name)
                  }
                  disabled={isDownloading}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isDownloading ? "Downloading..." : "Download"}
                </Button>
                <Button
                  onClick={() => handleFileDelete(selectedFile.id)}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                {/* <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button> */}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}

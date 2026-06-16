// "use client";

// import { useState } from "react";
// import { Shield, Edit, AlertTriangle, CheckCircle, Info } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Switch } from "../../components/ui/switch";
// import { Label } from "../../components/ui/label";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../../components/ui/alert-dialog";
// import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
// import { Badge } from "../../components/ui/badge";
// import { createSchoolWebsite } from "../../actions/site";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export default function EnableSite({
//   schoolId,
//   schoolSlug,
// }: {
//   schoolId: string;
//   schoolSlug: string;
// }) {
//   const router = useRouter();
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [pendingState, setPendingState] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // Handle toggle request
//   const handleToggleRequest = (newState: boolean) => {
//     setPendingState(newState);
//     setShowConfirmDialog(true);
//   };

//   // Handle confirmation
//   const handleConfirm = async () => {
//     try {
//       setLoading(true);
//       setIsEnabled(pendingState);

//       // Log to console as requested
//       console.log("Website editing enabled:", pendingState);

//       // In a real application, you would save this to your database
//       await createSchoolWebsite(schoolId, pendingState);
//       setShowConfirmDialog(false);
//       setLoading(false);
//       toast.success("Site Enabled Successfully");
//       router.push(`/sch/${schoolSlug}/customize`);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     setShowConfirmDialog(false);
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-8">School Website Administration</h1>

//       <Card className="mb-8">
//         <CardHeader className="pb-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Shield className="h-6 w-6 text-primary" />
//               <CardTitle>Website Editing Controls</CardTitle>
//             </div>
//             <Badge variant={isEnabled ? "default" : "outline"}>
//               {isEnabled ? "Enabled" : "Disabled"}
//             </Badge>
//           </div>
//           <CardDescription>
//             Control whether school staff can create and edit website sections
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <div className="space-y-6">
//             <Alert variant={isEnabled ? "default" : "destructive"}>
//               <Info className="h-4 w-4" />
//               <AlertTitle>Current Status</AlertTitle>
//               <AlertDescription>
//                 {isEnabled
//                   ? "Website editing is currently enabled. Staff can create and modify website sections."
//                   : "Website editing is currently disabled. Staff cannot make changes to the website."}
//               </AlertDescription>
//             </Alert>

//             <div className="bg-muted p-6 rounded-lg">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="text-lg font-medium mb-1">
//                     Website Creation & Editing
//                   </h3>
//                   <p className="text-muted-foreground">
//                     When enabled, authorized staff can create and edit website
//                     sections including news, events, gallery, and other content.
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="website-editing"
//                     checked={isEnabled}
//                     onCheckedChange={handleToggleRequest}
//                     className="data-[state=checked]:bg-green-500"
//                   />
//                   <Label htmlFor="website-editing" className="font-medium">
//                     {isEnabled ? "Enabled" : "Disabled"}
//                   </Label>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="border rounded-md p-4">
//                 <div className="flex items-start gap-3">
//                   <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                   <div>
//                     <h4 className="font-medium">When Enabled</h4>
//                     <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
//                       <li>• Staff can create and edit website sections</li>
//                       <li>• News and events can be published</li>
//                       <li>• Gallery images can be uploaded</li>
//                       <li>• Content changes are immediately visible</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="border rounded-md p-4">
//                 <div className="flex items-start gap-3">
//                   <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
//                   <div>
//                     <h4 className="font-medium">When Disabled</h4>
//                     <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
//                       <li>• Staff cannot modify website content</li>
//                       <li>• Existing content remains visible</li>
//                       <li>• Draft content cannot be published</li>
//                       <li>• Website appears in read-only mode</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-end pt-4 border-t">
//           <Button
//             size="lg"
//             onClick={() => handleToggleRequest(!isEnabled)}
//             className={
//               isEnabled
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-green-500 hover:bg-green-600"
//             }
//           >
//             {isEnabled ? (
//               <>
//                 <Shield className="mr-2 h-5 w-5" /> Disable Website Editing
//               </>
//             ) : (
//               <>
//                 <Edit className="mr-2 h-5 w-5" /> Enable Website Editing
//               </>
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Confirmation Dialog */}
//       <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {pendingState
//                 ? "Enable Website Editing?"
//                 : "Disable Website Editing?"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {pendingState
//                 ? "This will allow staff to create and edit website sections. All changes will be immediately visible to the public."
//                 : "This will prevent staff from making any changes to the website. Existing content will remain visible."}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
//             {loading ? (
//               <AlertDialogAction
//                 className={
//                   pendingState
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-red-500 hover:bg-red-600"
//                 }
//               >
//                 Enabling...
//               </AlertDialogAction>
//             ) : (
//               <AlertDialogAction
//                 onClick={handleConfirm}
//                 className={
//                   pendingState
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-red-500 hover:bg-red-600"
//                 }
//               >
//                 {pendingState ? "Enable" : "Disable"}
//               </AlertDialogAction>
//             )}
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }








"use client";

import { useState } from "react";
import { Shield, Edit, AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import { createSchoolWebsite } from "../../actions/site";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EnableSite({
  schoolId,
  schoolSlug,
}: {
  schoolId: string;
  schoolSlug: string;
}) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingState, setPendingState] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle toggle request
  const handleToggleRequest = (newState: boolean) => {
    setPendingState(newState);
    setShowConfirmDialog(true);
  };

  // Handle confirmation
  const handleConfirm = async () => {
    try {
      setLoading(true);
      setIsEnabled(pendingState);

      console.log("Website editing enabled:", pendingState);

      await createSchoolWebsite(schoolId, pendingState);
      setShowConfirmDialog(false);
      setLoading(false);
      toast.success("Site Enabled Successfully");
      router.push(`/sch/${schoolSlug}/customize`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-black">
        School Website Administration
      </h1>

      <Card className="mb-8 bg-white text-black shadow-md border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-black" />
              <CardTitle className="text-black">Website Editing Controls</CardTitle>
            </div>
            <Badge variant={isEnabled ? "default" : "outline"} className="text-black">
              {isEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <CardDescription className="text-black">
            Control whether school staff can create and edit website sections
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <Alert
              variant={isEnabled ? "default" : "destructive"}
              className="bg-gray-100 text-black border border-gray-300"
            >
              <Info className="h-4 w-4 text-black" />
              <AlertTitle className="text-black">Current Status</AlertTitle>
              <AlertDescription className="text-black">
                {isEnabled
                  ? "Website editing is currently enabled. Staff can create and modify website sections."
                  : "Website editing is currently disabled. Staff cannot make changes to the website."}
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-1 text-black">
                    Website Creation & Editing
                  </h3>
                  <p className="text-gray-700">
                    When enabled, authorized staff can create and edit website
                    sections including news, events, gallery, and other content.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="website-editing"
                    checked={isEnabled}
                    onCheckedChange={handleToggleRequest}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Label htmlFor="website-editing" className="font-medium text-black">
                    {isEnabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 bg-white text-black">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-black">When Enabled</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>• Staff can create and edit website sections</li>
                      <li>• News and events can be published</li>
                      <li>• Gallery images can be uploaded</li>
                      <li>• Content changes are immediately visible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-white text-black">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-black">When Disabled</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>• Staff cannot modify website content</li>
                      <li>• Existing content remains visible</li>
                      <li>• Draft content cannot be published</li>
                      <li>• Website appears in read-only mode</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 border-t">
          <Button
            size="lg"
            onClick={() => handleToggleRequest(!isEnabled)}
            className={
              isEnabled
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
          >
            {isEnabled ? (
              <>
                <Shield className="mr-2 h-5 w-5" /> Disable Website Editing
              </>
            ) : (
              <>
                <Edit className="mr-2 h-5 w-5" /> Enable Website Editing
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">
              {pendingState
                ? "Enable Website Editing?"
                : "Disable Website Editing?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              {pendingState
                ? "This will allow staff to create and edit website sections. All changes will be immediately visible to the public."
                : "This will prevent staff from making any changes to the website. Existing content will remain visible."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            {loading ? (
              <AlertDialogAction
                className={
                  pendingState
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }
              >
                Enabling...
              </AlertDialogAction>
            ) : (
              <AlertDialogAction
                onClick={handleConfirm}
                className={
                  pendingState
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }
              >
                {pendingState ? "Enable" : "Disable"}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
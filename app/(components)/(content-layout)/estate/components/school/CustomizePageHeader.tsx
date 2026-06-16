// "use client";

// import { useState } from "react";
// import { Switch } from "../../components/ui/switch";
// import { Button } from "../../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../../components/ui/dialog";
// import { Loader2 } from "lucide-react";
// import { createActivity, updateSection } from "../../actions/site";
// import useSchoolStore from "../../store/school";
// import { toast } from "sonner";
// import { getFormattedDate } from "../../lib/getFormatedDate";

// export default function CustomizePageHeader({
//   title,
//   subtitle,
//   sectionId = "",
//   isComplete = false,
// }: {
//   title: string;
//   subtitle: string;
//   sectionId?: string;
//   isComplete?: boolean;
// }) {
//   const [complete, setComplete] = useState(isComplete);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pendingValue, setPendingValue] = useState(false);
//   const { school } = useSchoolStore();
//   const handleSwitchClick = (newValue: boolean) => {
//     setPendingValue(newValue);
//     setShowConfirmDialog(true);
//   };

//   const handleConfirm = async () => {
//     setIsLoading(true);
//     try {
//       const data = {
//         isComplete: pendingValue,
//       };
//       const schoolId = school?.id ?? "";
//       console.log(data, schoolId);
//       await updateSection(sectionId, data, schoolId);
//       const messageText = pendingValue === true ? "Complete" : "Incomplete";
//       toast.success(`Section Marked ${messageText} successfully`);
//       setComplete(pendingValue);
//       const sectionTitle = title.split(" ")[0];
//       const status =
//         pendingValue === true ? "Marked Complete" : "Marked Incomplete";
//       const activity = {
//         activity: `${sectionTitle} Section ${status}`,
//         description: `The ${sectionTitle} section was ${status} by the user `,
//         time: getFormattedDate(new Date()),
//         schoolId: schoolId,
//       };
//       await createActivity(activity);
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     } finally {
//       setIsLoading(false);
//       setShowConfirmDialog(false);
//     }
//   };

//   const handleCancel = () => {
//     setShowConfirmDialog(false);
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold">{title}</h1>
//           <p className="text-muted-foreground">{subtitle}</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-muted-foreground">
//             {complete ? "Complete" : "Mark as complete"}
//           </span>
//           <Switch
//             checked={complete}
//             onCheckedChange={handleSwitchClick}
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Status Change</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to mark this section as{" "}
//               {pendingValue ? "complete" : "incomplete"}?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={handleCancel}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleConfirm} disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 "Confirm"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Loader2 } from "lucide-react";
import { createActivity, updateSection } from "../../actions/site";
import useSchoolStore from "../../store/school";
import { toast } from "sonner";
import { getFormattedDate } from "../../lib/getFormatedDate";

export default function CustomizePageHeader({
  title,
  subtitle,
  sectionId = "",
  isComplete = false,
}: {
  title: string;
  subtitle: string;
  sectionId?: string;
  isComplete?: boolean;
}) {
  const [complete, setComplete] = useState(isComplete);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingValue, setPendingValue] = useState(false);
  const { school } = useSchoolStore();

  const handleSwitchClick = (newValue: boolean) => {
    setPendingValue(newValue);
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const data = {
        isComplete: pendingValue,
      };
      const schoolId = school?.id ?? "";
      await updateSection(sectionId, data, schoolId);

      const messageText = pendingValue ? "Complete" : "Incomplete";
      toast.success(`Section Marked ${messageText} successfully`);
      setComplete(pendingValue);

      const sectionTitle = title.split(" ")[0];
      const status = pendingValue ? "Marked Complete" : "Marked Incomplete";

      const activity = {
        activity: `${sectionTitle} Section ${status}`,
        description: `The ${sectionTitle} section was ${status} by the user`,
        time: getFormattedDate(new Date()),
        schoolId,
      };
      await createActivity(activity);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update section status");
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="flex flex-col space-y-4 bg-white text-black p-4 rounded-md shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {complete ? "Complete" : "Mark as complete"}
          </span>
          <Switch
            checked={complete}
            onCheckedChange={handleSwitchClick}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this section as{" "}
              {pendingValue ? "complete" : "incomplete"}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="bg-white text-black border-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-black text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
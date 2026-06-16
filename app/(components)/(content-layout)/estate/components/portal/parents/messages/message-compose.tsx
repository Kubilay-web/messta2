// import { Button } from "../../../../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../../../../components/ui/dialog";
// import { Input } from "../../../../components/ui/input";
// import { Label } from "../../../../components/ui/label";
// import { Textarea } from "../../../../components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../../components/ui/select";

// interface ComposeMessageProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSend: (message: {
//     recipient: string;
//     subject: string;
//     content: string;
//   }) => void;
// }

// export function ComposeMessage({
//   open,
//   onOpenChange,
//   onSend,
// }: ComposeMessageProps) {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     onSend({
//       recipient: formData.get("recipient") as string,
//       subject: formData.get("subject") as string,
//       content: formData.get("content") as string,
//     });
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <form onSubmit={handleSubmit}>
//           <DialogHeader>
//             <DialogTitle>New Message</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="recipient">To</Label>
//               <Select name="recipient" required>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select recipient" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="teacher">Class Teacher</SelectItem>
//                   <SelectItem value="principal">Principal</SelectItem>
//                   <SelectItem value="admin">Administrator</SelectItem>
//                   <SelectItem value="counselor">School Counselor</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="subject">Subject</Label>
//               <Input id="subject" name="subject" required />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="content">Message</Label>
//               <Textarea
//                 id="content"
//                 name="content"
//                 required
//                 className="min-h-[200px]"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">Send Message</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }





import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

interface ComposeMessageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (message: {
    recipient: string;
    subject: string;
    content: string;
  }) => void;
}

export function ComposeMessage({
  open,
  onOpenChange,
  onSend,
}: ComposeMessageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSend({
      recipient: formData.get("recipient") as string,
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white text-black">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-black">New Message</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Recipient */}
            <div className="grid gap-2">
              <Label htmlFor="recipient" className="text-black">
                To
              </Label>

              <Select name="recipient" required>
                <SelectTrigger className="bg-white text-black border border-gray-300">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>

                <SelectContent className="bg-white text-black">
                  <SelectItem value="teacher">Class Teacher</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="counselor">School Counselor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="grid gap-2">
              <Label htmlFor="subject" className="text-black">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                required
                className="bg-white text-black border border-gray-300"
              />
            </div>

            {/* Message */}
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-black">
                Message
              </Label>
              <Textarea
                id="content"
                name="content"
                required
                className="min-h-[200px] bg-white text-black border border-gray-300"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="bg-white text-black border border-gray-300 hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
            >
              Send Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
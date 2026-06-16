// "use client";

// import { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import { Button } from "../../components/ui/button";

// import { TwoProductCardsDialog } from "./two-product-cards-dialog";
// import { ProductCardDialog } from "./product-dialog";
// import { Toolbar } from "./toolbar";
// import { LinkDialog } from "./link-dialog";
// import { ButtonDialog } from "./button-dialog";
// import { ImageDialog } from "./image-dialog";

// export function EmailEditor({
//   onHtmlChange,
// }: {
//   onHtmlChange?: (html: string) => void;
// }) {
//   const [html, setHtml] = useState("");
//   const [showLinkDialog, setShowLinkDialog] = useState(false);
//   const [showButtonDialog, setShowButtonDialog] = useState(false);
//   const [showImageDialog, setShowImageDialog] = useState(false);
//   const [showProductCardDialog, setShowProductCardDialog] = useState(false);
//   const [showTwoProductCardsDialog, setShowTwoProductCardsDialog] =
//     useState(false);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [1, 2, 3],
//         },
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: "text-blue-600 underline cursor-pointer",
//         },
//       }),
//     ],
//     content: "<p>Start writing your email content here...</p>",
//     onUpdate: ({ editor }) => {
//       const newHtml = editor.getHTML();
//       setHtml(newHtml);
//       if (onHtmlChange) {
//         onHtmlChange(newHtml);
//       }
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4 border rounded-md",
//       },
//     },
//   });

//   const handleSubmit = () => {
//     if (editor) {
//       const htmlContent = editor.getHTML();
//       setHtml(htmlContent);
//       console.log("HTML Content:", htmlContent);
//       // Here you would typically send the HTML to your backend
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border rounded-md">
//         <Toolbar
//           editor={editor}
//           onLinkClick={() => setShowLinkDialog(true)}
//           onButtonClick={() => setShowButtonDialog(true)}
//           onImageClick={() => setShowImageDialog(true)}
//           onProductCardClick={() => setShowProductCardDialog(true)}
//           onTwoProductCardsClick={() => setShowTwoProductCardsDialog(true)}
//         />
//         <EditorContent editor={editor} />
//       </div>

//       {!onHtmlChange && (
//         <>
//           <div className="flex justify-end">
//             <Button onClick={handleSubmit}>Generate HTML</Button>
//           </div>

//           {html && (
//             <div className="mt-8">
//               <h2 className="text-xl font-bold mb-2">Generated HTML</h2>
//               <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
//                 <pre className="text-sm">{html}</pre>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {showLinkDialog && editor && (
//         <LinkDialog
//           editor={editor}
//           isOpen={showLinkDialog}
//           onClose={() => setShowLinkDialog(false)}
//         />
//       )}

//       {showButtonDialog && editor && (
//         <ButtonDialog
//           editor={editor}
//           isOpen={showButtonDialog}
//           onClose={() => setShowButtonDialog(false)}
//         />
//       )}

//       {showImageDialog && editor && (
//         <ImageDialog
//           editor={editor}
//           isOpen={showImageDialog}
//           onClose={() => setShowImageDialog(false)}
//         />
//       )}

//       {showProductCardDialog && editor && (
//         <ProductCardDialog
//           editor={editor}
//           isOpen={showProductCardDialog}
//           onClose={() => setShowProductCardDialog(false)}
//         />
//       )}

//       {showTwoProductCardsDialog && editor && (
//         <TwoProductCardsDialog
//           editor={editor}
//           isOpen={showTwoProductCardsDialog}
//           onClose={() => setShowTwoProductCardsDialog(false)}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Button } from "../../components/ui/button";

import { TwoProductCardsDialog } from "./two-product-cards-dialog";
import { ProductCardDialog } from "./product-dialog";
import { Toolbar } from "./toolbar";
import { LinkDialog } from "./link-dialog";
import { ButtonDialog } from "./button-dialog";
import { ImageDialog } from "./image-dialog";

export function EmailEditor({
  onHtmlChange,
}: {
  onHtmlChange?: (html: string) => void;
}) {
  const [html, setHtml] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showButtonDialog, setShowButtonDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showProductCardDialog, setShowProductCardDialog] = useState(false);
  const [showTwoProductCardsDialog, setShowTwoProductCardsDialog] =
    useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>Start writing your email content here...</p>",
    onUpdate: ({ editor }) => {
      const newHtml = editor.getHTML();
      setHtml(newHtml);
      if (onHtmlChange) {
        onHtmlChange(newHtml);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4 border rounded-md",
      },
    },
  });

  const handleSubmit = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      setHtml(htmlContent);
      console.log("HTML Content:", htmlContent);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Toolbar
          editor={editor}
          onLinkClick={() => setShowLinkDialog(true)}
          onButtonClick={() => setShowButtonDialog(true)}
          onImageClick={() => setShowImageDialog(true)}
          onProductCardClick={() => setShowProductCardDialog(true)}
          onTwoProductCardsClick={() => setShowTwoProductCardsDialog(true)}
        />
        <EditorContent editor={editor} />
      </div>

      {!onHtmlChange && (
        <>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Generate HTML</Button>
          </div>

          {html && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Generated HTML</h2>
              <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                <pre className="text-sm">{html}</pre>
              </div>
            </div>
          )}
        </>
      )}

      {showLinkDialog && editor && (
        <LinkDialog
          editor={editor}
          isOpen={showLinkDialog}
          onClose={() => setShowLinkDialog(false)}
        />
      )}

      {showButtonDialog && editor && (
        <ButtonDialog
          editor={editor}
          isOpen={showButtonDialog}
          onClose={() => setShowButtonDialog(false)}
        />
      )}

      {showImageDialog && editor && (
        <ImageDialog
          editor={editor}
          isOpen={showImageDialog}
          onClose={() => setShowImageDialog(false)}
        />
      )}

      {showProductCardDialog && editor && (
        <ProductCardDialog
          editor={editor}
          isOpen={showProductCardDialog}
          onClose={() => setShowProductCardDialog(false)}
        />
      )}

      {showTwoProductCardsDialog && editor && (
        <TwoProductCardsDialog
          editor={editor}
          isOpen={showTwoProductCardsDialog}
          onClose={() => setShowTwoProductCardsDialog(false)}
        />
      )}
    </div>
  );
}

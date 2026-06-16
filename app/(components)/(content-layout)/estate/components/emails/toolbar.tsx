"use client";

import type React from "react";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  LinkIcon,
  MousePointer,
  Image,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { Toggle } from "../../components/ui/toggle";
import { Separator } from "../../components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

interface ToolbarProps {
  editor: Editor | null;
  onLinkClick: () => void;
  onButtonClick: () => void;
  onImageClick: () => void;
  onProductCardClick: () => void;
  onTwoProductCardsClick: () => void;
}

function ToolbarButton({
  icon: Icon,
  label,
  pressed,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={pressed}
            onPressedChange={onClick}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Toolbar({
  editor,
  onLinkClick,
  onButtonClick,
  onImageClick,
  onProductCardClick,
  onTwoProductCardsClick,
}: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-1 flex flex-wrap gap-1 items-center">
      <div className="flex items-center">
        <ToolbarButton
          icon={Heading1}
          label="Heading 1"
          pressed={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <ToolbarButton
          icon={Heading2}
          label="Heading 2"
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          icon={Heading3}
          label="Heading 3"
          pressed={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={Bold}
          label="Bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={Underline}
          label="Underline"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={List}
          label="Bullet List"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered List"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon={Code}
          label="Code Block"
          pressed={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={LinkIcon}
          label="Insert Link"
          pressed={editor.isActive("link")}
          onClick={onLinkClick}
        />
        <ToolbarButton
          icon={MousePointer}
          label="Insert Button"
          onClick={onButtonClick}
        />
        <ToolbarButton
          icon={Image}
          label="Insert Image"
          onClick={onImageClick}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center">
        <ToolbarButton
          icon={ShoppingBag}
          label="Insert Product Card"
          onClick={onProductCardClick}
        />
        <ToolbarButton
          icon={LayoutGrid}
          label="Insert Two Product Cards"
          onClick={onTwoProductCardsClick}
        />
      </div>
    </div>
  );
}

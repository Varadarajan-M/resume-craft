// components/Editor.tsx

"use client";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  UnderlineIcon,
  UnlinkIcon,
} from "lucide-react";
import { memo } from "react";
import { Toggle } from "./toggle";

interface EditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  id?: string; // Optional ID for the editor
}

const RichTextEditor = ({
  id,
  content,
  onChange,
  placeholder,
  readOnly,
}: EditorProps) => {
  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      History,
      HardBreak.configure({
        keepMarks: true,
      }),
      Link.configure({
        autolink: false,
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-500 underline" },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Start typing...",
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc pl-5" },
      }),

      ListItem.configure({
        HTMLAttributes: { class: "list-item" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // class:
        //   "whitespace-pre-wrap break-words prose resize-y prose-sm w-full min-h-[160px] max-h-[400px] overflow-y-auto rounded-md border bg-background border-muted px-4 py-3 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-xs shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        class:
          "prose prose-sm w-full min-h-[160px] resize-y max-h-[400px] overflow-y-auto rounded-md border bg-background border-muted px-4 py-3 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus-visible:ring-ring/20",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2">
      <EditorToolbar editor={editor} />
      <EditorContent id={id} editor={editor} />
    </div>
  );
};

interface EditorToolbarProps {
  editor: Editor;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const actions = [
    {
      icon: BoldIcon,
      label: "Bold",
      isActive: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: ItalicIcon,
      label: "Italic",
      isActive: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: UnderlineIcon,
      label: "Underline",
      isActive: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: LinkIcon,
      label: "Add Link",
      isActive: editor.isActive("link"),
      onClick: () => {
        const url = window.prompt("Enter URL:");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
    },
    {
      icon: UnlinkIcon,
      label: "Remove Link",
      isActive: false,
      onClick: () => editor.chain().focus().unsetLink().run(),
    },
    {
      icon: ListIcon,
      label: "Bullet List",
      isActive: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-muted px-2 py-1">
        {actions.map(({ icon: Icon, label, isActive, onClick }, idx) => (
          <Tooltip key={idx}>
            <TooltipTrigger asChild>
              <Toggle
                pressed={isActive}
                className={`h-8 w-8 ${isActive ? "bg-secondary" : ""}`}
                onPressedChange={onClick}
              >
                <Icon className="h-[14px] w-[14px]" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom">{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default memo(RichTextEditor);

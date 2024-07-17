import { Editor, EditorContent, EditorContentProps, useEditor } from "@tiptap/react";
import { forwardRef, useCallback } from "react";
import { cn } from "@career-ai/utils";
import { useState } from "react";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { Highlight } from "@tiptap/extension-highlight";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { Toggle } from "./toggle";
import { Tooltip } from "./tooltip";
import { Button } from "./button";
import { Skeleton } from "./skeleton";
import { Spinner } from "@radix-ui/themes";
import { useAiCreateJd } from "@/client/services/interview/createJd";

import {
  ArrowClockwise,
  ArrowCounterClockwise,
  TextHOne,
  TextHThree,
  TextHTwo,
} from "@phosphor-icons/react";

import {
  FontBoldIcon,
  FontItalicIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";

type JDInputProps = {
  content?: string;
  onChange?: (value: string) => void;
  hideToolbar?: boolean;
  className?: string;
  editorClassName?: string;
  footer?: (editor: Editor) => React.ReactNode;
  isActive?: boolean;
  position: string;
  language: string;
} & Omit<EditorContentProps, "ref" | "editor" | "content" | "value" | "onChange" | "className">;

const Toolbar = ({
  editor,
  isActive,
  position,
  language,
  onChange,
}: {
  editor: Editor;
  isActive: boolean;
  position: string;
  language: string;
  onChange: ((value: string) => void) | undefined;
}) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const { ai_createJd, result, loading, error } = useAiCreateJd();
  const [isLoading, setIsLoading] = useState(false);

  const handleAIGenerateJD = async () => {
    setIsLoading(true);
    try {
      const result = await ai_createJd({ position: position, language: language });
      editor.chain().focus().setContent(result).run();
      onChange?.(editor.getHTML())
    } catch (error) {
      console.error("Error generating JD: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap w-full justify-between items-center">
      <div className="flex gap-1.5 outline outline-1 outline-[#C7C7CC] mt-2.5 p-1 mb-2 bg-white w-fit rounded-[10px]">
        <Tooltip content="Bold">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <FontBoldIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Italic">
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <FontItalicIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        {/* <Tooltip content="Strikethrough">
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
              <TextStrikethrough />
            </Toggle>
          </Tooltip> */}

        {/* <Tooltip content="Underline">
            <Toggle
              size="sm"
              pressed={editor.isActive("underline")}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
              <TextAUnderline />
            </Toggle>
          </Tooltip> */}

        {/* <Tooltip content="Highlight">
            <Toggle
              size="sm"
              pressed={editor.isActive("highlight")}
              disabled={!editor.can().chain().focus().toggleHighlight().run()}
              onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
            >
              <HighlighterCircle />
            </Toggle>
          </Tooltip>
    
          <Tooltip content="Hyperlink">
            <Button type="button" size="sm" variant="ghost" className="px-2" onClick={setLink}>
              <LinkSimple />
            </Button>
          </Tooltip> */}

        <Tooltip content="Heading 1">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <TextHOne size={20} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Heading 2">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <TextHTwo size={20} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Heading 3">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 3 })}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <TextHThree size={20} />
          </Toggle>
        </Tooltip>

        {/* <Tooltip content="Paragraph">
            <Toggle
              size="sm"
              pressed={editor.isActive("paragraph")}
              onPressedChange={() => editor.chain().focus().setParagraph().run()}
            >
              <ParagraphIcon />
            </Toggle>
          </Tooltip>
    */}
        <Tooltip content="Align Left">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "left" })}
            disabled={!editor.can().chain().focus().setTextAlign("left").run()}
            onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <TextAlignLeftIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Align Center">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "center" })}
            disabled={!editor.can().chain().focus().setTextAlign("center").run()}
            onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <TextAlignCenterIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Align Right">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "right" })}
            disabled={!editor.can().chain().focus().setTextAlign("right").run()}
            onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <TextAlignRightIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Align Justify">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "justify" })}
            disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
            onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <TextAlignJustifyIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        <Tooltip content="Bullet List">
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon style={{ width: "20px", height: "20px" }} />
          </Toggle>
        </Tooltip>

        {/* <Tooltip content="Numbered List">
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedList")}
              disabled={!editor.can().chain().focus().toggleOrderedList().run()}
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListNumbers />
            </Toggle>
          </Tooltip> */}

        {/* <Tooltip content="Outdent">
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              disabled={!editor.can().chain().focus().liftListItem("listItem").run()}
              onClick={() => editor.chain().focus().liftListItem("listItem").run()}
            >
              <TextOutdent />
            </Button>
          </Tooltip>
    
          <Tooltip content="Indent">
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              disabled={!editor.can().chain().focus().sinkListItem("listItem").run()}
              onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
            >
              <TextIndent />
            </Button>
          </Tooltip> */}

        {/* <Tooltip content="Insert Break Line">
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              disabled={!editor.can().chain().focus().setHardBreak().run()}
              onClick={() => editor.chain().focus().setHardBreak().run()}
            >
              <KeyReturn />
            </Button>
          </Tooltip> */}

        {/* <Tooltip content="Insert Horizontal Rule">
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              disabled={!editor.can().chain().focus().setHorizontalRule().run()}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus />
            </Button>
          </Tooltip> */}

        <Tooltip content="Undo">
          <Button
            size="sm"
            variant="ghost"
            className="px-2"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <ArrowCounterClockwise size={20} />
          </Button>
        </Tooltip>

        <Tooltip content="Redo">
          <Button
            size="sm"
            variant="ghost"
            className="px-2"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <ArrowClockwise size={20} />
          </Button>
        </Tooltip>
      </div>

      {/** TODO: Write API to automatically generate JD based on users input */}
      <button
        type="button"
        disabled={isLoading || !isActive}
        className={`flex items-center gap-x-3 font-medium text-base outline outline-1 ${isActive === false ? "text-[#AEAEB2] outline-[#AEAEB2] cursor-not-allowed" : "text-[#007AFF] outline-[#007AFF] transition-all duration-200 ease-in-out transform hover:bg-[#D9EBFF]"} 
          bg-white py-2 px-10 rounded-[10px] ${isLoading ? 'pointer-events-none cursor-not-allowed' : ''}`}
        onClick={handleAIGenerateJD}
      >
        {isLoading ? <span>Processing...</span> : <span>AI generate</span>}
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_413_1301)">
              <path
                d="M9.89362 18.8597L5.60791 19.2311L5.97934 14.9454L14.8936 6.08829C15.0267 5.95223 15.1856 5.84412 15.361 5.77031C15.5363 5.69649 15.7247 5.65848 15.915 5.65848C16.1053 5.65848 16.2937 5.69649 16.4692 5.77031C16.6446 5.84412 16.8035 5.95223 16.9365 6.08829L18.7507 7.91686C18.8846 8.04968 18.9909 8.20768 19.0635 8.38176C19.136 8.55585 19.1733 8.74256 19.1733 8.93115C19.1733 9.11974 19.136 9.30646 19.0635 9.48055C18.9909 9.65464 18.8846 9.81264 18.7507 9.94544L9.89362 18.8597Z"
                stroke={isActive ? "#007AFF" : "#AEAEB2"}
                stroke-width="1.42857"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.20217 5.67436C0.70084 5.58713 0.70084 4.86746 1.20217 4.78024C3.0184 4.46426 4.46294 3.08088 4.85717 1.28002L4.88738 1.14198C4.99584 0.646506 5.70134 0.643422 5.81413 1.13793L5.85081 1.2988C6.25963 3.09117 7.70457 4.46286 9.51576 4.77796C10.0196 4.86561 10.0196 5.58897 9.51576 5.67663C7.70457 5.99173 6.25963 7.36341 5.85081 9.15578L5.81413 9.31666C5.70134 9.81117 4.99584 9.80808 4.88738 9.3126L4.85717 9.17457C4.46294 7.3737 3.0184 5.99033 1.20217 5.67436Z"
                stroke={isActive ? "#007AFF" : "#AEAEB2"}
                stroke-width="1.42857"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_413_1301">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
    </div>
  );
};

export const JDInput = forwardRef<Editor, JDInputProps>(
  (
    {
      content,
      onChange,
      footer,
      hideToolbar = false,
      className,
      editorClassName,
      isActive,
      position,
      language,
      ...props
    },
    _ref,
  ) => {
    const editor = useEditor({
      extensions: [
        Document,
        Text,
        Bold,
        Strike,
        Italic,
        Heading,
        Paragraph,
        ListItem,
        BulletList,
        OrderedList,
        HardBreak,
        History,
        HorizontalRule,
        Highlight,
        Link.extend({
          inclusive: false,
          addKeyboardShortcuts: () => ({
            "Mod-k": () => setLink(),
          }),
        }).configure({ openOnClick: false }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      editorProps: {
        attributes: {
          class: cn(
            "prose max-h-[calc(100vh-667px)] prose-sm prose-zinc grow max-w-none overflow-y-scroll dark:prose-invert focus:outline-none [&_*]:my-2",
            editorClassName,
          ),
        },
      },
      content,
      parseOptions: { preserveWhitespace: "full" },
      onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const setLink = useCallback(() => {
      if (!editor) return false;

      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) return false;

      // empty
      if (url === "") {
        return editor.chain().focus().extendMarkRange("link").unsetLink().run();
      }

      // update link
      return editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
      return (
        <div className="space-y-2">
          <Skeleton className={cn("h-[42px] w-full", hideToolbar && "hidden")} />
          <Skeleton className="h-[90px] w-full" />
        </div>
      );
    }

    return (
      <div>
        {!hideToolbar && (
          <Toolbar
            editor={editor}
            isActive={isActive as boolean}
            position={position}
            language={language}
            onChange={onChange}
          />
        )}

        <EditorContent
          editor={editor}
          className={cn(
            "grid w-full min-h-[calc(100vh-624px)] rounded-[10px] border-none bg-[#F2F2F7] px-3 py-2 placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto",
            hideToolbar && "pt-2",
            className,
          )}
          {...props}
        />

        {footer?.(editor)}
      </div>
    );
  },
);

JDInput.displayName = "JDInput";

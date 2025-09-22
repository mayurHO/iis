"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, FaImage } from "react-icons/fa";
import { Mark } from '@tiptap/core';

const InlineHeading = Mark.create({
  name: 'inlineHeading',
  addOptions() { return { levels: [1,2,3,4,5,6] } },
  addAttributes() { return { level: { default: 1 } } },
  parseHTML() { return this.options.levels.map(level => ({ tag: `span[data-heading="${level}"]` })) },
  renderHTML({ HTMLAttributes }) {
    return ['span', { style: `font-size:${24 - HTMLAttributes.level*2}px;font-weight:bold`, 'data-heading': HTMLAttributes.level }, 0];
  },
  addCommands() {
    return {
      setInlineHeading: level => ({ commands }) => commands.setMark(this.name, { level }),
      unsetInlineHeading: () => ({ commands }) => commands.unsetMark(this.name),
    }
  }
});

export default function RichTextEditor({ value, onChange, placeholder = "Type here..." }) {
  const fileInputRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      InlineHeading,
    ],
    editorProps: {
      attributes: {
        class: "outline-none p-2 min-h-[150px] border rounded",
        placeholder,
      },
    },
    content: value || "",
    onUpdate: ({ editor }) => onChange && onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "");
  }, [value, editor]);

  if (!editor) return null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => editor.chain().focus().setImage({ src: reader.result }).run();
    reader.readAsDataURL(file);
  };

  const applyLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="d-flex gap-2 mb-2 align-items-center flex-wrap editor-toolbar">
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'paragraph') editor.chain().focus().unsetInlineHeading().run();
            else editor.chain().focus().setInlineHeading(parseInt(val)).run();
          }}
          className="p-1 border rounded"
        >
          <option value="paragraph">Paragraph</option>
          {[1,2,3,4,5,6].map(h => <option key={h} value={h}>H{h}</option>)}
        </select>

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaBold /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaItalic /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaUnderline /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaListUl /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaListOl /></button>

        {/* Link button */}
        <div className="d-flex align-items-center position-relative">
          <button type="button" onClick={() => setShowLinkInput(!showLinkInput)} className={editor.isActive('link') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><FaLink /></button>
          {showLinkInput && (
            <div className="position-absolute top-100 start-0 mt-1 d-flex gap-1 bg-white p-1 border rounded z-10 link-add">
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="p-1 border rounded"
              />
              <button type="button" onClick={applyLink} className="btn btn-warning">Apply</button>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <button type="button" onClick={() => fileInputRef.current.click()} className="p-1 rounded"><FaImage /></button>
        <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="text-editor" />
    </div>
  );
}

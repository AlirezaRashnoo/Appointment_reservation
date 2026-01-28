// import 'tippy.js/dist/tippy.css'; // این استایل tooltipها را فعال می‌کند




//  ------------------------------------------------------------
// import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import {TextStyle} from '@tiptap/extension-text-style';
import {Color} from '@tiptap/extension-color';
import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { BubbleMenu } from '@tiptap/react/menus';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
  AiOutlineLink,
  AiOutlineClose,
} from 'react-icons/ai';
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";

import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdCode,
  MdHighlight,
  // MdLooksOne,
  // MdLooksTwo,
  // MdLooks3,
} from 'react-icons/md';

export default function AdvancedEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: true,
        orderedList: true,
        codeBlock: true,
      }),
      TextStyle,
      Color,
      Image,
      Link,
      Highlight,
      Underline,
      Strike,
    ],
    content: '<p>شروع به نوشتن کنید...</p>',
  });
  

  const uploadImage = useCallback(async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }, []);

  const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('آدرس لینک را وارد کنید');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
      {/* BubbleMenu با آیکون‌ها */}
      <BubbleMenu
  editor={editor}
  // tippyOptions={{ duration: 150 }}
  className="bubble-menu flex flex-wrap gap-1.5 bg-white p-2.5 rounded-xl shadow-md border border-gray-100"
>
  {/* Bold */}
  <button
    onClick={() => editor.chain().focus().toggleBold().run()}
    data-tippy-content="درشت (Bold)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('bold')
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    type="button"
    aria-label="Bold"
  >
    <AiOutlineBold />
  </button>

  {/* Italic */}
  <button
    onClick={() => editor.chain().focus().toggleItalic().run()}
    data-tippy-content="کج (Italic)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('italic')
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    type="button"
    aria-label="Italic"
  >
    <AiOutlineItalic />
  </button>

  {/* Underline */}
  <button
    onClick={() => editor.chain().focus().toggleUnderline().run()}
    data-tippy-content="زیرخط (Underline)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('underline')
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    type="button"
    aria-label="Underline"
  >
    <AiOutlineUnderline />
  </button>

  {/* Strike */}
  {/* <button
    onClick={() => editor.chain().focus().toggleStrike().run()}
    data-tippy-content="خط خورده (Strike)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('strike')
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    type="button"
    aria-label="Strike"
  >
    <AiOutlineStrikethrough />
  </button> */}

  {/* Headings */}
  {[1, 2, 3].map((level) => {
    const Icon = [LuHeading1, LuHeading2, LuHeading3][level - 1];
    return (
      <button
        key={level}
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        data-tippy-content={`عنوان سطح ${level}`}
        className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
          ${
            editor.isActive('heading', { level })
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        aria-label={`Heading ${level}`}
      >
        <Icon />
      </button>
    );
  })}

  {/* Bullet List */}
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    data-tippy-content="لیست گلوله‌ای (Bullet List)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('bulletList')
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    aria-label="Bullet List"
  >
    <MdFormatListBulleted />
  </button>

  {/* Ordered List */}
  {/* <button
    type="button"
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    data-tippy-content="لیست شماره‌دار (Ordered List)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('orderedList')
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    aria-label="Ordered List"
  >
    <MdFormatListNumbered />
  </button> */}

  {/* Blockquote */}
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    data-tippy-content="نقل قول (Blockquote)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('blockquote')
          ? 'bg-emerald-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    aria-label="Blockquote"
  >
    <MdFormatQuote />
  </button>

  {/* Code Block */}
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
    data-tippy-content="کد بلوک (Code Block)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('codeBlock')
          ? 'bg-amber-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    aria-label="Code Block"
  >
    <MdCode />
  </button>

  {/* Highlight */}
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleHighlight().run()}
    data-tippy-content="برجسته‌سازی (Highlight)"
    className={`p-2 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center
      ${
        editor.isActive('highlight')
          ? 'bg-pink-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    aria-label="Highlight"
  >
    <MdHighlight />
  </button>
  {/* Unset Color */}
  <input
  type="color"
  // aria-label="رنگ متن"
  className="w-8 h-8 p-0 m-0 border-0 cursor-pointer rounded-full overflow-hidden"
  onChange={(e) => {
    editor.chain().focus().setColor(e.target.value).run();
  }}
  data-tippy-content="انتخاب رنگ متن"
/>

  {/* پاک کردن رنگ */}
  

  {/* Link / Unlink */}
  {!editor.isActive('link') ? (
    <button
      type="button"
      onClick={addLink}
      data-tippy-content="افزودن لینک"
      className="p-2 rounded-lg text-green-600 bg-green-100 hover:bg-green-200 transition flex items-center justify-center text-lg"
      aria-label="Add Link"
    >
      <AiOutlineLink />
    </button>
  ) : (
    <button
      type="button"
      onClick={removeLink}
      data-tippy-content="حذف لینک"
      className="p-2 rounded-lg text-red-600 bg-red-100 hover:bg-red-200 transition flex items-center justify-center text-lg"
      aria-label="Remove Link"
    >
      <AiOutlineClose />
    </button>
  )}
      </BubbleMenu>


      {/* آپلود تصویر */}
      <div className="my-6 flex justify-center">
        <label
          htmlFor="upload-image"
          className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition font-bold select-none"
          aria-label="Upload Image"
        >
          آپلود تصویر
        </label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </div>

      {/* محتوای ادیتور */}
      <EditorContent
        editor={editor}
        className="border border-gray-300 rounded-xl p-6 min-h-[250px] text-gray-800 prose max-w-none outline-none "
      />
    </div>
  );
}

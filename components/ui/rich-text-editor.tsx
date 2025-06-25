"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Eye, Code } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, action: () => insertText("<strong>", "</strong>"), title: "Bold" },
    { icon: Italic, action: () => insertText("<em>", "</em>"), title: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>"), title: "Underline" },
    { icon: List, action: () => insertText("<ul><li>", "</li></ul>"), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("<ol><li>", "</li></ol>"), title: "Numbered List" },
    { icon: Link, action: () => insertText('<a href="URL">', "</a>"), title: "Link" },
    { icon: ImageIcon, action: () => insertText('<img src="URL" alt="Description" />'), title: "Image" },
    { icon: Code, action: () => insertText("<code>", "</code>"), title: "Code" },
  ]

  const insertHeading = (level: number) => {
    insertText(`<h${level}>`, `</h${level}>`)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {/* Headings */}
        <select
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          onChange={(e) => {
            const level = Number.parseInt(e.target.value)
            if (level) insertHeading(level)
            e.target.value = ""
          }}
        >
          <option value="">Heading</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
        </select>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Format buttons */}
        {formatButtons.map((btn, index) => (
          <Button key={index} variant="ghost" size="sm" onClick={btn.action} title={btn.title} className="h-8 w-8 p-0">
            <btn.icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Preview toggle */}
        <Button
          variant={isPreview ? "default" : "ghost"}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="h-8"
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[400px] p-4 border-none outline-none resize-none font-mono text-sm"
          />
        )}
      </div>

      {/* Help text */}
      <div className="bg-gray-50 border-t border-gray-300 p-2 text-xs text-gray-600">
        Tip: Gunakan HTML tags untuk formatting. Contoh: &lt;h2&gt;Judul&lt;/h2&gt;, &lt;p&gt;Paragraf&lt;/p&gt;,
        &lt;strong&gt;Bold&lt;/strong&gt;
      </div>
    </div>
  )
}

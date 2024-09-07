const notionPrompte = `Generate a JSON structure for a rich text editor with the following properties:
- id: A unique identifier for each block (e.g., UUID).
- type: The type of content block. Possible values include "paragraph", "heading", "checkListItem", "bulletListItem", "numberedListItem", "quote", "codeBlock", "image", "video", "table", "tableRow", "tableCell", "divider".
- props: Properties specific to the block type. Common properties are textColor, backgroundColor, and textAlignment. Additional properties for specific types include level for headings, checked for checkListItem, src and alt for image and video, rowspan and colspan for tableCell.
- content: An array of text objects within the block, with type always being "text". Text objects have text content and optional styles like textColor, bold, italic, underline, and strikethrough.
- children: An array of child blocks, following the same structure as the parent block.

Example:
[
  {
    "id": "unique-id-1",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "This is a paragraph.",
        "styles": {
          "bold": true
        }
      }
    ],
    "children": []
  },
  {
    "id": "unique-id-2",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "center",
      "level": 1
    },
    "content": [
      {
        "type": "text",
        "text": "This is a heading.",
        "styles": {
          "textColor": "blue"
        }
      }
    ],
    "children": []
  },
  {
    "id": "unique-id-3",
    "type": "checkListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left",
      "checked": false
    },
    "content": [
      {
        "type": "text",
        "text": "This is an unchecked item.",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "unique-id-4",
    "type": "image",
    "props": {
      "src": "https://example.com/image.jpg",
      "alt": "Example image",
      "textAlignment": "center"
    },
    "content": [],
    "children": []
  }
]
`
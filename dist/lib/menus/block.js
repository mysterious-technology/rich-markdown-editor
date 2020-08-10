"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const SSR = typeof window === "undefined";
const isMac = !SSR && window.navigator.platform === "MacIntel";
const mod = isMac ? "⌘" : "ctrl";
function blockMenuItems() {
    return [
        {
            name: "heading",
            title: "Big heading",
            keywords: "h1 heading1 title",
            icon: outline_icons_1.Heading1Icon,
            shortcut: "^ ⇧ 1",
            attrs: { level: 1 },
        },
        {
            name: "heading",
            title: "Medium heading",
            keywords: "h2 heading2",
            icon: outline_icons_1.Heading2Icon,
            shortcut: "^ ⇧ 2",
            attrs: { level: 2 },
        },
        {
            name: "heading",
            title: "Small heading",
            keywords: "h3 heading3",
            icon: outline_icons_1.Heading3Icon,
            shortcut: "^ ⇧ 3",
            attrs: { level: 3 },
        },
        {
            name: "separator",
        },
        {
            name: "checkbox_list",
            title: "Todo list",
            icon: outline_icons_1.TodoListIcon,
            keywords: "checklist checkbox task",
            shortcut: "^ ⇧ 7",
        },
        {
            name: "bullet_list",
            title: "Bulleted list",
            icon: outline_icons_1.BulletedListIcon,
            shortcut: "^ ⇧ 8",
        },
        {
            name: "ordered_list",
            title: "Ordered list",
            icon: outline_icons_1.OrderedListIcon,
            shortcut: "^ ⇧ 9",
        },
        {
            name: "separator",
        },
        {
            name: "blockquote",
            title: "Quote",
            icon: outline_icons_1.BlockQuoteIcon,
            shortcut: `${mod} ]`,
        },
        {
            name: "code_block",
            title: "Code block",
            icon: outline_icons_1.CodeIcon,
            shortcut: "^ ⇧ \\",
            keywords: "script",
        },
        {
            name: "hr",
            title: "Divider",
            icon: outline_icons_1.HorizontalRuleIcon,
            shortcut: `${mod} _`,
            keywords: "horizontal rule break line",
        },
        {
            name: "link",
            title: "Link",
            icon: outline_icons_1.LinkIcon,
            shortcut: `${mod} k`,
            keywords: "link url uri href",
        },
    ];
}
exports.default = blockMenuItems;
//# sourceMappingURL=block.js.map
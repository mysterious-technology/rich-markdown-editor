import { EditorView } from "prosemirror-view";
declare const createAndInsertLink: (view: EditorView<any>, title: string, href: string, options: {
    onCreateLink: (title: string) => Promise<string>;
    onShowToast?: ((message: string, code: string) => void) | undefined;
}) => Promise<void>;
export default createAndInsertLink;
//# sourceMappingURL=createAndInsertLink.d.ts.map
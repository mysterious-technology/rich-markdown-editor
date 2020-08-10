import * as React from "react";
import { EditorView } from "prosemirror-view";
import { SearchResult } from "./LinkEditor";
declare type Props = {
    tooltip: typeof React.Component;
    isTemplate: boolean;
    commands: Record<string, any>;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onClickLink: (url: string) => void;
    onCreateLink?: (title: string) => Promise<string>;
    onShowToast?: (msg: string, code: string) => void;
    view: EditorView;
};
export default class SelectionToolbar extends React.Component<Props> {
    handleOnCreateLink: (title: string) => Promise<void>;
    handleOnSelectLink: ({ href, from, to, }: {
        href: string;
        from: number;
        to: number;
    }) => void;
    render(): JSX.Element | null;
}
export {};
//# sourceMappingURL=SelectionToolbar.d.ts.map
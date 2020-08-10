import * as React from "react";
import { EditorView } from "prosemirror-view";
import { Mark } from "prosemirror-model";
import theme from "../theme";
export declare type SearchResult = {
    title: string;
    url: string;
};
declare type Props = {
    mark?: Mark;
    from: number;
    to: number;
    tooltip: typeof React.Component;
    onRemoveLink?: () => void;
    onCreateLink?: (title: string) => Promise<void>;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onSelectLink: (options: {
        href: string;
        title?: string;
        from: number;
        to: number;
    }) => void;
    onClickLink: (url: string) => void;
    onShowToast?: (message: string, code: string) => void;
    view: EditorView;
    theme: typeof theme;
};
declare type State = {
    results: SearchResult[];
    value: string;
    selectedIndex: number;
};
declare class LinkEditor extends React.Component<Props, State> {
    discardInputValue: boolean;
    initialValue: string;
    initialSelectionLength: number;
    state: State;
    get href(): string;
    componentWillUnmount: () => void;
    save: (href: string, title?: string | undefined) => void;
    handleKeyDown: (event: React.KeyboardEvent<Element>) => void;
    handleFocusLink: (selectedIndex: number) => void;
    handleChange: (event: any) => Promise<void>;
    handleOpenLink: (event: any) => void;
    handleCreateLink: (value: string) => Promise<void> | undefined;
    handleRemoveLink: () => void;
    handleSelectLink: (url: string, title: string) => (event: any) => void;
    moveSelectionToEnd: () => void;
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<Pick<Props & React.RefAttributes<LinkEditor>, "mark" | "view" | "tooltip" | "key" | "ref" | "from" | "to" | "onRemoveLink" | "onCreateLink" | "onSearchLink" | "onSelectLink" | "onClickLink" | "onShowToast"> & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=LinkEditor.d.ts.map
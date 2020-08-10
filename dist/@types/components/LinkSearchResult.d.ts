import * as React from "react";
import theme from "../theme";
declare type Props = {
    onClick: (event: React.MouseEvent) => void;
    onMouseOver: (event: React.MouseEvent) => void;
    icon: React.ReactNode;
    selected: boolean;
    title: string;
    theme: typeof theme;
};
declare const _default: React.ForwardRefExoticComponent<Pick<Props, "title" | "icon" | "onClick" | "onMouseOver" | "selected"> & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=LinkSearchResult.d.ts.map
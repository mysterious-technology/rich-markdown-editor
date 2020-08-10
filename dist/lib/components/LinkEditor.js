"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const prosemirror_utils_1 = require("prosemirror-utils");
const outline_icons_1 = require("outline-icons");
const styled_components_1 = __importStar(require("styled-components"));
const isUrl_1 = __importDefault(require("../lib/isUrl"));
const Flex_1 = __importDefault(require("./Flex"));
const Input_1 = __importDefault(require("./Input"));
const ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
const LinkSearchResult_1 = __importDefault(require("./LinkSearchResult"));
class LinkEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.discardInputValue = false;
        this.initialValue = this.href;
        this.initialSelectionLength = this.props.to - this.props.from;
        this.state = {
            selectedIndex: -1,
            value: this.href,
            results: [],
        };
        this.componentWillUnmount = () => {
            if (this.discardInputValue) {
                return;
            }
            if (this.state.value === this.initialValue) {
                return;
            }
            const href = (this.state.value || "").trim();
            if (!href) {
                return this.handleRemoveLink();
            }
            this.save(href, href);
        };
        this.save = (href, title) => {
            href = href.trim();
            if (href.length === 0)
                return;
            this.discardInputValue = true;
            const { from, to } = this.props;
            if (!isUrl_1.default(href) && !href.startsWith("/")) {
                href = `https://${href}`;
            }
            this.props.onSelectLink({ href, title, from, to });
        };
        this.handleKeyDown = (event) => {
            switch (event.key) {
                case "Enter": {
                    event.preventDefault();
                    const { selectedIndex, results, value } = this.state;
                    const { onCreateLink } = this.props;
                    if (selectedIndex >= 0) {
                        const result = results[selectedIndex];
                        if (result) {
                            this.save(result.url, result.title);
                        }
                        else if (onCreateLink && selectedIndex === results.length) {
                            this.handleCreateLink(value);
                        }
                    }
                    else {
                        this.save(value, value);
                    }
                    if (this.initialSelectionLength) {
                        this.moveSelectionToEnd();
                    }
                    return;
                }
                case "Escape": {
                    event.preventDefault();
                    if (this.initialValue) {
                        this.setState({ value: this.initialValue }, this.moveSelectionToEnd);
                    }
                    else {
                        this.handleRemoveLink();
                    }
                    return;
                }
                case "ArrowUp": {
                    event.preventDefault();
                    event.stopPropagation();
                    const prevIndex = this.state.selectedIndex - 1;
                    this.setState({
                        selectedIndex: Math.max(0, prevIndex),
                    });
                    return;
                }
                case "ArrowDown":
                case "Tab": {
                    event.preventDefault();
                    event.stopPropagation();
                    const total = this.state.results.length;
                    const nextIndex = this.state.selectedIndex + 1;
                    this.setState({
                        selectedIndex: Math.min(nextIndex, total),
                    });
                    return;
                }
            }
        };
        this.handleFocusLink = (selectedIndex) => {
            this.setState({ selectedIndex });
        };
        this.handleChange = async (event) => {
            const value = event.target.value;
            const looksLikeUrl = isUrl_1.default(value);
            this.setState({
                value,
                results: looksLikeUrl ? [] : this.state.results,
                selectedIndex: -1,
            });
            if (value && !looksLikeUrl && this.props.onSearchLink) {
                try {
                    const results = await this.props.onSearchLink(value);
                    this.setState({ results });
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                this.setState({ results: [] });
            }
        };
        this.handleOpenLink = (event) => {
            event.preventDefault();
            this.props.onClickLink(this.href);
        };
        this.handleCreateLink = (value) => {
            this.discardInputValue = true;
            const { onCreateLink } = this.props;
            value = value.trim();
            if (value.length === 0)
                return;
            if (onCreateLink)
                return onCreateLink(value);
        };
        this.handleRemoveLink = () => {
            this.discardInputValue = true;
            const { from, to, mark, view, onRemoveLink } = this.props;
            const { state, dispatch } = this.props.view;
            if (mark) {
                dispatch(state.tr.removeMark(from, to, mark));
            }
            if (onRemoveLink) {
                onRemoveLink();
            }
            view.focus();
        };
        this.handleSelectLink = (url, title) => event => {
            event.preventDefault();
            this.save(url, title);
            if (this.initialSelectionLength) {
                this.moveSelectionToEnd();
            }
        };
        this.moveSelectionToEnd = () => {
            const { to, view } = this.props;
            const { state, dispatch } = view;
            dispatch(prosemirror_utils_1.setTextSelection(to)(state.tr));
            view.focus();
        };
    }
    get href() {
        return this.props.mark ? this.props.mark.attrs.href : "";
    }
    render() {
        const { theme } = this.props;
        const { value, results, selectedIndex } = this.state;
        const Tooltip = this.props.tooltip;
        const looksLikeUrl = value.match(/^https?:\/\//i);
        const showCreateLink = !!this.props.onCreateLink &&
            !(value === this.initialValue) &&
            value.trim().length > 0 &&
            !looksLikeUrl;
        const showResults = !!value && (showCreateLink || results.length > 0);
        return (React.createElement(Wrapper, null,
            React.createElement(Input_1.default, { value: value, placeholder: showCreateLink ? "Find or create a doc…" : "Search or paste a link…", onKeyDown: this.handleKeyDown, onChange: this.handleChange, autoFocus: this.href === "" }),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleOpenLink, disabled: !value },
                React.createElement(Tooltip, { tooltip: "Open link", placement: "top" },
                    React.createElement(outline_icons_1.OpenIcon, { color: theme.toolbarItem }))),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleRemoveLink },
                React.createElement(Tooltip, { tooltip: "Remove link", placement: "top" }, this.initialValue ? (React.createElement(outline_icons_1.TrashIcon, { color: theme.toolbarItem })) : (React.createElement(outline_icons_1.CloseIcon, { color: theme.toolbarItem })))),
            showResults && (React.createElement(SearchResults, { id: "link-search-results" },
                results.map((result, index) => (React.createElement(LinkSearchResult_1.default, { key: result.url, title: result.title, icon: React.createElement(outline_icons_1.DocumentIcon, { color: theme.toolbarItem }), onMouseOver: () => this.handleFocusLink(index), onClick: this.handleSelectLink(result.url, result.title), selected: index === selectedIndex }))),
                showCreateLink && (React.createElement(LinkSearchResult_1.default, { key: "create", title: `Create new doc “${value.trim()}”`, icon: React.createElement(outline_icons_1.PlusIcon, { color: theme.toolbarItem }), onMouseOver: () => this.handleFocusLink(results.length), onClick: () => {
                        this.handleCreateLink(value);
                        if (this.initialSelectionLength) {
                            this.moveSelectionToEnd();
                        }
                    }, selected: results.length === selectedIndex }))))));
    }
}
const Wrapper = styled_components_1.default(Flex_1.default) `
  margin-left: -8px;
  margin-right: -8px;
  min-width: 336px;
`;
const SearchResults = styled_components_1.default.ol `
  background: ${props => props.theme.toolbarBackground};
  position: absolute;
  top: 100%;
  width: 100%;
  height: auto;
  left: 0;
  padding: 8px;
  margin: 0;
  margin-top: -3px;
  margin-bottom: 0;
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  max-height: 25vh;
`;
exports.default = styled_components_1.withTheme(LinkEditor);
//# sourceMappingURL=LinkEditor.js.map
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
const react_portal_1 = require("react-portal");
const lodash_1 = require("lodash");
const styled_components_1 = __importDefault(require("styled-components"));
const SSR = typeof window === "undefined";
class FloatingToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.menuRef = this.props.forwardedRef || React.createRef();
        this.state = {
            left: -1000,
            top: 0,
            offset: 0,
            visible: false,
        };
    }
    componentDidMount() {
        this.setState(this.calculatePosition(this.props));
    }
    componentDidUpdate() {
        const newState = this.calculatePosition(this.props);
        if (!lodash_1.isEqual(newState, this.state)) {
            this.setState(newState);
        }
    }
    calculatePosition(props) {
        const { view, active } = props;
        const { selection } = view.state;
        if (!active || !this.menuRef.current || SSR) {
            return {
                left: -1000,
                top: 0,
                offset: 0,
                visible: false,
            };
        }
        const startPos = view.coordsAtPos(selection.$from.pos);
        const endPos = view.coordsAtPos(selection.$to.pos);
        const isColSelection = selection.isColSelection && selection.isColSelection();
        const isRowSelection = selection.isRowSelection && selection.isRowSelection();
        if (isRowSelection) {
            endPos.left = startPos.left + 12;
        }
        else if (isColSelection) {
            const { node: element } = view.domAtPos(selection.$from.pos);
            const { width } = element.getBoundingClientRect();
            endPos.left = startPos.left + width;
        }
        const halfSelection = Math.abs(endPos.left - startPos.left) / 2;
        const centerOfSelection = startPos.left + halfSelection;
        const { offsetWidth, offsetHeight } = this.menuRef.current;
        const margin = 12;
        const left = Math.min(window.innerWidth - offsetWidth - margin, Math.max(margin, centerOfSelection - offsetWidth / 2));
        const top = Math.min(window.innerHeight - offsetHeight - margin, Math.max(margin, startPos.top - offsetHeight));
        const offset = Math.round(left - (centerOfSelection - offsetWidth / 2));
        return {
            left: Math.round(left + window.scrollX),
            top: Math.round(top + window.scrollY),
            offset,
            visible: true,
        };
    }
    render() {
        const { children, active } = this.props;
        return (React.createElement(react_portal_1.Portal, null,
            React.createElement(Wrapper, { active: active, ref: this.menuRef, offset: this.state.offset, style: {
                    top: `${this.state.top}px`,
                    left: `${this.state.left}px`,
                } }, this.state.visible && children)));
    }
}
const Wrapper = styled_components_1.default.div `
  padding: 8px 16px;
  position: absolute;
  z-index: ${props => props.theme.zIndex + 100};
  opacity: 0;
  background-color: ${props => props.theme.toolbarBackground};
  border-radius: 4px;
  transform: scale(0.95);
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 150ms;
  line-height: 0;
  height: 40px;
  box-sizing: border-box;
  pointer-events: none;
  white-space: nowrap;

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    transform: translateX(-50%) rotate(45deg);
    background: ${props => props.theme.toolbarBackground};
    border-radius: 3px;
    z-index: -1;
    position: absolute;
    bottom: -2px;
    left: calc(50% - ${props => props.offset || 0}px);
  }

  * {
    box-sizing: border-box;
  }

  ${({ active }) => active &&
    `
    transform: translateY(-6px) scale(1);
    pointer-events: all;
    opacity: 1;
  `};

  @media print {
    display: none;
  }
`;
exports.default = React.forwardRef((props, ref) => (React.createElement(FloatingToolbar, Object.assign({}, props, { forwardedRef: ref }))));
//# sourceMappingURL=FloatingToolbar.js.map
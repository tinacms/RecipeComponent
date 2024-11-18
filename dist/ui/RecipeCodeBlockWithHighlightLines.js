import Prism from 'prismjs';
import React, { useEffect, useRef, useState } from 'react';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prism-themes/themes/prism-night-owl.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import { CodeToolbar } from './RecipeCodeToolBar';
const CodeBlockWithHighlightLines = ({ value, lang = 'javascript', children, highlightLines, }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const preRef = useRef(null);
    useEffect(() => {
        if (preRef.current) {
            preRef.current.setAttribute('data-line', highlightLines);
            Prism.highlightAllUnder(preRef.current);
        }
    }, [highlightLines, value, children]);
    const copyToClipboard = () => {
        const codeToCopy = typeof children === 'string' ? children : value || '';
        navigator.clipboard.writeText(codeToCopy).then(() => {
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 1500);
        }, (err) => {
            console.error('Failed to copy code:', err);
        });
    };
    return (React.createElement("div", { className: "codeblock-container" },
        React.createElement("div", { className: "sticky top-0 z-30" },
            React.createElement(CodeToolbar, { lang: lang, onCopy: copyToClipboard, tooltipVisible: tooltipVisible })),
        React.createElement("pre", { ref: preRef, className: "line-numbers", "data-line": highlightLines, style: {
                overflowX: 'hidden',
                maxWidth: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            } },
            React.createElement("code", { className: `language-${lang}` }, value || children))));
};
export default CodeBlockWithHighlightLines;

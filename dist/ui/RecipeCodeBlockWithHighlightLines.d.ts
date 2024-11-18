import React from 'react';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
interface CodeBlockProps {
    value?: string;
    lang?: string;
    children?: React.ReactNode;
    highlightLines: string;
}
declare const CodeBlockWithHighlightLines: ({ value, lang, children, highlightLines, }: CodeBlockProps) => React.JSX.Element;
export default CodeBlockWithHighlightLines;

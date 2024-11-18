import React, { useEffect, useRef, useState } from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
import debounce from 'lodash/debounce';
const MonacoCodeEditor = wrapFieldsWithMeta(({ field, input, meta }) => {
    const editorRef = useRef(null);
    const monacoInstance = useRef(null);
    const [localValue, setLocalValue] = useState(input.value || '');
    const updateTinaValue = debounce((value) => {
        input.onChange(value);
    }, 300);
    useEffect(() => {
        const loadMonaco = async () => {
            const monaco = await import('monaco-editor');
            if (editorRef.current && !monacoInstance.current) {
                monacoInstance.current = monaco.editor.create(editorRef.current, {
                    value: localValue,
                    language: 'javascript',
                    theme: 'vs-dark',
                    automaticLayout: true,
                });
                monacoInstance.current.onDidChangeModelContent(() => {
                    const value = monacoInstance.current?.getValue() || '';
                    setLocalValue(value);
                    updateTinaValue(value);
                });
            }
        };
        if (typeof window !== 'undefined') {
            loadMonaco();
        }
        return () => {
            if (monacoInstance.current) {
                monacoInstance.current.dispose();
            }
        };
    }, []);
    useEffect(() => {
        if (monacoInstance.current && input.value !== localValue) {
            monacoInstance.current.setValue(input.value || '');
            setLocalValue(input.value || '');
        }
    }, [input.value]);
    return (React.createElement("div", null,
        React.createElement("div", { ref: editorRef, style: { height: '400px', width: '100%' } })));
});
export default MonacoCodeEditor;

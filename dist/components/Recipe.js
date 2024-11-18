import React, { useEffect, useRef, useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { customHighlightCSS } from '../styles/RecipeCSS';
import CodeBlockWithHighlightLines from '../ui/RecipeCodeBlockWithHighlightLines';
export const RecipeBlock = ({ data }) => {
    const { title, description, codeblock, code, instruction } = data;
    const [highlightLines, setHighlightLines] = useState('');
    const [clickedInstruction, setClickedInstruction] = useState(null);
    const [LHSheight, setLHSheight] = useState(null);
    const [CodeBlockWidth, setCodeBlockWidth] = useState(null);
    const [isBottomOfInstructions, setIsBottomOfInstructions] = useState(false);
    const codeblockRef = useRef(null);
    const instructionBlockRefs = useRef(null);
    const instructionRefs = useRef([]);
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = customHighlightCSS;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, [highlightLines]);
    useEffect(() => {
        setLHSheight(`${codeblockRef.current?.offsetHeight}`);
        setCodeBlockWidth(`${codeblockRef.current?.offsetWidth}`);
    });
    const checkIfBottom = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
        setIsBottomOfInstructions(scrollHeight - scrollTop <= clientHeight + 10);
    };
    const handleInstructionClick = (index, codeLineStart, codeLineEnd) => {
        setHighlightLines(`${codeLineStart}-${codeLineEnd}`);
        setClickedInstruction(index === clickedInstruction ? null : index);
        const linePixelheight = 24;
        const linePixelBuffer = 15;
        if (codeblockRef.current) {
            codeblockRef.current.scrollTo({
                top: linePixelheight * (codeLineStart || 0) - linePixelBuffer,
                behavior: 'smooth',
            });
        }
        if (window.innerWidth < 1024 && instructionRefs.current[index]) {
            instructionRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    };
    const handleDownArrowClick = () => {
        const lastInstruction = instructionRefs.current[instructionRefs.current.length - 1];
        if (lastInstruction) {
            lastInstruction.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    };
    const smAndMbHeight = LHSheight ? `${Number(LHSheight) / 2}px` : null;
    const calculateInstructionsHeight = () => {
        return instructionRefs.current.reduce((total, ref) => {
            return total + (ref?.offsetHeight || 0);
        }, 0);
    };
    const checkIfScrollable = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return calculateInstructionsHeight() >= parseInt(smAndMbHeight || '0', 10);
        }
        else {
            return calculateInstructionsHeight() > parseInt(LHSheight || '0', 10);
        }
    };
    return (React.createElement("div", { className: "recipe-block-container mt-20 relative" },
        React.createElement("div", { className: "title-description px-10" },
            React.createElement("h2", { className: "font-tuner text-orange-500 text-2xl" }, title || 'Default Title'),
            React.createElement("p", { className: "font-light py-2 text-base" }, description || 'Default Description')),
        React.createElement("div", { className: "content-wrapper flex flex-col lg:flex-row px-10 items-stretch" },
            React.createElement("div", { className: "instructions bg-gray-800 relative lg:w-1/3 max-h-50vh flex-shrink-0 flex-grow rounded-tl-xl rounded-br-xl lg:rounded-br-none rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl flex flex-col", ref: instructionBlockRefs, style: {
                    height: typeof window !== 'undefined' && window.innerWidth >= 1024
                        ? `${LHSheight}px`
                        : `${smAndMbHeight}`,
                } },
                React.createElement("div", { className: `${isBottomOfInstructions ? 'hidden' : ''}` },
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60 lg:rounded-bl-xl pointer-events-none" }),
                    React.createElement(FaChevronCircleDown, { onClick: handleDownArrowClick, className: `absolute bottom-4 left-1/2 transform -translate-x-1/2 w-7 h-7 text-xl text-white cursor-pointer shadow-md
                ${checkIfScrollable() ? '' : 'hidden'}` })),
                React.createElement("div", { className: "overflow-auto rounded-tl-xl rounded-bl-xl rounded-tr-xl lg:rounded-tr-none", onScroll: checkIfBottom }, instruction?.map((inst, idx) => (React.createElement("div", { key: idx, ref: (el) => (instructionRefs.current[idx] = el), className: `instruction-item cursor-pointer p-4 border-gray-700 border-y bg-gray-800 text-white 
                ${clickedInstruction === idx ? 'bg-slate-600' : ''}`, onClick: () => handleInstructionClick(idx, inst.codeLineStart, inst.codeLineEnd) },
                    React.createElement("h5", { className: "font-tuner" }, `${idx + 1}. ${inst.header || 'Default Header'}`),
                    React.createElement("div", { className: `overflow-auto transition-all ease-in-out ${clickedInstruction === idx
                            ? 'duration-500 max-h-full opacity-100'
                            : 'duration-0 max-h-0 opacity-0'}` },
                        React.createElement("span", { className: "mt-2" }, inst.itemDescription || 'Default Item Description'))))) || React.createElement("p", null, "No instructions available."))),
            React.createElement("div", { ref: codeblockRef, className: "codeblock bg-gray-800 lg:w-2/3 max-h-50vh overflow-auto lg:rounded-tr-xl rounded-bl-xl lg:rounded-bl-none rounded-br-xl " }, code ? (React.createElement(CodeBlockWithHighlightLines, { value: code, lang: "javascript", highlightLines: highlightLines })) : codeblock ? (React.createElement(TinaMarkdown, { key: highlightLines, content: codeblock, components: {
                    code_block: (props) => (React.createElement(CodeBlockWithHighlightLines, { ...props, highlightLines: highlightLines })),
                } })) : (React.createElement("p", null, "No code block available."))))));
};
export default RecipeBlock;

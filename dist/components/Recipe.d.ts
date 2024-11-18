import React from 'react';
interface RecipeData {
    title?: string;
    description?: string;
    codeblock?: any;
    code?: string;
    instruction?: Array<{
        header?: string;
        itemDescription?: string;
        codeLineStart?: number;
        codeLineEnd?: number;
    }>;
}
export declare const RecipeBlock: ({ data }: {
    data: RecipeData;
}) => React.JSX.Element;
export default RecipeBlock;

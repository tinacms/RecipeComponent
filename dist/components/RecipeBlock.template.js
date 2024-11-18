import dynamic from 'next/dynamic';
const MonacoCodeEditor = dynamic(() => import('./MonacoCodeEditor'), { ssr: false });
export const RecipeBlockTemplate = {
    name: 'recipeBlock',
    label: 'Recipe Block',
    fields: [
        {
            name: 'title',
            label: 'Heading Title',
            type: 'string',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'string',
        },
        {
            type: 'string',
            name: 'code',
            label: 'Code',
            ui: {
                component: MonacoCodeEditor
            }
        },
        {
            name: 'instruction',
            label: 'Instruction',
            type: 'object',
            list: true,
            ui: {
                itemProps: (item) => {
                    return { label: item?.header };
                },
            },
            fields: [
                {
                    name: 'header',
                    label: 'Header',
                    type: 'string',
                },
                {
                    name: 'itemDescription',
                    label: 'Item Description',
                    type: 'string',
                },
                {
                    name: 'codeLineStart',
                    label: 'Code Line Start',
                    type: 'number',
                    description: 'Enter negative values to highlight from 0 to your end number',
                },
                {
                    name: 'codeLineEnd',
                    label: 'Code Line End',
                    type: 'number',
                    description: 'Highlighting will not work if end number is greater than start number',
                },
            ],
        },
    ],
};
export default RecipeBlockTemplate;

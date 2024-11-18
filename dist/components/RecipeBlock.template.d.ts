export declare const RecipeBlockTemplate: {
    name: string;
    label: string;
    fields: ({
        name: string;
        label: string;
        type: string;
        ui?: undefined;
        list?: undefined;
        fields?: undefined;
    } | {
        type: string;
        name: string;
        label: string;
        ui: {
            component: import("react").ComponentType<import("tinacms/dist/toolkit/fields/plugins/field-props").FieldProps<{}>>;
            itemProps?: undefined;
        };
        list?: undefined;
        fields?: undefined;
    } | {
        name: string;
        label: string;
        type: string;
        list: boolean;
        ui: {
            itemProps: (item: {
                header: any;
            }) => {
                label: any;
            };
            component?: undefined;
        };
        fields: ({
            name: string;
            label: string;
            type: string;
            description?: undefined;
        } | {
            name: string;
            label: string;
            type: string;
            description: string;
        })[];
    })[];
};
export default RecipeBlockTemplate;

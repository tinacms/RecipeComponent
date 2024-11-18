export declare const RecipeBlock: {
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
            component: (props: import("tinacms/dist/toolkit/fields/plugins/field-props").FieldProps<{}>) => React.JSX.Element;
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

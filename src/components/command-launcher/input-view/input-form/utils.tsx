import { AutoFocusedInput } from "../../../common/AutoFocusedInput";
import { ZodOptional, ZodSchema } from "zod";

//Add custom inputs as needed
export const buildZodInput = (type: ZodSchema,name: string,onChange: ((value: any) => void), isFocused: boolean) : JSX.Element => {
    switch (type.constructor.name) {
        //if encountering an optional type, unwrap it and attempt to resolve the type again
        case "ZodOptional":
            return buildZodInput((type as ZodOptional<any>).unwrap(),name,onChange,isFocused);
        case "ZodDate":
            return buildDateInput(name,onChange,isFocused);
        //default to text input
        default:
            return buildTextInput(name,onChange,isFocused);
    }
}

const buildInput = (type: string, name: string, onChange: (value: any) => void, isFocused : boolean) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = e.target.value;
        onChange(result);
    }

    return (
        <AutoFocusedInput
            type={type}
            name={name}
            onChange={handleChange}
            isFocused={isFocused}
        />
    )
}

const buildDateInput = (name: string, onChange: (value: any) => void, isFocused : boolean) => {
    //convert string to date
    const handleChange = (stringValue: string) => {
        const date = new Date(stringValue);
        onChange(date);
        console.log(stringValue);
    }
    return buildInput('date',name,handleChange,isFocused);
}

const buildTextInput = (name: string, onChange: (value: any) => void, isFocused : boolean) => {

    //treat empty input box as no value
    const handleChange = (stringValue: string) => {
        const input = stringValue.length === 0 ? undefined : stringValue;
        onChange(input);
    }

    return buildInput('text',name,handleChange,isFocused);
}
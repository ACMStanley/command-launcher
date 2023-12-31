import { AutoFocusedInput } from "../../../common/AutoFocusedInput";
import { ZodDate, ZodOptional, ZodSchema } from "zod";

//Add custom inputs as needed
export const buildZodInput = (type: ZodSchema,name: string,onChange: ((value: any) => void), isFocused: boolean) : JSX.Element => {
    //if encountering an optional type, unwrap it and attempt to resolve the type again
    if(type instanceof ZodOptional){
        return buildZodInput(type.unwrap(),name,onChange,isFocused);
    }
    if(type instanceof ZodDate){
        return buildDateInput(name,onChange,isFocused);
    }
    //default to text input
    return buildTextInput(name,onChange,isFocused);
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
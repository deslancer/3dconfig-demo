import { MaterialType } from "../helpers/Materials";

interface SelectProps {
    labelText: string;
    options: string[];
    value: string;
    onChange: (value: MaterialType) => void;
}
export const Select = (props: SelectProps) => {
    return (
        <div className="w-full">
                <label className="text-gray-600 text-sm font-medium uppercase">
                {props.labelText}
            </label>
            <select onChange={(e) => props.onChange(e.target.value as MaterialType)} value={props.value} className="w-full bg-white text-dark-gray px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12">
                {props.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
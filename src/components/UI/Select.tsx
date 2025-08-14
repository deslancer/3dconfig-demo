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
                <label className="text-gray-600 dark:text-gray-300 text-sm font-medium uppercase">
                {props.labelText}
            </label>
            <select onChange={(e) => props.onChange(e.target.value as MaterialType)} value={props.value} className="w-full bg-white dark:bg-dark-surface text-dark-gray dark:text-dark-text px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12">
                {props.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
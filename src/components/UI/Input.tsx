interface InputProps {
    labelText: string;
    type: "text" | "number";
    min: number;
    max: number;
    value: number;
    className?: string;
    rest?: React.ComponentProps<"input">;
    onChange?: (value: number) => void;
}
export const Input = (props: InputProps) => {
  const validateValue = (inputValue: string): number => {
    const numValue = isNaN(+inputValue) ? props.min : +inputValue;
    if (numValue < props.min) {
      return props.min;
    }
    if (numValue > props.max) {
      return props.max;
    }
    return numValue;
  };

  return (
    <div className="w-full">
    <div className="flex items-center gap-2 mb-2">
      <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
        {props.labelText}
      </label>
    </div>
    
    <div className="relative">
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        value={props.value}
        onBlur={(e) => {
          const validatedValue = validateValue(e.target.value);
          props.onChange?.(validatedValue);
        }}
        onChange={(e) => {
          props.onChange?.(+e.target.value);
        }}
        className="w-full bg-white text-dark-gray px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
        placeholder="400"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
        mm
      </span>
    </div>
    
    <div className="mt-1">
      <span className="text-xs text-gray-400">
       min: {props.min} - max: {props.max} mm
      </span>
    </div>
  </div>
  );
};
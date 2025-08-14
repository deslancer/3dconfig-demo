import { useState, useEffect } from 'react';

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
  const [tempValue, setTempValue] = useState<string>(props.value.toString());
  const [hasChanges, setHasChanges] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    setTempValue(props.value.toString());
    setHasChanges(false);
    setValidationError("");
  }, [props.value]);

  const validateValue = (inputValue: string): { isValid: boolean; value: number; error: string } => {
    const numValue = parseFloat(inputValue);
    
    if (isNaN(numValue) || inputValue.trim() === "") {
      return { isValid: false, value: props.min, error: "Voer een geldig getal in" };
    }
    
    if (numValue < props.min) {
      return { isValid: false, value: numValue, error: `Minimumwaarde: ${props.min}mm` };
    }
    
    if (numValue > props.max) {
      return { isValid: false, value: numValue, error: `Maximumwaarde: ${props.max}mm` };
    }
    
    return { isValid: true, value: numValue, error: "" };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempValue(newValue);
    
    const currentValue = parseFloat(newValue);
    const hasChanged = !isNaN(currentValue) && currentValue !== props.value;
    setHasChanges(hasChanged);
    
    const validation = validateValue(newValue);
    setValidationError(validation.error);
  };

  const handleApplyChanges = () => {
    const validation = validateValue(tempValue);
    
    if (validation.isValid) {
      props.onChange?.(validation.value);
      setHasChanges(false);
      setValidationError("");
    } else {
      setValidationError(validation.error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyChanges();
    }
    if (e.key === 'Escape') {
      setTempValue(props.value.toString());
      setHasChanges(false);
      setValidationError("");
    }
  };

  const isValid = validateValue(tempValue).isValid;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-gray-600 dark:text-gray-300 text-sm font-medium uppercase tracking-wide">
          {props.labelText}
        </label>
      </div>
      
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={props.type}
              min={props.min}
              max={props.max}
              value={tempValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className={`w-full bg-white dark:bg-dark-surface text-dark-gray dark:text-dark-text px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent pr-12 ${
                validationError 
                  ? 'border-red-300 focus:ring-red-500' 
                  : hasChanges
                  ? 'border-yellow-300 focus:ring-yellow-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              }`}
              placeholder={props.min.toString()}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
              mm
            </span>
          </div>
          
          {hasChanges && (
            <button
              onClick={handleApplyChanges}
              disabled={!isValid}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isValid
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title="Wijzigingen toepassen (Enter)"
            >
              ✓
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-1 min-h-[16px]">
        {validationError ? (
          <span className="text-xs text-red-500">
            {validationError}
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            min: {props.min} - max: {props.max} mm
            {hasChanges && <span className="ml-2 text-yellow-600 dark:text-yellow-500">• Klik ✓ of druk Enter om toe te passen</span>}
          </span>
        )}
      </div>
    </div>
  );
};
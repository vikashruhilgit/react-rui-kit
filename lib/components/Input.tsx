import { FC, InputHTMLAttributes } from "react";
import "../main.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  label: string;
}

export const Input: FC<InputProps> = ({
  error,
  helperText,
  name,
  id,
  disabled,
  required,
  leadingIcon,
  trailingIcon,
  placeholder,
  type,
  label,
  ...props
}) => {
  const labelId = label.toLowerCase().replace(" ", "")
  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        {!required && <span className="text-xs leading-6 text-gray-500" id="email-optional">
          Optional
        </span>}
      </div>
      <div className="relative mt-2 ">
        {leadingIcon &&
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
          </div>}
        <input
          type={type || "text"}
          name={name || labelId}
          id={id || labelId}
          className={`${leadingIcon && "pl-10"} ${trailingIcon && "pr-10"} ${error ? "text-red-900 ring-red-400 placeholder:text-red-400 focus:ring-red-500" : "text-gray-900 ring-gray-300 focus:ring-blue-600 placeholder:text-gray-300"} ${disabled && "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"} block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...props}
        />
        {trailingIcon && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        </div>}
        {error &&
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-red-400" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        }
      </div>
      <p className={`text-xs mt-2 ${error ? "text-red-400" : "text-gray-500"}`} id="helper-description">
        {(helperText || error) ? helperText : " "}
      </p>
    </div>
  )
}

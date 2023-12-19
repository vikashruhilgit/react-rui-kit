import { FC, InputHTMLAttributes } from "react";

import "../main.css";

interface RadioItemProps {
  id: string;
  label: string;
  description?: string;
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  items: RadioItemProps[];
  heading?: string;
  subHeading?: string;
  defaultCheck?: boolean;
  selectedId?: string;
  rowView?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined
}

export const Radio: FC<RadioProps> = ({
  items,
  heading,
  subHeading,
  defaultCheck = true,
  selectedId,
  rowView,
  onChange,
  onClick,
  ...props
}) => {
  const checkIfchecked = (id: string) => {
    if (selectedId) {
      return selectedId === id;
    } else {
      return defaultCheck ? items[0].id === id : false
    }
  }
  return (
    <div>
      {heading && <label className="text-base font-semibold text-gray-900">{heading}</label>}
      {subHeading && <p className="text-sm text-gray-500">{subHeading}</p>}
      <fieldset className="mt-4">
        {heading && <legend className="sr-only">{heading}</legend>}
        <div className={`space-y-4 ${rowView && "sm:flex sm:items-center sm:space-x-10 sm:space-y-0"}`}>
          {items.map((item) => (
            <div key={item.id} className={`flex items-center`} >
              <input
                id={item.id}
                name={item.description ? item.description : heading || "custom-radio-buttons"}
                type="radio"
                aria-describedby={item.description || item.label}
                defaultChecked={checkIfchecked(item.id)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                onChange={onChange}
                onClick={onClick}
                data-item={item}
                {...props}
              />
              <label htmlFor={item.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900 cursor-pointer">
                {item.label}
              </label>
              {item.description &&
                <p id="comments-description" className="text-gray-500">
                  {item.description}
                </p>}
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

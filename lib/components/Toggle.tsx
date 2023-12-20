import { FC, useState } from "react";
import { Switch } from "@headlessui/react";

import "../main.css";

interface ToggleProps {
  title?: string;
  status: boolean;
  compact?: boolean;
  onChange?: (val: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({
  title,
  status,
  compact,
  onChange
}) => {

  const [enabled, setEnabled] = useState(status)

  const ChangeHandler = (val: boolean) => {
    setEnabled(!enabled)
    onChange && onChange(!val);
  }

  return (
    <>
      {compact ?
        <Switch
          checked={enabled}
          onChange={ChangeHandler}
          className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <span className="sr-only">{title || "toggle button"}</span>
          <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
          <span
            aria-hidden="true"
            className={`
            ${enabled ? 'bg-blue-600' : 'bg-gray-200'}
            pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out
          `}
          />
          <span
            aria-hidden="true"
            className={`
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out
          `}
          />
        </Switch> :
        <Switch
          checked={enabled}
          onChange={ChangeHandler}
          className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} 
         relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
      `}
        >
          <span className="sr-only">{title || "toggle button"}</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      }
    </>

  )
}

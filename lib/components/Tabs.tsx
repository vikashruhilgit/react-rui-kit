import { FC, MouseEvent } from "react";
import * as Icons from '@heroicons/react/20/solid';

import "../main.css";

export interface TabItem {
  name: string;
  href?: string;
  current: boolean;
  /**
   * Only @heroicons are supported.
   */
  icon?: string;
}

enum TabType {
  Bar = "Bar",
  Pills = "Pills",
  default = "default"
}

export interface TabsProps {
  tabs: TabItem[];
  type?: keyof typeof TabType
  fullWidth?: boolean;
  justifyCenter?: boolean
  onChange?: (item: TabItem) => void
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  type = "default",
  fullWidth,
  justifyCenter,
  onChange
}) => {
  const renderIcon = (tab: TabItem) => {
    /* Hack to fix type issue for icons */
    const icon = tab.icon as "AcademicCapIcon";
    if (icon) {
      const Icon = Icons[icon];
      return (<Icon
        className={`${tab.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
           -ml-0.5 mr-2 h-5 w-5`}
        aria-hidden="true"
      />)
    }
    return null;
  }

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>, item: TabItem) => {
    e.preventDefault();
    onChange && onChange(item)
  }

  const generateClasses = (item: TabItem, index: number) => {
    let classes = "";
    switch (type) {
      case TabType.Pills:
        classes = `${item.current ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'} rounded-md group inline-flex items-center px-3 py-2 text-sm font-medium`;
        break;
      case TabType.Bar:
        classes = `${item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
        ${index === 0 ? 'rounded-l-lg' : ''}
        ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}
        group inline-flex relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium hover:bg-gray-50 focus:z-10`;
        break;
      default:
        classes = `${item.current ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} border-b-2 group inline-flex items-center py-4 px-1 text-sm font-medium`;
        break;
    }

    return classes
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        {/* <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs!.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select> */}
      </div>
      <div className="hidden sm:block">
        <div className={`${type === TabType.default ? "border-b border-gray-200" : ""}`}>
          <nav className={`flex cursor-pointer ${type === TabType.Pills && "space-x-4"} ${type === TabType.default && "-mb-px"} ${type === TabType.Bar && "isolate divide-x divide-gray-200 rounded-lg shadow"} `} aria-label="Tabs">
            {tabs.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                className={`${generateClasses(item, idx)}  ${fullWidth && "flex-1"} ${justifyCenter && "justify-center "}`}
                aria-current={item.current ? 'page' : undefined}
                onClick={(e) => clickHandler(e, item)}
              >
                {renderIcon(item)}
                <span className="whitespace-nowrap w-min">{item.name}</span>
                {type === TabType.Bar && <span
                  aria-hidden="true"
                  className={`${item.current ? 'bg-blue-500' : 'bg-transparent'}
                    absolute inset-x-0 bottom-0 h-0.5`}
                />}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}


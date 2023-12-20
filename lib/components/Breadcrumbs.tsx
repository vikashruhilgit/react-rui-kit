import { FC } from "react";

export interface BreadcrumbsItem {
  name: string,
  href: string,
  current: boolean
}

enum BreadcrumbsType {
  Chevrons = "Chevrons",
  Slashes = "Slashes",
  default = "default"
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  fullWidth?: boolean;
  type?: keyof typeof BreadcrumbsType
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  fullWidth,
  type = BreadcrumbsType.default
}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className={`flex ${fullWidth && 'w-full'} space-x-4 ${type === BreadcrumbsType.default && "rounded-md bg-white shadow"}  px-6`}>
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <svg className="h-5 w-5 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" >
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {items.map((kitem: BreadcrumbsItem) => (
          <li key={kitem.name} className="flex">
            <div className="flex items-center">
              {type === BreadcrumbsType.Chevrons && <svg
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>}
              {type === BreadcrumbsType.Slashes && <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>}
              {type === BreadcrumbsType.default && <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>}
              <a
                href={kitem.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={kitem.current ? 'page' : undefined}
              >
                {kitem.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

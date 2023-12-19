import "../main.css";

import { FC } from "react"

interface AvatarProps {
  link?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  round?: boolean;
  notificationIndicator?: boolean;
  notificationType?: "default" | "primary" | "warn";
}

export const Avatar: FC<AvatarProps> = ({
  link,
  size = "md",
  round,
  notificationIndicator,
  notificationType = "default"
}) => {

  let sizeClass = "";
  let nofificationClass = "";
  let notificationColor = "";

  switch (size) {
    case "xs":
      sizeClass = "h-6 w-6";
      nofificationClass = "h-1.5 w-1.5";
      break;
    case "sm":
      sizeClass = "h-8 w-8";
      nofificationClass = "h-2 w-2";
      break;
    case "md":
      sizeClass = "h-10 w-10";
      nofificationClass = "h-2.5 w-2.5";
      break;
    case "lg":
      sizeClass = "h-12 w-12";
      nofificationClass = "h-3 w-3";
      break;
    case "xl":
      sizeClass = "h-14 w-14";
      nofificationClass = "h-3.5 w-3.5";
      break;
  }

  switch (notificationType) {
    case "primary":
      notificationColor = "bg-blue-600";
      break;
    case "warn":
      notificationColor = "bg-red-400";
      break;
    default:
      notificationColor = "bg-gray-300";
      break;
  }



  return (
    <span className="relative inline-block">
      {link ? <img
        className={`${sizeClass} ${round ? "rounded-full" : "rounded-md"}`}
        src={link}
        alt=""
      /> :
        <span className={`inline-block ${sizeClass} ${round ? "rounded-full" : "rounded-md"} overflow-hidden bg-gray-100 `}>
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>}
      {notificationIndicator &&
        <span className={`absolute right-0 top-0 block ${nofificationClass} ${!round && '-translate-y-1/2 translate-x-1/2'} rounded-full ${notificationColor} ring-2 ring-white`} />}
    </span>
  )
}

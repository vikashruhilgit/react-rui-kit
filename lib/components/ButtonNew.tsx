import "./ButtonNew.module.scss";

interface ButtonProps {
  /**
   * Button contents
   */
  label?: string;
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  /**
   * if its a link or not
   */
  link?: boolean;
  /**
   * nightmode light and dark
   */
  nightmode?: boolean
  /**
   * Optional border radius default or rounded
   */
  roundedFull?: boolean;
  /**
   * Optional if button require to take whole space of outer container
   */
  fullWidth?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;

  children?: JSX.Element | string

}

/**
 * Primary UI component for user interaction
 */
export const ButtonNew = ({
  primary = false,
  size = 'medium',
  label = "default",
  roundedFull,
  fullWidth,
  children,
  ...props
}: ButtonProps) => {

  let sizeClass = "text-sm px-2.5 py-1.5";
  switch (size) {
    case "xl":
      sizeClass = "text-sm px-3.5 py-2.5"
      break;
    case "large":
      sizeClass = "text-sm px-3 py-2"
      break;
    case "small":
      sizeClass = "text-sm px-2 py-1"
      break;
    case "xs":
      sizeClass = "text-xs px-2 py-1"
      break;
  }
  const radius = roundedFull ? "rounded-full" : "rounded-lg";
  const background = primary ? "bg-blue-600 hover:bg-blue-500 text-white" : "ring-gray-300 ring-inset shadow-sm ring-1 text-gray-900 bg-white hover:bg-slate-100"

  return (
    <button
      className={`${background} ${sizeClass} ${radius} text-center ${fullWidth ? "w-full" : ""} capitalize rounded-full font-medium cursor-pointer select-none`}
      {...props}
    >
      {label ? label : children}
    </button>
  );
};

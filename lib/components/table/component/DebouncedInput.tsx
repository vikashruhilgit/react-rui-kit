import { useEffect, useState } from "react"

type Props = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const DebouncedInput: React.FC<Props> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<number | string>(initialValue)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <input {...props} value={value} onChange={handleInputChange} />
}

export default DebouncedInput
import { ChangeEvent, FC } from "react";

interface Props {
  name: string;
  value: string | number;
  type: "text" | "number";
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

const Input: FC<Props> = ({
  name,
  onChange,
  type,
  value,
  placeholder,
  readonly,
}) => {
  // Ensure the value is a string when passed to the input
  const inputValue = type === "number" ? String(value) : value;

  return (
    <div className="min-w-48 w-full relative">
      <input
        type={type}
        className="w-full pr-6 pl-8 py-4 rounded-xl outline-none duration-200 ring-1 ring-transparent focus:ring-[#11BE86]"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default Input;

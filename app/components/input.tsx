import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

// export default function SignInInput(): React.FC<InputProps> {
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="block w-full px-6 pt-6 pb-1 text-white rounded-md appearance-none peer text-md bg-neutral-700 focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label
        className="absolute duration-150 transform text-md text-zinc-400 -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

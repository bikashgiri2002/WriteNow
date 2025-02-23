/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700 duration-200 border border-gray-200 dark:border-gray-600 w-full`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;

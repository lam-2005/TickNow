import React, { ReactNode } from "react";
type InputType = {
  type?: string;
  label: string;
  required?: boolean;
  value?: string;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  error?: string;
};
const Input = (props: InputType) => {
  return (
    <div className="space-y-1 flex-1 min-w-[173px]">
      <div className="group w-full bg-transparent relative">
        <input
          autoComplete="off"
          placeholder=" "
          type={props.type}
          required={props.required || true}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={`peer/input w-full h-full outline-0 p-3 text-foreground border-1 border-gray-500 backdrop-blur-[1.75px] focus:border-foreground transition-colors duration-500 rounded-md ${
            props.type === "date"
              ? "dark:bg-transparent dark:appearance-none dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:cursor-pointer "
              : ""
          }
          [&[type='date']]:p-2.5
          [&[type='date']]:invalid:not-focus:text-transparent
          ${props.error && "border-red-700"}
          `}
        />
        <label
          className={`absolute left-0 p-1.5 pointer-events-none text-foreground ml-1.5 transition-all duration-500 
         bg-background-card dark:text-subtitle
         peer-focus/input:scale-80 peer-focus/input:-translate-y-5 
         peer-focus/input:text-foreground
         peer-focus/input:peer-required/input:after:content-['_*'] 
         after:text-red-500
         ${
           props.value
             ? "-translate-y-5 scale-80 text-foreground peer-required/input:after:content-['_*'] "
             : "translate-y-1"
         }
         `}
        >
          {props.label}
        </label>
        {props.children}
      </div>
      {props.error && (
        <span className="text-red-600 text-[13px] bg-red-200 px-2 py-0.75 rounded-sm">
          {props.error}
        </span>
      )}
    </div>
  );
};

export default Input;

import { ReactNode } from "react";
import { LabelHTMLAttributes } from "react";

export type LabelProp = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

const Label = ({ className, children, ...props }: LabelProp) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;

import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

import "./styles.css";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextField: FC<Props> = (props) => (
  <input className="text-field" {...props}></input>
);

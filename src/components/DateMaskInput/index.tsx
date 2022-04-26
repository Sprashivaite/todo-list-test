import { FC } from "react";
import IMask from "imask";
import { IMaskInput } from "react-imask";

import { dateFormat } from "../../consts";
import "./styles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const DateMaskInput: FC<Props> = ({ value, onChange }) => (
  <IMaskInput
    mask={dateFormat}
    value={value}
    onAccept={(value) => onChange(String(value))}
    className="date-mask-input"
    lazy={false}
    blocks={{
      yyyy: {
        mask: IMask.MaskedRange,
        placeholderChar: "Г",
        from: 1970,
        to: new Date().getFullYear(),
      },
      MM: {
        mask: IMask.MaskedRange,
        placeholderChar: "М",
        from: 1,
        to: 12,
      },
      dd: {
        mask: IMask.MaskedRange,
        placeholderChar: "Д",
        from: 1,
        to: 31,
      },
    }}
  />
);

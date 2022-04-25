import IMask from "imask";
import { FC } from "react";
import { IMaskInput } from "react-imask";

import "./styles.css";

interface Props {
  value: string | number | readonly string[] | undefined;
  onChange: (value: string) => void;
}

export const MaskInput: FC<Props> = ({ value, onChange }) => {
  const momentFormat = "YYYY-MM-DD";
  return (
    <IMaskInput
      mask={momentFormat}
      value={value}
      onAccept={(value) => onChange(String(value))}
      className="mask-input"
      placeholder="Дата"
      blocks={{
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1970,
          to: new Date().getFullYear(),
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
        },
      }}
    />
  );
};

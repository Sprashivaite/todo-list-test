import { FC } from "react";
import IMask from "imask";
import { IMaskInput } from "react-imask";

import "./styles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const DateMaskInput: FC<Props> = ({ value, onChange }) => (
  <IMaskInput
    mask="YYYY-MM-DD"
    value={value}
    onAccept={(value) => onChange(String(value))}
    className="date-mask-input"
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
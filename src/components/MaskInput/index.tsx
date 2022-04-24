import IMask from "imask";
import { FC } from "react";
import { IMaskInput } from "react-imask";

export const MaskInput: FC = () => {
  return (
    <IMaskInput
      mask={Date}
      pattern="YYYY-MM-DD HH:mm"
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
        HH: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
        },
      }}
    />
  );
};

import { ChangeEventHandler, FC } from "react";

import "./styles.css";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: FC<Props> = ({ value, onChange }) => (
  <input
    className="search-input"
    type="search"
    placeholder="Поиск"
    value={value}
    onChange={onChange}
  />
);

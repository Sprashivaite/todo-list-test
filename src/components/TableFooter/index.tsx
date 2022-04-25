import { FC } from "react";

import "./styles.css";

interface Props {
  totalCompletedNum: number;
  totalNum: number;
}

export const TableFooter: FC<Props> = ({ totalCompletedNum, totalNum }) => {
  return (
    <tfoot className="table-footer">
      <tr className="table-footer__complete">
        <td>
          {totalCompletedNum} из {totalNum} задач выполнены
        </td>
      </tr>
    </tfoot>
  );
};

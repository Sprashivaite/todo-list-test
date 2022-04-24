import moment from 'moment';
import 'moment/locale/ru';

const formattedDate = {
  fromNow(date: Date): string {
    return moment(date).fromNow();
  },
  dateNow(): string {
    return moment().format();
  },
};
export default formattedDate;

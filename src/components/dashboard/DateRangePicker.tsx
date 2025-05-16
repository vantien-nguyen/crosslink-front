import DatePicker from 'react-datepicker';

import CalendarIcon from '../../assets/icons/calendar.svg';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  startDate: Date;
  endDate: Date;
  setDate: (dates: { startDate: Date; endDate: Date }) => void;
  className?: string;
}

const DateRangePicker = ({ startDate, endDate, setDate, className }: Props) => {
  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;

    setDate({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <div
      className={`${className} inline-flex items-center pl-4 pr-2 border border-gray-300 shadow
      text-sm rounded-md text-black focus:outline-none bg-white crosslink-datepicker
      text-medium hover:cursor-pointer`}
    >
      <img
        src={CalendarIcon}
        className="-ml-1 mr-2 h-5 w-5"
        aria-hidden="true"
      />
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="yyyy MMM d"
      />
    </div>
  );
};

export default DateRangePicker;

import React from "react";
import { format } from "date-fns";

const DateFormat = function (props) {
  const { date } = props;
  const [formatDate, setFormatDate] = React.useState("");

  React.useEffect(() => {
    if (date && date instanceof Date)
      setFormatDate(format(date, "dd-MM-yyyy hh:mm:ss"));
  }, []);

  return <span>{formatDate}</span>;
};

export default DateFormat;

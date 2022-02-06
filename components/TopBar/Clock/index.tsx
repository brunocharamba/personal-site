import React, { useEffect, useState } from "react";

import moment from "moment";

export interface IDate {
  date: string;
  time: string;
}

const INTERVAL = 1000 * 60; // 1 min

const Clock: React.FC = () => {
  const [date, setDate] = useState<IDate>();

  const handleTimeUpdate = () => {
    const now = moment();
    const nowDate = now.format("dddd, MMMM Do YYYY");
    const nowTime = now.format("h:mm A");
    setDate({ date: nowDate, time: nowTime });
  };

  useEffect(() => {
    handleTimeUpdate();
    setInterval(handleTimeUpdate, INTERVAL);
  }, []);

  return (
    <>
      <div>{date?.date}</div>
      <div className="pl-6">{date?.time}</div>
    </>
  );
};

export default Clock;

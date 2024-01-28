import dayjs from "dayjs";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import classNames from "classnames/bind";
import style from "./Timer.module.scss";

const cx = classNames.bind(style);

interface TimerProps {
  setAuthResultMsg: (authResultMsg: string) => void;
  isAuthorized: boolean;
  setIsTimeOut: (isTimeOut: boolean) => void;
}

const Timer = forwardRef(({ setAuthResultMsg, isAuthorized, setIsTimeOut }: TimerProps, ref) => {
  const [time, setTime] = useState<any>(181);
  const [deadline, setDeadLine] = useState(dayjs().add(181, "second"));
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const getTime = (dueDate: any) => {
    const timeDiff = dueDate.diff(dayjs());
    if (timeDiff >= 0) {
      setTime(() => Math.floor(timeDiff / 1000));
      setMinutes(() => Math.floor((timeDiff / 1000 / 60) % 60));
      setSeconds(() => Math.floor((timeDiff / 1000) % 60));
    }
  };

  useImperativeHandle(ref, () => ({
    resetTimer: () => {
      setTime(181);
      setDeadLine(dayjs().add(181, "second"));
      setMinutes(3);
      setSeconds(0);
    },
  }));

  useEffect(() => {
    if (!isAuthorized && time === 0) {
      setIsTimeOut(true);
      setAuthResultMsg("인증시간이 만료되었습니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (time >= 0) {
      const interval = setInterval(() => getTime(deadline), 1000);
      return () => clearInterval(interval);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return (
    <span className={cx("timer")}>
      {`0${minutes}`} : {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
});

export { Timer };

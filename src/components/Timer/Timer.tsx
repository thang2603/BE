const Timer = ({ remainingTime }: any) => {
  if (remainingTime === 0) {
    return <div className="text-6xl font-bold text-center text-red-700">0</div>;
  }

  return (
    <div className="timer">
      <div className="text"></div>
      <div className="text-6xl font-bold text-center text-red-700">
        {remainingTime}
      </div>
      <div className="text"></div>
    </div>
  );
};

export default Timer;

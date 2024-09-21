import { Button } from "antd";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const LuckyWheel = () => {
  const data = [
    { option: "Giải Nhất" },
    { option: "Giải Nhì" },
    { option: "Giải Ba" },
    { option: "Giải Tư" },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  const [result, setResult] = useState<string | null>(null);
  const handleStopSpinning = () => {
    setMustSpin(false);
    setResult(data[prizeNumber].option); // Lấy phần thưởng dựa trên prizeNumber
  };
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStopSpinning}
        />
        <Button
          type="primary"
          danger
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          Quay
        </Button>
      </div>
    </div>
  );
};

export default LuckyWheel;

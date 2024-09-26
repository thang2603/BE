interface DataTypeProps {
  index: number;
  name: string;
  ans: string;
  color: string;
}

const PointItem = ({ index, ans, name, color }: DataTypeProps) => {
  const handleCheckEven = (index: number) => {
    if (index % 2 === 1) {
      return (
        <div className="absolute bg-cyan-600 text-white -top-4 right-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
          <p>{name}</p>
        </div>
      );
    }
    return (
      <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
        <p>{name}</p>
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        className="border-2 border-solid border-slate-200  baseColor h-1/2 px-4 py-6"
        style={{ background: color }}
      >
        <p className="text-white font-semibold text-2xl h-8">{ans}</p>
      </div>
      {handleCheckEven(index)}
    </div>
  );
};

export default PointItem;

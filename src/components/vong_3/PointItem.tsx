interface DataTypeProps {
  index: number;
  name: string;
  ans: string;
  time?: number | null;
  isCorrect: boolean;
}

const PointItem = ({
  index,
  ans,
  name,
  time,
  isCorrect = false,
}: DataTypeProps) => {
  return (
    <div className="relative" key={name}>
      <div
        className="border-2 border-solid border-slate-200  baseColor h-1/2 px-4 py-6"
        style={{
          background: isCorrect
            ? "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(232,35,35,1) 0%, rgba(252,176,69,1) 100%)"
            : "",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-2xl h-8">{ans}</p>
          <p className="text-white font-semibold text-2xl h-8">{time || 0}</p>
        </div>
      </div>
      <div className="absolute bg-cyan-600 text-white -top-4 left-2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default PointItem;

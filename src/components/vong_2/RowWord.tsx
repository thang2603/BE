import { QuestionType2 } from "../../types/Login";

interface DataTypeProps {
  listQuestion: QuestionType2[];
}
const RowWord = ({ listQuestion }: DataTypeProps) => {
  const handleString = (value: string) => {
    const newValue = value.split("").filter((item) => item !== " ");
    return newValue;
  };
  const handleShowWord = (isShow: number) => {
    if (!!isShow) {
      return "opacity-1";
    }
    return "opacity-0";
  };
  return (
    <div className="px-5 border-2 border-solid border-slate-200 bg-sky-800 relative py-10 ">
      <p className="absolute bg-cyan-600 text-white -top-4 left-1/2 -translate-x-1/2 text-xl px-1 py-1 border-2 border-solid border-slate-200 ">
        Chướng ngại vật có 7 chữ
      </p>
      <div className="flex flex-col justify-between h-full">
        {listQuestion.map(
          (word, index) =>
            word?.id < 5 && (
              <div key={word.id} className="flex gap-3 justify-between">
                <div className="flex gap-1">
                  {handleString(word.ans).map((item) => (
                    <p
                      key={`${item}_${index}`}
                      className=" w-10 h-10 rounded-full border-2 border-solid border-slate-200 bg-sky-800 flex items-center justify-center"
                    >
                      <span
                        className={`text-white uppercase font-semibold ${handleShowWord(
                          word.isActive
                        )} `}
                      >
                        {item}
                      </span>
                    </p>
                  ))}
                </div>
                <div className="bg-slate-700 px-3 py-1 rounded-lg">
                  <p className="font-semibold text-xl text-white">
                    {index + 1}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RowWord;

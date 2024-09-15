import { Image } from "antd";
import imgtest from "../../assets/test.png";
import { QuestionType2 } from "../../types/Login";

interface DataTypeProps {
  listQuestion: QuestionType2[];
}
const ImageMagic = ({ listQuestion }: DataTypeProps) => {
  return (
    <div className="relative" style={{ width: 500, height: 300 }}>
      <Image src={imgtest} width="100%" height="100%" />
      {!listQuestion[0]?.isActive && (
        <div className="absolute w-1/2 bg-sky-800 h-1/2 border-2 border-solid border-slate-200 top-0 left-0">
          <div className="flex justify-center">
            <p className="font-semibold text-white text-2xl text-center">1</p>
          </div>
        </div>
      )}
      {!listQuestion[1]?.isActive && (
        <div className="absolute w-1/2 bg-sky-800 h-1/2 border-2 border-solid border-slate-200 top-0 right-0">
          <div className="flex justify-center">
            <p className="font-semibold text-white text-2xl text-center">2</p>
          </div>
        </div>
      )}
      {!listQuestion[2]?.isActive && (
        <div className="absolute w-1/2 bg-sky-800 h-1/2 border-2 border-solid border-slate-200 bottom-0 left-0">
          <div className="flex justify-center items-end h-full align-baseline">
            <p className="font-semibold text-white text-2xl text-center">3</p>
          </div>
        </div>
      )}
      {!listQuestion[3]?.isActive && (
        <div className="absolute w-1/2 bg-sky-800 h-1/2 border-2 border-solid border-slate-200 bottom-0 right-0">
          <div className="flex justify-center items-end h-full align-baseline">
            <p className="font-semibold text-white text-2xl text-center">4</p>
          </div>
        </div>
      )}
      <div className="absolute w-1/2 bg-sky-800 h-1/2 border-2 border-solid border-slate-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default ImageMagic;

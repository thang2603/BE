import { Timeline } from "antd";

interface DataTypeProps {
  listOption: number[];
}
const PackQuestion = ({ listOption }: DataTypeProps) => {
  return (
    <div>
      <Timeline
        items={[...listOption].map((item) => ({
          children: (
            <div className="px-8 py-3 flex justify-center items-center baseColor">
              <p className="text-4xl text-white">{item}</p>
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default PackQuestion;

import { Timeline } from "antd";
import PointItem from "./PointItem";
import "./ShowPoint.css";
import { AnserDetailType } from "../../types/Login";
interface DataTypeProps {
  listAnswer: AnserDetailType[];
}

const ShowPoint = ({ listAnswer }: DataTypeProps) => {
  return (
    <div className="slide-up">
      <div className="w-full flex items-center justify-center h-screen">
        <div className="w-3/5 flex items-center justify-center h-screen">
          <Timeline
            mode="alternate"
            className="flex-1"
            items={[
              {
                children: (
                  <PointItem
                    index={0}
                    name={listAnswer[0].fullName}
                    ans={listAnswer[0].ans}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={1}
                    name={listAnswer[1].fullName}
                    ans={listAnswer[1].ans}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={2}
                    name={listAnswer[2].fullName}
                    ans={listAnswer[2].ans}
                  />
                ),
              },
              {
                children: (
                  <PointItem
                    index={3}
                    name={listAnswer[3].fullName}
                    ans={listAnswer[3].ans}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowPoint;

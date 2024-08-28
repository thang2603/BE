import { Timeline } from "antd";
import PointItem from "./PointItem";

import { AnserDetailType } from "../../types/Login";
interface DataTypeProps {
  listAnswer: AnserDetailType[];
}

const ShowPoint = ({ listAnswer }: DataTypeProps) => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-1/4 flex items-center justify-center h-screen">
        <Timeline
          mode="left"
          className="flex-1"
          items={[
            {
              children: (
                <PointItem
                  index={0}
                  name={listAnswer[0].fullName}
                  ans={listAnswer[0].ans}
                  time={listAnswer[0].updateAt}
                />
              ),
            },
            {
              children: (
                <PointItem
                  index={1}
                  name={listAnswer[1].fullName}
                  ans={listAnswer[1].ans}
                  time={listAnswer[1].updateAt}
                />
              ),
            },
            {
              children: (
                <PointItem
                  index={2}
                  name={listAnswer[2].fullName}
                  ans={listAnswer[2].ans}
                  time={listAnswer[2].updateAt}
                />
              ),
            },
            {
              children: (
                <PointItem
                  index={3}
                  name={listAnswer[3].fullName}
                  ans={listAnswer[3].ans}
                  time={listAnswer[3].updateAt}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ShowPoint;

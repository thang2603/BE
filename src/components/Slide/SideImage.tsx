import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Đường dẫn đúng cho file CSS
import "swiper/css/pagination"; // CSS cho pagination nếu cần
import "swiper/css/navigation"; // CSS cho navigation nếu cần
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Image } from "antd";
import { LinkImageType } from "../../types/Login";

interface DataTypeProps {
  resetTime: any;
  listImage: LinkImageType[];
}
const ImageCarousel = ({ listImage, resetTime }: DataTypeProps) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]} // Cấu hình các module
      spaceBetween={30} // Khoảng cách giữa các slide
      centeredSlides={true} // Slide nằm ở giữa
      loop={false} // Không lặp lại các slide
      autoplay={{
        delay: (resetTime.duration * 1000) / listImage.length,
        disableOnInteraction: false,
        stopOnLastSlide: true,
      }}
    >
      {listImage.map((item) => (
        <SwiperSlide key={item.id}>
          <Image
            src={`/vong3/${item.link}`}
            width={900}
            height={600}
            preview={false}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;

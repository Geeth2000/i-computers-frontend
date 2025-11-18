import { act, useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col object-contain items-center justify-center gap-4">
      <img
        src={images[activeIndex]}
        className="w-[80%] h-[500px] object-contain"
      />
      <div className="w-full h-[100px] flex flex-row items-center justify-center gap-4">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              className={
                "w-[80px] h-[80px] object-cover rounded-lg cursor-pointer" +
                (activeIndex == index ? " border-2 border-accent" : "")
              }
              onClick={() => {
                setActiveIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

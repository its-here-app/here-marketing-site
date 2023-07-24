import SVG from "react-inlinesvg";

export const Spot = ({ title, description, type, image }) => {
  return (
    <div className="relative flex w-full flex-row min-h-[80px]">
      <div
        className="w-[20%] h-full bg-cover bg-center overflow-hidden aspect-[1/1] rounded-[0.5rem] md:rounded-[0.625rem]"
        style={{
          backgroundImage: `url(${image}), url('http://placehold.it/300x300')`,
        }}
      >
        {/* <img src={image} className="w-full"/> */}
      </div>
      <div className="grid grid-cols-4 w-full">
        {/* info left */}
        <div className="h-auto col-span-3 pl-[.69rem] flex flex-col gap-[.5rem] ">
          <div className="font-[Radio] text-[1.5rem] xl:text-[1.75rem] tracking-[-0.04em] leading-[100%]">
            {title}
          </div>
          <div className="w-full text-[1rem] max-h-[2.125rem] overflow-hidden text-ellipsis md:flex text-[#757575] tracking-[-0.02em] leading-[100%]">
            {description}
          </div>
          <div className="w-max px-[8px] py-[2px] rounded-[8px] bg-[#DFDFDF] tracking-[-0.02em] leading-[100%]">
            {type && type}
          </div>
        </div>
        {/* icon right */}
        <div className="flex items-center justify-self-end">
          <div className="rounded-full bg-black w-[40px] h-[40px] flex items-center justify-center">
            <SVG
              src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map view.svg`}
              width={30}
              height="auto"
              title="Share"
              className="fill-none stroke-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

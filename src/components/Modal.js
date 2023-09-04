import MailChimpForm from "../components/EmailHandler";
import Image from "next/image";
import stickerCityDate from "/public/stickers/sticker-city-date.svg";
import stickerLocalRecs from "/public/stickers/sticker-local-recs.svg";

export const ModalForm = () => {
  return (
    <div className="w-full fade-in">
      <div className="flex flex-col gap-[1.5rem] w-full tracking-[-0.03em] pb-10  text-white ">
        <div className="w-full h-auto flex flex-row-reverse gap-[2.5rem]">
          <div className="relative hidden md:flex h-[200px] w-full md:w-[30%] translate-x-[-50px]">
          <Image
              alt="none"
              className="absolute left-[30%] bottom-[45%] w-[220px]"
              src={stickerLocalRecs}
            />
            <Image
              alt="none"
              className="absolute left-[10%] bottom-[10%] w-[200px]"
              src={stickerCityDate}
            />
          </div>
          <div className="w-full flex flex-col gap-[2.5rem] md:w-[70%]">
            <div className="flex flex-col font-[Radio] text-[48px] md:text-[64px] leading-[60px]">
              <span className="whitespace-nowrap">We're excited</span>
              <span className="whitespace-nowrap">that you're excited</span>
            </div>
            <div className="font-[Golos] text-[20px] leading-normal ">
              Get notified when we officially launch and be the first to know when it comes to
              exclusive access or updates!
            </div>
          </div>
        </div>
        <MailChimpForm  />
      </div>
    </div>
  );
};

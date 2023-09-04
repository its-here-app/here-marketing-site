import MailChimpForm from "../components/EmailHandler";

export const ModalForm = () => {
  return (
    <div className="w-full fade-in">
      <div className="flex flex-col gap-[2.5rem] w-full tracking-[-0.03em]  text-white ">
        <div className="w-full h-auto flex flex-row-reverse gap-[2.5rem]">
          <div className="relative h-[200px] w-full md:w-[30%] translate-x-[-50px]">
            {/* stickers can probably live here */}
          </div>
          <div className="w-full flex flex-col gap-[2.5rem] md:w-[70%] ">
            <div className="flex flex-col font-[Radio] text-[48px] md:text-[64px] leading-[60px]">
              <span className="whitespace-nowrap">We're excited</span>
              <span className="whitespace-nowrap">that you're excited</span>
            </div>
            <div className="font-[Golos] text-[20px] leading-normal ">
              Get notified when we officially launch and be the first to know when it comes to
              exclusive access or updates!
            </div>
            <MailChimpForm isModal={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

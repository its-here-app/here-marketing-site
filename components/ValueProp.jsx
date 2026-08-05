import { forwardRef } from "react";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/motion/SlideIn";
import { useModal } from "@/context/ModalContext";
import { trackEvent } from "@/utils/analytics";

const ValueProp = forwardRef(
  (
    {
      children = "",
      className = "",
      header = "Lorem ipsum dolor sit amet",
      subhead = "Lorem ipsum dolor sit amet",
      CTA = "Start for free",
      eventName = "",
      headingRef = null,
      maxHeight = "48rem",
    },
    ref
  ) => {
    const { openModal } = useModal();

    const handleCTAClick = () => {
      trackEvent(eventName);
      openModal(eventName);
    };

    return (
      <section
        ref={ref}
        className="relative container-sm min-h-auto md:h-screen md:max-h-(--value-prop-max-h) my-20 md:my-0 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0"
        style={{ "--value-prop-max-h": maxHeight }}
      >
        <div
          className={`${className} text-center max-w-[24rem] md:max-w-auto md:text-left md:max-w-[50%]`}
        >
          <SlideIn>
            <h2 ref={headingRef} className="text-radio-2 mb-4">{header}</h2>
            <p className="mb-6 md:w-[80%]">{subhead}</p>
            <Button
              variant="secondary"
              className="hidden md:block"
              onClick={handleCTAClick}
            >
              {CTA}
            </Button>
          </SlideIn>
        </div>
        {children}
        <SlideIn>
          <Button
            variant="secondary"
            className="md:hidden"
            onClick={handleCTAClick}
          >
            {CTA}
          </Button>
        </SlideIn>
      </section>
    );
  }
);

ValueProp.displayName = "ValueProp";

export default ValueProp;

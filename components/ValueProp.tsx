import { forwardRef } from "react";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/motion/SlideIn";

const ValueProp = forwardRef(
  (
    {
      children = "",
      className = "",
      header = "Lorem ipsum dolor sit amet",
      subhead = "Lorem ipsum dolor sit amet",
      CTA = "Start for free",
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className="relative container-sm min-h-auto md:h-screen md:max-h-[64rem] my-20 md:my-0 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0"
      >
        <div
          className={`${className} text-center max-w-[24rem] md:max-w-auto md:text-left md:max-w-[50%]`}
        >
          <SlideIn>
            <h2 className="text-radio-2 mb-4">{header}</h2>
            <p className="mb-6 md:w-[80%]">{subhead}</p>
            <Button variant="secondary" className="hidden md:block">
              {CTA}
            </Button>
          </SlideIn>
        </div>
        {children}
        <SlideIn>
          <Button variant="secondary" className="md:hidden">
            {CTA}
          </Button>
        </SlideIn>
      </section>
    );
  }
);

ValueProp.displayName = "ValueProp";

export default ValueProp;

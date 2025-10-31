import Button from "@/components/ui/Button";

const ValuePropSection = ({
  children = "",
  className = "",
  header = "Lorem ipsum dolor sit amet",
  subhead = "Lorem ipsum dolor sit amet",
  CTA = "Start for free",
}) => {
  return (
    <section className="relative container-sm relative min-h-auto md:min-h-screen my-20 md:my-0 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0">
      <div className={`${className} text-center md:text-left md:max-w-[50%]`}>
        <h2 className="text-radio-2 mb-4">{header}</h2>
        <p className="mb-6 md:w-[80%]">{subhead}</p>
        <Button variant="secondary" className="hidden md:block">
          {CTA}
        </Button>
      </div>
      {children}
      <Button variant="secondary" className="md:hidden">
        {CTA}
      </Button>
    </section>
  );
};

export default ValuePropSection;

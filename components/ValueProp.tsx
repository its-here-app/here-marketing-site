import Button from "@/components/ui/Button";


const ValueProp = ({
  children = "",
  className = "",
  header = "Lorem ipsum dolor sit amet",
  subhead = "Lorem ipsum dolor sit amet",
  CTA = "Start for free"
}) => {
 
  return (
    <section className="container-sm min-h-auto md:min-h-screen my-24 flex flex-col md:flex-row items-center md:justify-between gap-8">
        <div className={`${className} text-center md:text-left md:max-w-[50%]`}>
          <h2 className="text-display-4 mb-4">{header}</h2>
          <p className="mb-6 md:w-[80%]">{subhead}</p>
          <Button variant="secondary" className="hidden md:block">{CTA}</Button>
        </div>
        {children}
        <Button variant="secondary" className="md:hidden">{CTA}</Button>
    </section>
  );
};

export default ValueProp;

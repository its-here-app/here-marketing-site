import Button from "@/components/ui/Button";


const ValueProp = ({
  className = "",
  header = "Lorem ipsum dolor sit amet",
  subhead = "Lorem ipsum dolor sit amet",
  CTA = "Start for free"
}) => {
 
  return (
    <div className={`${className} md:max-w-[50%]`}>
        <h2 className="text-display-4 mb-4">{header}</h2>
        <p className="mb-6">{subhead}</p>
            <Button variant="secondary">
            {CTA}
        </Button>
    </div>
  );
};

export default ValueProp;

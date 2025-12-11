import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";

const Navbar = ({ className = "", showCTA = true }) => {
  return (
    <div className="container-lg flex justify-between items-center my-8">
      <Logo button={true} />
      <div>
        {showCTA && (
          <Button variant="primary" className="sm:block hidden">
            Start for free
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

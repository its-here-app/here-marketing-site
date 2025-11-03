import Navbar from "@/components/Navbar";

const Error = ({ className = "", message = "404 - Page not found" }) => {
  return (
    <div>
      <Navbar />
      <div className="container-lg py-8">
        <h1 className="text-radio-2 mb-4">{message}</h1>
        <p>
          <a href="/">Return home</a>
        </p>
      </div>
    </div>
  );
};

export default Error;

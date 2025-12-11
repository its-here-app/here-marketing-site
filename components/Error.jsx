"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="container-lg py-4">
        <div className="flex justify-center items-center flex-col min-h-[50vh]">
          <div className="text-center max-w-[30rem] text-balance">
            <h1 className="text-radio-1 mb-4">404</h1>
            <h2 className="text-radio-4 mb-4">
              The page you are looking for can't be found.
            </h2>

            <p>
              <a href="/">Return home</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;

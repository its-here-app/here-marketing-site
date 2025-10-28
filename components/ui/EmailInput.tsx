const EmailInput = ({
  color = "black", // black or green
  className = "",
  children = "",
}) => {
  return (
    <form
      className={`${className} relative w-[50rem] max-w-full sm:max-w-[68%] transition-all duration-400`}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        className="placeholder-neon-50p text-body-lg border border-neon rounded-2xl md:rounded-3xl py-4 px-4 md:py-7 md:px-8 w-full"
        id="email"
        type="email"
        name="email"
        placeholder="Enter email for exclusive access"
        required
      ></input>
      <button
        type="submit"
        aria-label="Submit"
        value=""
        className="bg-neon rounded-full w-[2.4rem] h-[2.4rem] md:w-[3.375rem] md:h-[3.375rem] bg-[url('/images/icons/icon-arrow-green.svg')] bg-cover bg-center absolute right-[.6rem] md:right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer transition duration-200 hover:scale-112"
      ></button>
    </form>
  );
};

export default EmailInput;

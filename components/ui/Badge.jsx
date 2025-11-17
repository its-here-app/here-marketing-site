const Badge = ({ className = "", children = "" }) => {
  return (
    children && (
      <div
        className={`${className} bg-gray-100 rounded-md text-gray-800 py-[2px] px-[6px] text-body-xs inline-block`}
      >
        {children}
      </div>
    )
  );
};

export default Badge;

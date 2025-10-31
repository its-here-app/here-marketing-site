const PlaylistCoverOverlay = ({ className = "", radial = false }) => {
  return (
    <div className={`${className}`}>
      {/* Linear gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.0) 100%)",
          mixBlendMode: "soft-light",
        }}
      ></div>
      {/* Radial gradient */}
      {radial && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.0), rgba(0,0,0,0.6))",
            mixBlendMode: "soft-light",
          }}
        ></div>
      )}
    </div>
  );
};

export default PlaylistCoverOverlay;

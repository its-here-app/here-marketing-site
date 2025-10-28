import SpotListing from "@/components/SpotListing";

const SpotList = ({ className = "", index = 0, spotsJSON = [] }) => {
  return (
    <div>
      {spotsJSON.map((spot, index) => (
        <SpotListing key={index} spot={spot} index={index} />
      ))}
    </div>
  );
};

export default SpotList;

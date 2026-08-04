import SpotListing from "@/components/SpotListing";

const SpotList = ({ className = "", index = 0, spotsJSON = [] }) => {
  console.log(spotsJSON);
  return (
    <div className="flex flex-col gap-4">
      {spotsJSON.map((spot, index) => (
        <SpotListing
          key={index}
          imgUrl={spot.imgUrl}
          name={spot.name}
          description={spot.description}
          type={spot.type}
          ratings={spot.ratings}
          index={index}
          interactive
        />
      ))}
    </div>
  );
};

export default SpotList;

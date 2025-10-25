import Image from "next/image";
import Button from "@/components/ui/Button";
import PlaylistCarousel from "@/components/PlaylistCarousel";



export default function Home() {
  return (
    <div>
      <div className="container pb-8">
        <h1 className="text-display-4 justify-between hidden md:flex">
          <div>For the spots<br></br>you love </div><div><br></br> & the places<br></br>you’ll go</div>
        </h1>
        <h1 className="text-display-4 md:hidden mb-4">
          For the spots you love & the places you’ll go
        </h1>
        <h2 className="md:[margin-top:clamp(-4rem,-5vw,-2.5rem)]">
          Discover and share favorite spots<br></br>through city playlists*
        </h2>
        <Button variant="primary" className="sm:hidden mt-6">
            Start for free
        </Button>
      </div> 
      <PlaylistCarousel/>
    </div>
  );
}

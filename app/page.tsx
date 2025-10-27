import Button from "@/components/ui/Button";
import ValueProp from "@/components/ValueProp";

import PlaylistCarousel from "@/components/PlaylistCarousel";


export default function Home() {
  return (
    <div>
      <div className="container pb-8">
        <h1 className="text-display-5 justify-between hidden md:flex">
          <div>For the spots<br></br>you love </div><div><br></br> & the places<br></br>you’ll go</div>
        </h1>
        <h1 className="text-display-5 md:hidden mb-4">
          For the spots you love & the places you’ll go
        </h1>
        <h2 className="md:[margin-top:clamp(-3rem,-4vw,-3rem)]">
          Discover and share favorite spots<br></br>through city playlists*
        </h2>
        <Button variant="primary" className="sm:hidden mt-6">
            Start for free
        </Button>
      </div> 
      <PlaylistCarousel/>
      <div>
        <div className="container-sm min-h-screen flex items-center text-balance">
            <ValueProp header="Discover new spots through your tastes" subhead="Find new spots you like based on your favorites, who you follow, and places you’ve been" CTA="Explore spots"/>
        </div>
      </div>
    </div>
  );
}

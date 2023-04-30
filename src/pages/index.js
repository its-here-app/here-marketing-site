import Image from 'next/image'
import sticker1 from '/public/stickers/1.svg';
import sticker2 from '/public/stickers/2.svg';
import sticker3 from '/public/stickers/3.svg';
import sticker4 from '/public/stickers/4.svg';
import { Inter } from 'next/font/google'
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { scroll } = useLocomotiveScroll();
  
  return (
    
  <div data-scroll-section className="flex w-full h-[800vh] bg-black items-center justify-center">
    <div className="relative w-[50vw] max-w-[900px] aspect-square ">

      <div data-scroll data-scroll-direction="vertical" data-scroll-speed="6" id="bg" className="absolute w-[30%] h-[30%] top-[0px] left-[45%]" >
        <Image fill src={sticker3}/>
      </div>
      <div className="absolute w-[50%] h-[50%] top-[25%] left-[45%]" >
        <Image fill className="spin" src={sticker4}/>
      </div>
      <div className="absolute w-[60%] h-[60%] bottom-[0px] left-[0px]" >
        <Image fill src={sticker1}/>
      </div>
      
      <div className="absolute w-[50%] h-[50%] top-[10%] left-[0px]" >
        <Image fill src={sticker2}/>
      </div>
    
    </div>

  </div>
  )
}

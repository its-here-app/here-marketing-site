import Image from 'next/image'
import sticker1 from '/public/stickers/1.svg';
import sticker2 from '/public/stickers/2.svg';
import sticker3 from '/public/stickers/3.svg';
import sticker4 from '/public/stickers/4.svg';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  
  return (
  <div  className="flex w-full h-[100vh] bg-black items-center justify-center">
    <div class="relative w-[50vw] aspect-square ">

      <div id="bg" class="absolute w-[30%] h-[30%] top-[0px] left-[45%]" >
        <Image fill src={sticker3}/>
      </div>
      <div class="absolute w-[50%] h-[50%] top-[25%] left-[45%]" >
        <Image fill class="spin" src={sticker4}/>
      </div>
      <div class="absolute w-[60%] h-[60%] bottom-[0px] left-[0px]" >
        <Image fill src={sticker1}/>
      </div>
      
      <div class="absolute w-[50%] h-[50%] top-[10%] left-[0px]" >
        <Image fill src={sticker2}/>
      </div>
    
    </div>

  </div>
  )
}

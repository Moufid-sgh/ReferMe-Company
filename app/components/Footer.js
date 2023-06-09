import Image from 'next/image';
import tclogo from '../../public/images/tclogo.png'
import { AiOutlineCopyright } from 'react-icons/ai'

function Footer() {
  return (
    <div className='flex items-center justify-center space-x-1 text-xs'>

      <div className="whitespace-nowrap	text-black-500 flex items-center justify-center">
        <AiOutlineCopyright size={12} />
        <h3>{new Date().getFullYear()} - ReferMe</h3>
      </div>

      <div className='flex items-center'>
        <h3 className='whitespace-nowrap text-black-500 mr-1.5'>Powred by</h3>
        <Image
          src={tclogo}
          height="25"
          alt="logo"
        />

        <h3 className='whitespace-nowrap text-black-500 ml-0.5'>TargetCatcher Inc.</h3>
      </div>

    </div>

  )
}

export default Footer
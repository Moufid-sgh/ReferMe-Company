'use client';

import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className='border border-red rounded-md p-6 flex flex-col items-center justify-center'>
      <h2 className="font-ubuntu text-3xl mb-4">Something went wrong!</h2>
      <p>Please try again or contact support if the problem persists.</p>

      <div className="flex items-center space-x-10 mt-10">
        <div  onClick={() => router.push('/')} className='flex items-center space-x-1 group cursor-pointer'>
          <BiArrowBack className='group-hover:-translate-x-1 duration-300' />
          <a className='flex justify-end'>Go back home</a>
        </div>

        <button onClick={() => reset()}
          className="green-btn">
          Try again
        </button>
      </div>
    </div>
    </div>
  );
}
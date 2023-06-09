'use client'

import PuffLoader from "react-spinners/PuffLoader";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <PuffLoader color={"#0F70B7"} size={60} />     
    </div>
  )
}

export default LoadingPage
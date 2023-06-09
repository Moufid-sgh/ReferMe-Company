// 'use client'

import { AiOutlineDelete } from 'react-icons/ai';

function OfficeLocations({ el, removeOffice }) {


  return (
    <div className='flex items-center justify-between text-sm border-t border-gray-400 py-3 px-2'>

      <p className='w-48'>
        {el.officeName}
      </p>

      <p className='w-48'>
        {el.officeContact ? el.officeContact : '/'}
      </p>

      <div className='w-48'>
        <p>{el.officeCountry}, {el.officeState.length > 0 && ` ${el.officeState},`}</p>
        <p>{el.officeCity}{el.officeStreet && `, ${el.officeStreet}`}</p>

      </div>

      <div className='w-48 ml-3'>
        {el.officeLanguage.length > 0 ?

          <>{el.officeLanguage.map((el, index) => {
            return <p key={index}>{el}</p>
          })}
          </>

          :
          '/'
        }
      </div>


      <AiOutlineDelete onClick={removeOffice}
        className='text-3xl sm:text-2xl text-blue hover:text-red cursor-pointer duration-300'
      />

    </div>
  )
}

export default OfficeLocations
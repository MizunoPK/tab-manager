import React from 'react'
import { SortOption } from '../../utils/SortOptions'
import { Button } from '@mui/material'

interface Props {
    type : SortOption,
    callback : (type : SortOption) => void
}

function SortButton({type, callback} : Props) {
  return (
    <div className='my-2'>
        <Button variant='contained'>{type as string}</Button>
    </div>
  )
}

export default SortButton
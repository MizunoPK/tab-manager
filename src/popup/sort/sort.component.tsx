import React, { useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { SortOption } from '../../utils/SortOptions';
import SortButton from './SortButton.component';

enum SORT_DIRECTION {
    UP, DOWN
}

function Sort() {
    const [sortDirection, setSortDirection] = useState(SORT_DIRECTION.UP)

    // Change the direction of the sort
    const changeSortDir = () => {
        if (sortDirection === SORT_DIRECTION.UP)
            setSortDirection(SORT_DIRECTION.DOWN)
        else
            setSortDirection(SORT_DIRECTION.UP)
    }

    // Sort button was clicked
    const triggerSort = (type: SortOption) => {

    }

  return (
    <div className='flex flex-col justify-center items-center'>            
        <div className='w-fit relative'>
            <div className='absolute -left-[3em] mt-[2px]'>
                <IconButton aria-label={`${sortDirection === SORT_DIRECTION.UP ? 'sort upward' : 'sort downward'}`}
                    onClick={changeSortDir}
                    color='primary'>
                    {sortDirection === SORT_DIRECTION.UP 
                        ? <ArrowUpwardIcon />
                        : <ArrowDownwardIcon />
                    }
                </IconButton>
            </div>
            <div className='font-bold my-3'>
                Sort By:
            </div>
        </div>

        <SortButton type={SortOption.NAME} callback={triggerSort} />
        <SortButton type={SortOption.URL} callback={triggerSort} />
        <SortButton type={SortOption.LAST_ACCESSED} callback={triggerSort} />
        <SortButton type={SortOption.CREATION_DATE} callback={triggerSort} />
    </div>
  )
}

export default Sort
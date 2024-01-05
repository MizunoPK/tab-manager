import { FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { SortOption } from '../../utils/enums/SortOptions'
import { SortDirection } from '../../utils/enums/SortDirection'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


function Search() {
  const [searchText, setSearchText] = useState("")
  const [sortType, setSortType] = useState(SortOption.URL)
  const [sortDirection, setSortDirection] = useState(SortDirection.UP)

  // Change the sort option
  const changeSortOption = (e : SelectChangeEvent<SortOption>) => {
    setSortType(e.target.value as SortOption)
  }

  // change the sort direction
  const changeSortDir = () => {
    if (sortDirection === SortDirection.UP)
        setSortDirection(SortDirection.DOWN)
    else
        setSortDirection(SortDirection.UP)
  }

  return (
    <div>
      {/* Search Bar */}
      <div className='p-2'>
        {/* Options */}
        <div className='mb-3 text-right'>
          <IconButton aria-label={`${sortDirection === SortDirection.UP ? 'sort upward' : 'sort downward'}`}
              onClick={changeSortDir}
              color='primary'>
              {sortDirection === SortDirection.UP 
                  ? <ArrowUpwardIcon />
                  : <ArrowDownwardIcon />
              }
          </IconButton>

          <FormControl sx={{width: '5em'}} size='small' color='secondary'>
            <InputLabel id="search-sort-select-label">Sort</InputLabel>
            <Select
              labelId="search-sort-select-label"
              id="sort-select"
              value={sortType}
              label="Sort"
              onChange={changeSortOption}
              sx={{textAlign: 'left'}}
            >
              <MenuItem value={SortOption.URL}>URL</MenuItem>
              <MenuItem value={SortOption.NAME}>Name</MenuItem>
              <MenuItem value={SortOption.LAST_ACCESSED}>Last Accessed</MenuItem>
              <MenuItem value={SortOption.CREATION_TIME}>Creation Time</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Input */}
        <TextField 
          label="Search" 
          variant='outlined' 
          value={searchText} 
          onChange={(e) => setSearchText(e.currentTarget.value)}
          color='secondary'
          sx={{width: '100%'}}
        />
      </div>
      
      {/* Results */}
      <div>

      </div>
    </div>
  )
}

export default Search
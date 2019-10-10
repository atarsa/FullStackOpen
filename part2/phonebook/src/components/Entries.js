import React from 'react';
import Entry from './Entry'

const Entries = ({entriesToShow}) => 

  entriesToShow.map(entry => 
  <Entry 
    key={entry.id}
    entry={entry}
  />
)

export default Entries
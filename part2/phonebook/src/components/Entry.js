import React from 'react';

const Entry = ( {entry, deleteEntry} ) =>  (
    <li>
        {entry.name} {entry.number}
        <button onClick={deleteEntry}>Delete</button>
    
    </li>
)


export default Entry
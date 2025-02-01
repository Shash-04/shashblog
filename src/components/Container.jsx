import React from 'react'

function Container({ children }) {
    return <div className='w-full max-w-7xl mx-auto px-4 text-xl bg-cyan-900 rounded-md p-2'>
        {children}</div>;
  
}

export default Container

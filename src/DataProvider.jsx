import React from 'react'
import { Children } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const DataContext = createContext(null)
const DataProvider = () => {

    const [account,setAccount] = useState({name: '', email: ''})
  return (
    <div>
      <DataContext.Provider value={{
        account,
        setAccount
      }}>
        {Children}
      </DataContext.Provider>
    </div>
  )
}

export default DataProvider

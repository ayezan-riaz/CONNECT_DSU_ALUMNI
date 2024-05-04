import React from 'react'

interface OptionProps{
    val :string
}

const Option : React.FC<OptionProps>=({val}) => {
  return (
    <option value={val}>{val}</option>
  )
}

export default Option
import { Switch } from '@headlessui/react'
import React from 'react'
import { useController } from 'react-hook-form'

const ToggleInput = (props) => {
  const {
    field: { onChange, value },
  } = useController(props)
  const { disabled, name, label } = props
  return (
    <div className='flex items-center'>
      <Switch
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        className={`${
          value ? 'bg-cyan-800' : 'bg-gray-300'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2`}>
        <span
          className={`${
            value ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <Switch.Label className='ml-4 font-medium capitalize tracking-wider' passive>
        {label}
      </Switch.Label>
    </div>
  )
}

export default ToggleInput

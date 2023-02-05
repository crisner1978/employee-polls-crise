import React, { useEffect, useState } from 'react'

const ProgressBar = ({ bgColor, answered, users, label, hasAnswered }) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    let interval = setInterval(
      () => setPercentage(Math.floor((answered / users) * 100).toString()),
      500
    )
    return () => {
      clearInterval(interval)
    }
  }, [answered, users])

  const containerStyles = {
    height: 30,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: hasAnswered ? '#023E98' : bgColor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  const labelStyles = {
    padding: 10,
    paddingTop: 50,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
  }
  return (
    <div className=''>
      <div className='-mb-1 flex justify-end'>
        <span className='font-medium text-gray-500'>
          {answered} out of {users}{' '}
        </span>
      </div>
      <div style={containerStyles}>
        <div className='pt-px' style={fillerStyles}>
          <span style={labelStyles}>{percentage}%</span>
        </div>
      </div>
      <h3 className='-mt-4 text-lg font-medium'>
        {label}...
        {hasAnswered && <span className='ml-4 text-gray-500'>was your choice</span>}
      </h3>
    </div>
  )
}

export default ProgressBar

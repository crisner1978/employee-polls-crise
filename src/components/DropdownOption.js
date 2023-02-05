export default function DropdownOption({ icon, text, onClick, border }) {
  return (
    <div className='dropdown__option' onClick={onClick}>
      {border && <hr className='-mt-1 border border-gray-200' />}
      <p>
        {icon}
        <span>{text}</span>
      </p>
    </div>
  )
}

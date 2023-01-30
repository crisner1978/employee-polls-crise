export default function DropdownOption({ icon, text, onClick, border }) {
  return (
    <div className="dropdown__option" onClick={onClick}>
      {border && <hr className="border border-gray-200 -mt-1" />}
      <p>
        {icon}
        <span>{text}</span>
      </p>
    </div>
  );
}
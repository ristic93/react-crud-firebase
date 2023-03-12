import "./input.scss";

export const Input = ({
  label,
  type,
  value,
  name,
  id,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-group">
      <div className="custom-label">{label}</div>
      <input
        className="custom-input"
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export const Select = ({ label, name, id, onChange, children }) => {
  return (
    <div className="select-group">
      <div className="select-label">{label}</div>
      <select className="custom-select" name={name} id={id} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};

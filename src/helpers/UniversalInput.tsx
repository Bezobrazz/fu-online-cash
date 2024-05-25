import  { FC, ChangeEvent } from 'react';

interface UniversalInputProps {
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  [x: string]: any; // для інших пропсів
}

const UniversalInput: FC<UniversalInputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  label = '',
  className = '',
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      />
    </div>
  );
};

export default UniversalInput;

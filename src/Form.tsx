import React, { createContext, useContext, ChangeEvent } from 'react';
import './Form.css';

interface FormContextType {
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProps {
  children: React.ReactNode;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const Form = ({ children, setFormData }: FormProps) => {
  return (
    <FormContext.Provider value={{ setFormData }}>
      <div className="form">
        {children}
      </div>
    </FormContext.Provider>
  );
};

interface RowProps {
  children: React.ReactNode;
}

const Row = ({ children }: RowProps) => {
  return <div className="form-row">{children}</div>;
};

interface InputProps {
  id: string;
  placeholder?: string;
}

const Input = ({ id, placeholder }: InputProps) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Input must be used within Form');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    context.setFormData((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      onChange={handleChange}
      className="form-input"
    />
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className="form-button">
      {children}
    </button>
  );
};

Form.Row = Row;
Form.Input = Input;
Form.Button = Button;

import { createContext, use, useState } from "react";

const FormContext = createContext();

export const useFormData = () => use(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);

  return (
    <FormContext value={{ formData, setFormData }}>{children}</FormContext>
  );
};

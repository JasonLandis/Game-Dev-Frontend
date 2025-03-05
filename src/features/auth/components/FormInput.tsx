import { ReactNode } from "react"

type TFormInputProps = {
  children: ReactNode,
  register: any,
  type: string,
  placeholder: string
}

export default function FormInput({children, register, type, placeholder}: TFormInputProps) {
  return (
    <>
      <input {...register} type={type} placeholder={placeholder} />
      {errors.username && <div className="form-error">{`${errors.username.message}`}</div>}
      {children}
    </>
  )
}

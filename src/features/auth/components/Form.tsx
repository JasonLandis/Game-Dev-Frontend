import { ReactNode, Children } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../components/Button';
import './styles/form.scss';

type TFormProps = {
  children: ReactNode;
  submitFunction: (data: FieldValues) => Promise<void>;
  resolver: any;
  title: string;
};

export default function Form({ children, submitFunction, resolver, title }: TFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<any>({
    resolver: zodResolver(resolver)
  });

  {
    Children.map(children, (child, index) => <li key={index}>{child}</li>);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(submitFunction)} className="form-content">
        <div className="form-title">{title}</div>
        {Children.map(children, (child, index) => (
          <div key={index}>{child}</div>
        ))}
        <Button type={'submit'} disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}

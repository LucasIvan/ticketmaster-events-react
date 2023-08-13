import { useForm } from 'react-hook-form';
import styles from './MyInfo.module.css'
import { useEffect } from 'react';

const USER_DATA = 'userData';

const MyInfo = () => {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA)) || [];
      setValue('name', userData?.name);
      setValue('age', userData?.age);
      setValue('email', userData?.email);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmitForm = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));  
      alert('Usuario Actualizado');
    } catch (error) {
      alert('Ocurrió un error');
    }
    
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
      <label htmlFor="" className={styles.label}>
        Name
        <input
          {...register('name', { required: true, minLength: 1, maxLength: 120 })}
          type="text"
          className={styles.input}
        />
      </label>
      <label htmlFor="" className={styles.label}>
        Email
        <input type="text" {...register('email', { required: true })} className={styles.input} />
      </label>
      <label htmlFor="" className={styles.label}>
        Age
        <input
          {...register('age', { required: true, min: 1, max: 120, valueAsNumber: true })}
          type="number"
          className={styles.input}
        />
      </label>
      <button type='submit' className={styles.submitButton}>Save</button>
    </form>
  )
};

export default MyInfo;
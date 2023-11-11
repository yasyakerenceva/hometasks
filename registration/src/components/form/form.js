import { useRef} from 'react';
import styles from './form.module.css';
import { Field } from '../field/field';
import {initialState} from '../../utils/initialStates';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeFieldScheme } from '../../utils/scheme';

export const Form = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, touchedFields, isValid, dirtyFields},
	} = useForm({
		mode: 'onChange',
		defaultValues: initialState,
		resolver: yupResolver(changeFieldScheme),
	});

	const submitButtonRef = useRef(null);

	if (isValid) {
		setTimeout(() => {
			submitButtonRef.current.focus();
		}, 0);
	}

	const onSubmitFormRegistration = (formDate) => {
		console.log('submit', formDate);
		reset();
		submitButtonRef.current.blur();
	};

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Регистрация</h1>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmitFormRegistration)}
			>
				<Field
					type={'text'}
					name={'email'}
					label={'Email'}
					active={dirtyFields.email}
					error={touchedFields.email && errors.email?.message}
					register={{ ...register('email') }}
				/>
				<Field
					type={'password'}
					name={'password'}
					label={'Пароль'}
					active={dirtyFields.password}
					error={touchedFields.password && errors.password?.message}
					register={{ ...register('password') }}
				/>
				<Field
					type={'password'}
					name={'confirmPassword'}
					label={'Повторение пароля'}
					active={dirtyFields.confirmPassword}
					error={
						touchedFields.confirmPassword && errors.confirmPassword?.message
					}
					register={{ ...register('confirmPassword') }}
				/>
				<button
					type="submit"
					disabled={!isValid}
					ref={submitButtonRef}
					className={styles.btn}
				>
					<span className={styles.btnText}>Зарегистрироваться</span>
				</button>
			</form>
		</div>
	);
};

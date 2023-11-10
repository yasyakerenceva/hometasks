import { initialErrors } from '../../utils/initialStates';
import { useRef, useState } from 'react';
import styles from './form.module.css';
import { useStore } from '../../utils/store';
import { Field } from '../field/field';

export const Form = () => {
	const [errors, setErrors] = useState(initialErrors);

	const { state, valueEntered, updateState, updateValueEntered, resetState } =
		useStore();

	const submitButtonRef = useRef(null);

	const { email, password, confirmPassword } = state;

	const isValid = Object.values(errors).every((error) => error === null);
	if (isValid) {
		setTimeout(() => submitButtonRef.current.focus(), 0);
	}

	const onSubmitFormRegistration = (e) => {
		e.preventDefault();
		console.log({ email, password });
		resetState();
		setErrors(initialErrors);
		submitButtonRef.current.blur();
	};

	const checkValidation = (type, value) => {
		let newErrors = null;
		let fieldValidationErrors = { ...errors };

		switch (type) {
			case 'email':
				if (!/([a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+)/.test(value)) {
					newErrors = 'Введите корректные данные';
				}
				fieldValidationErrors.email = newErrors;
				break;
			case 'password':
				if (value.length < 4 || value.length > 20) {
					newErrors = 'Пароль должен быть длинее 3 и меньше 20';
					if (!value) {
						newErrors = 'Пароль не может быть пустым';
					}
				}
				if (confirmPassword.length > 0 && value !== confirmPassword) {
					fieldValidationErrors.confirmPassword = 'Пароли не совпадают';
				}
				if (confirmPassword.length > 0 && value === confirmPassword) {
					fieldValidationErrors.confirmPassword = null;
				}
				fieldValidationErrors.password = newErrors;
				break;
			case 'confirmPassword':
				if (value !== password) {
					newErrors = 'Пароли не совпадают';
				}
				fieldValidationErrors.confirmPassword = newErrors;
				break;
			default:
				break;
		}

		setErrors({ ...fieldValidationErrors });
	};

	const onChangeField = ({ target }) => {
		updateState(target.name, target.value);
		checkValidation(target.name, target.value);
	};

	const onBlurField = ({ target }) => updateValueEntered(target.name);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Регистрация</h1>
			<form className={styles.form} onSubmit={onSubmitFormRegistration}>
				<Field
					state={email}
					type={'text'}
					name={'email'}
					label={'Email'}
					entered={valueEntered.email}
					error={errors.email}
					onChangeField={onChangeField}
					onBlurField={onBlurField}
				/>
				<Field
					state={password}
					type={'password'}
					name={'password'}
					label={'Пароль'}
					entered={valueEntered.password}
					error={errors.password}
					onChangeField={onChangeField}
					onBlurField={onBlurField}
				/>
				<Field
					state={confirmPassword}
					type={'password'}
					name={'confirmPassword'}
					label={'Повторение пароля'}
					entered={valueEntered.confirmPassword}
					error={errors.confirmPassword}
					onChangeField={onChangeField}
					onBlurField={onBlurField}
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

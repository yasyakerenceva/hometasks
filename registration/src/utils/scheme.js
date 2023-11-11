import * as yup from 'yup';

export const changeFieldScheme = yup.object().shape({
	email: yup
		.string()
		.matches(/([a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+)/, 'Введите корректные данные'),
	password: yup
		.string()
		.required('Пароль не должен быть пустым')
		.min(4, 'Пароль должен быть длинее 3 символов')
		.max(20, 'Пароль должен быть короче 20 символов'),
	confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

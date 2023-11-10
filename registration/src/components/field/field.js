import styles from './field.module.css';

export const Field = ({
	state,
	type,
	name,
	label,
	entered,
	error,
	onChangeField,
	onBlurField,
}) => {
	return (
		<div className={styles.field}>
			<input
				className={`${styles.input} ${state && styles.inputActive}`}
				name={name}
				id={name}
				value={state}
				type={type}
				label={label}
				onChange={onChangeField}
				onBlur={onBlurField}
			/>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			{entered && error && (
				<div className={styles.error}>
					<span className={styles.errorText}>{error}</span>
				</div>
			)}
		</div>
	);
};

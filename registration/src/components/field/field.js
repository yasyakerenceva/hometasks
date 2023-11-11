import styles from './field.module.css';

export const Field = ({ type, name, label, active, error, register }) => {
	return (
		<div className={styles.field}>
			<input
				className={`${styles.input} ${active && styles.inputActive}`}
				id={name}
				type={type}
				{...register}
			/>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			{error && (
				<div className={styles.error}>
					<span className={styles.errorText}>{error}</span>
				</div>
			)}
		</div>
	);
};

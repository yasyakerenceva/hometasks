import styles from './App.module.css';
import bgImg from './assets/img_bg.jpg';
import { Form } from './components';

export const App = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.registration}>
				<Form />
			</div>
			<div className={styles.img}>
				<img src={bgImg} alt="bg" />
			</div>
		</div>
	);
};

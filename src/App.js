import { useState } from 'react';
import './App.css';
//import '../public/index.html';
import styles from './app.module.css';
export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = () => {
		return value.length >= 3;
	};
	const onAddButtonClick = () => {
		const validValue = isValueValid();
		if (validValue) {
			const updatedList = [...list, { id: Date.now, value: value }];
			setList(updatedList);
			setError('');
			setValue('');
		}
	};

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Введенное значение должно быть длиннее 3 символов');
		}
		console.log(promptValue);
	};
	const myList = list.map(({ id, value }) => (
		<li key={id} className={styles['list-item']}>
			{value}
		</li>
	));
	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : null}
			<div className={styles['buttons-container']}>
				<button
					className={styles['button']}
					onClick={onInputButtonClick}
				>
					Ввести новое
				</button>
				<button
					className={styles['button']}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length < 1 ? (
					<p className={styles['no-margin-text']}>
						Нет добавленных элементов
					</p>
				) : null}

				<ul className={styles.list}>{list && myList}</ul>
			</div>
		</div>
	);
};

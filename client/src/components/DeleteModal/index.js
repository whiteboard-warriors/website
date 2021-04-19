import React, { useRef, useEffect, useCallback, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import './style.scss';

import Button from 'react-bootstrap/Button';

import AlertContext from '../../context/alert/alertContext';

const DeleteModal = (props) => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const {
		id,
		title = 'Title',
		type = 'Item Type',
		message = 'message about what you are deleting. ',
		action,
		showModal,
		setShowModal,
	} = props;

	const modalRef = useRef();

	const animation = useSpring({
		config: {
			duration: 300,
		},
		opacity: showModal ? 1 : 0,
		transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
	});

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

	const keyPress = useCallback(
		(e) => {
			if (e.key === 'Escape' && showModal) {
				setShowModal(false);
			}
		},
		[setShowModal, showModal]
	);

	useEffect(() => {
		document.addEventListener('keydown', keyPress);
		return () => document.addEventListener('keydown', keyPress);
	}, [keyPress]);

	return (
		<>
			{showModal ? (
				<div
					className='delete-modal-container'
					ref={modalRef}
					onClick={closeModal}
				>
					<animated.div style={animation}>
						<div className='delete-modal'>
							<p className='lead'>{message}</p>
							<h4>{title}</h4>
							<div className='text-center'>
								<Button
									variant='secondary'
									size='lg'
									className='mr-5'
									aria-label='Close modal'
									onClick={() =>
										setShowModal((prev) => !prev)
									}
								>
									Cancel
								</Button>

								<Button
									variant='danger'
									size='lg'
									onClick={() => {
										action(id);
										setAlert(
											`Your ${type} has been deleted`,
											'danger'
										);
									}}
								>
									Delete
								</Button>
							</div>
						</div>
					</animated.div>
				</div>
			) : null}
		</>
	);
};

export default DeleteModal;

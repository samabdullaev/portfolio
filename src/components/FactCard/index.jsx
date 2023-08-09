import React from 'react';

const FactCard = ({ item }) => {
	return (
		<div className='fuct-item'>
			<div className='icon'>
				<span className={item.icon} />
			</div>
			<div className='name'>{item.text}</div>
		</div>
	);
};

export default FactCard;

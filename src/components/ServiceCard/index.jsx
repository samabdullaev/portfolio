import React from 'react';

const ServiceCard = ({ item }) => {
	return (
		<div className='service-item'>
			<div className='icon'>
				<span className={item.icon} />
			</div>
			<div className='name'>
				<span> {item.title}</span>
			</div>
			<div className='desc'>
				<div>
					<p>{item.text}</p>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;

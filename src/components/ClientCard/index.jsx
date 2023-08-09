import React from 'react';

const ClientCard = ({ item }) => {
	return (
		<div className='client-item'>
			<div className='image'>
				<a target='_blank' href={item.link}>
					<img src={item.image} alt='' />
				</a>
			</div>
		</div>
	);
};

export default ClientCard;

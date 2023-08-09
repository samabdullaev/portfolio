import React from 'react';

const ExperienceCard = ({ item }) => {
	return (
		<div
			className={`resume-item border-line-h ${
				item.date.toLowerCase().includes('present') ? 'active' : ''
			}`}
		>
			<div className='date'>{item.date}</div>
			<div className='name'>{item.title}</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<div className='company'>{item.company}</div>
				<div className='company'>{item.location}</div>
			</div>
			{item.summary && <p>{item.summary}</p>}

			<div className='skills-list list'>
				<ul>
					{item.points?.map((point, index) => (
						<li key={index} style={{ fontSize: '14px', paddingBottom: '0px' }}>
							<div className='name' style={{ fontSize: '14px' }}>
								{point}
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='clear' />
		</div>
	);
};

export default ExperienceCard;

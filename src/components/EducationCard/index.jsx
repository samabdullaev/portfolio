import React from 'react';

const EducationCard = ({ item }) => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<div
			className={`resume-item border-line-h ${
				item.end_date.split('/')[1] >= year ? 'active' : ''
			}`}
		>
			<div className='date'>
				{item.start_date} - {item.end_date}
			</div>
			<div className='name'>{item.school}</div>
			<div className='company'>{item.location}</div>
			<p>{item.degree}</p>
			<div className='skills-list list'>
				<div className='skills-list list '>
					<ul className='row' style={{ marginTop: '10px' }}>
						{item.subjects?.map((point, index) => (
							<li
								className='col col-d-6 col-t-6 col-m-12'
								key={index}
								style={{
									fontSize: '14px',
									paddingBottom: '10px',
									paddingLeft: '0px',
								}}
							>
								<div className='name' style={{ fontSize: '14px' }}>
									{point}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default EducationCard;

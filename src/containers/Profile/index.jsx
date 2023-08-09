import React from 'react';

const Profile = ({ data }) => {
	return (
		<div className='card-started' id='home-card'>
			{/*
        Profile
      */}
			<div className='profile no-photo'>
				{/* profile image */}
				<div
					className='slide'
					style={{ backgroundImage: `url(${data.avatar})` }}
				/>
				{/* profile titles */}
				<div className='title'>{data.full_name}</div>
				{/*<div class="subtitle">Web Designer</div>*/}
				<div className='subtitle subtitle-typed'>
					<div className='typing-title'>
						{data.job_titles?.map((item, index) => (
							<p key={index}>{item}</p>
						))}
					</div>
				</div>
				{/* profile socials */}
				<div className='social'>
					{data.contact.socials?.map((item, index) => (
						<a key={index} target='_blank' href={item.link}>
							<span className={item.icon} />
						</a>
					))}
				</div>
				{/* profile buttons */}
				<div className='lnks'>
					<a href='#' className='lnk'>
						<span className='text'>Download CV</span>
						<span className='ion ion-archive' />
					</a>
					<a href='#' className='lnk discover'>
						<span className='text'>Contact Me</span>
						<span className='arrow' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Profile;

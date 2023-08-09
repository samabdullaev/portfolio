import navbarData from 'data/navbar.data';
import React from 'react';

const Navbar = () => {
	return (
		<header className='header'>
			<div className='profile'>
				<div className='title'>Sayyod Mirzamitdinov</div>
				<div className='subtitle subtitle-typed'>
					<div className='typing-title'>
						<p>Web Designer</p>
						<p>Developer</p>
						<p>Freelancer</p>
					</div>
				</div>
			</div>
			<div className='top-menu'>
				<ul>
					{navbarData.map((item, index) => (
						<li key={index} className={index === 0 ? 'active' : ''}>
							<a href={item.path}>
								<span className={item.icon} />
								<span className='link'>{item.title}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Navbar;

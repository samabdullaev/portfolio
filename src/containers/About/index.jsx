import ClientCard from 'components/ClientCard';
import FactCard from 'components/FactCard';
import ServiceCard from 'components/ServiceCard';
import React from 'react';

const About = ({ data }) => {
	return (
		<div className='card-inner animated active' id='about-card'>
			<div className='card-wrap'>
				{/*
        About
      */}
				<div className='content about'>
					{/* title */}
					<div className='title'>About Me</div>
					{/* content */}
					<div className='row'>
						<div className='col  col-12 border-line-v'>
							<div className='text-box'>
								<p>{data.about.text}</p>
							</div>
						</div>

						<div className='clear' />
					</div>
				</div>
				{/*
        Services
      */}
				{data.services && (
					<div className='content services'>
						<div className='title'>My Services</div>
						<div className='row service-items border-line-v'>
							{data.services?.map((item, index) => (
								<div
									key={index}
									className='col col-d-6 col-t-6 col-m-12 border-line-h'
								>
									<ServiceCard item={item} />
								</div>
							))}
						</div>
						<div className='clear' />
					</div>
				)}

				{/* <div className='content pricing'>

					<div className='title'>Pricing</div>

					<div className='row pricing-items'>

						<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
							<div className='pricing-item'>
								<div className='icon'>
									<i className='fa fa-battery-half' />
								</div>
								<div className='name'>Basic</div>
								<div className='amount'>
									<span className='dollar'>$</span>
									<span className='number'>22</span>
									<span className='period'>hour</span>
								</div>
								<div className='feature-list'>
									<ul>
										<li>Web Development</li>
										<li>Advetising</li>
										<li>Game Development</li>
										<li className='disable'>Music Writing</li>
										<li className='disable'>
											Photography <strong>new</strong>
										</li>
									</ul>
								</div>
								<div className='lnks'>
									<a href='#' className='lnk'>
										<span className='text'>Buy Basic</span>
									</a>
								</div>
							</div>
						</div>

						<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
							<div className='pricing-item'>
								<div className='icon'>
									<i className='fa fa-battery-full' />
								</div>
								<div className='name'>Pro</div>
								<div className='amount'>
									<span className='dollar'>$</span>
									<span className='number'>48</span>
									<span className='period'>hour</span>
								</div>
								<div className='feature-list'>
									<ul>
										<li>Web Development</li>
										<li>Advetising</li>
										<li>Game Development</li>
										<li>Music Writing</li>
										<li>
											Photography <strong>new</strong>
										</li>
									</ul>
								</div>
								<div className='lnks'>
									<a href='#' className='lnk'>
										<span className='text'>Buy Pro</span>
									</a>
								</div>
							</div>
						</div>
						<div className='clear' />
					</div>
				</div> */}

				{data.facts && (
					<div className='content fuct'>
						<div className='title'>Fun Fact</div>
						<div className='row fuct-items'>
							{data.facts?.map((item, index) => (
								<div
									key={index}
									className='col col-d-3 col-t-3 col-m-6 border-line-v'
								>
									<FactCard item={item} />
								</div>
							))}
							<div className='clear' />
						</div>
					</div>
				)}
				{data.clients && (
					<div className='content clients'>
						<div className='title'>Clients</div>

						<div className='row client-items'>
							{data.clients?.map((item, index) => (
								<div
									key={index}
									className='col col-d-3 col-t-3 col-m-6 border-line-v'
								>
									<ClientCard item={item} />
								</div>
							))}
							<div className='clear' />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default About;

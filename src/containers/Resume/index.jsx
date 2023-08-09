import EducationCard from 'components/EducationCard';
import ExperienceCard from 'components/ExperienceCard';
import React from 'react';

const Resume = ({ data }) => {
	return (
		<div className='card-inner' id='resume-card'>
			<div className='card-wrap'>
				{/*
          Resume
        */}
				<div className='content resume'>
					{/* title */}
					<div className='title'>Resume</div>
					{/* content */}
					<div className='row'>
						{/* experience */}
						{data.experience && (
							<div className='col col-12 border-line-v'>
								<div className='resume-title border-line-h'>
									<div className='icon'>
										<i className='fa fa-briefcase' />
									</div>
									<div className='name'>Experience</div>
								</div>
								<div className='resume-items'>
									{data.experience?.map((item, index) => (
										<ExperienceCard item={item} key={index} />
									))}
								</div>
							</div>
						)}
						{/* education */}
						{data.education && (
							<div className='col col-12 border-line-v'>
								<div className='resume-title border-line-h'>
									<div className='icon'>
										<i className='fa fa-university' />
									</div>
									<div className='name'>Education</div>
								</div>
								<div className='resume-items'>
									{data.education?.map((item, index) => (
										<EducationCard item={item} key={index} />
									))}
								</div>
							</div>
						)}
						<div className='clear' />
					</div>
				</div>
				{/*
          Skills
        */}
				<div className='content skills'>
					{/* title */}
					<div className='title'>My Skills</div>
					{/* content */}
					<div className='row'>
						{/* skill item */}
						{data.skills && (
							<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
								<div className='skills-list'>
									<div className='skill-title border-line-h'>
										<div className='icon'>
											<i className='fa fa-paint-brush' />
										</div>
										<div className='name'>Design</div>
									</div>
									<ul>
										{data.skills?.map((item, index) => (
											<li className='border-line-h' key={index}>
												<div className='name'>{item.name}</div>
												<div className='progress'>
													<div
														className='percentage'
														style={{ width: `${item.level}%` }}
													/>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
						{/* skill item */}
						{data.languages && (
							<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
								<div className='skills-list dotted'>
									<div className='skill-title border-line-h'>
										<div className='icon'>
											<i className='fa fa-flag' />
										</div>
										<div className='name'>Languages</div>
									</div>
									<ul>
										{data.languages?.map((item, index) => (
											<li key={index} className='border-line-h'>
												<div className='name'>{item.name}</div>
												<div className='progress'>
													<div
														className='percentage'
														style={{ width: `${item.level}%` }}
													/>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
						{/* skill item */}
						{data.coding && (
							<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
								<div className='skills-list circles'>
									<div className='skill-title border-line-h'>
										<div className='icon'>
											<i className='fa fa-code' />
										</div>
										<div className='name'>Coding</div>
									</div>
									<ul>
										{data.coding?.map((item, index) => (
											<li key={index}>
												<div className='name'>{item.name}</div>
												<div className={`progress p${item.level}`}>
													<span>{item.level}%</span>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
						{/* skill item */}
						{data.knowledge && (
							<div className='col col-d-6 col-t-6 col-m-12 border-line-v'>
								<div className='skills-list list'>
									<div className='skill-title border-line-h'>
										<div className='icon'>
											<i className='fa fa-list' />
										</div>
										<div className='name'>Knowledge</div>
									</div>
									<ul>
										{data.knowledge?.map((item, index) => (
											<li key={index}>
												<div className='name'>{item}</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
						<div className='clear' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resume;

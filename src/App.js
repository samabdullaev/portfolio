import Loader from 'components/Loader';
import Bubbles from 'components/Bubbles';
import Navbar from 'components/Navbar';
import Profile from 'containers/Profile';
import About from 'containers/About';
import Resume from 'containers/Resume';
import Projects from 'containers/Projects';
import Blogs from 'containers/Blogs';
import Contacts from 'containers/Contacts';
import profileData from 'data/profile.data';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import aboutData from 'data/about.data';
import resumeData from 'data/resume.data';
import projectsData from 'data/projects.data';
import ProjectDetails from 'containers/ProjectDetails';
import { useLocation, useRoutes } from 'react-router-dom';
import contactData from 'data/contact.data';
function App() {
	const [data, setData] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null)


	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		setData({
			profile: profileData,
			about: aboutData,
			resume: resumeData,
			projects: projectsData,
			contacts: contactData
		});
	};

	const handleChangePage = (item) => {
		if (selectedProject == null && item == null) {
		} else {
			setSelectedProject(item)
		}
	}


	if (!data) {
		return (
			<div className='page new-skin'>
				<Loader />
			</div>
		);
	}
	return (
		<>
			<div className='page new-skin'>
				{/* preloader */}
				<Bubbles />
				<div
					className='container opened'
					data-animation-in='fadeInLeft'
					data-animation-out='fadeOutLeft'
				>
					<Navbar handleChangePage={handleChangePage} />
					<Profile data={data.profile} />
					<About data={data.about} />

					<Resume data={data.resume} />
					<Projects data={data.projects} handleChangePage={handleChangePage} />
					{selectedProject && <ProjectDetails data={selectedProject} />}
					<Blogs />
					<Contacts data={data.contacts} />
				</div>
			</div>

			<Helmet>
				<script src='js/scripts.js'></script>
			</Helmet>
		</>
	);
}

export default App;

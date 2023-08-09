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
function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		setData({
			profile: profileData,
			about: aboutData,
			resume: resumeData,
		});
	};

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
					<Navbar />
					<Profile data={data.profile} />
					<About data={data.about} />

					<Resume data={data.resume} />
					<Projects />
					<Blogs />
					<Contacts />
				</div>
			</div>

			<Helmet>
				<script src='js/scripts.js'></script>
			</Helmet>
		</>
	);
}

export default App;

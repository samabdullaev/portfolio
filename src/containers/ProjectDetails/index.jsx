import ProjectCarousel from 'components/ProjectCarousel';
import React from 'react';

const ProjectDetails = ({ data }) => {
  return (
    <div className='card-inner blog blog-post animated active' id='blog-card'>
      <div className='card-wrap'>
        {/*
              Blog Single
            */}
        <div className='content blog-single'>
          {/* title */}

          <div className='title'>Project Details</div>

          {/* content */}
          <div className='row border-line-v'>
            <div className='col col-m-12 col-t-12 col-d-12'>
              <div className='post-box'>
                {/* blog detail */}
                <h1 className='h-title'>{data.title}</h1>

                {/* blog image */}
                <div className='blog-image'>
                  {/* <img src="images/blog/blog1.jpg" alt="" /> */}
                  <ProjectCarousel data={data.images} />
                </div>
                {/* blog content */}
                <div className='blog-content'>
                  <p>{data.text}</p>

                  <ul className='list-style'>
                    {data.points.map((item, index) => (
                      <li
                        style={{
                          fontSize: '15px',
                        }}
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='post-text-bottom'>
                  <span className='tags-links'>
                    Technologies:
                    {data.technologies.map((item, index) => (
                      <span
                        style={{
                          padding: '5px 10px',
                          fontSize: '15px',
                          borderRadius: '10px',
                          margin: '0px',
                          marginLeft: '5px',
                          marginBottom: '5px',
                        }}
                        key={index}
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

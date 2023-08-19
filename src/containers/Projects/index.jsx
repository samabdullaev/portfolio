import ProjectCard from 'components/ProjectCard'
import React from 'react'

const Projects = ({ data, handleChangePage }) => {
  return (
    <div className="card-inner" id="works-card">
      <div className="card-wrap">
        {/*
          Works
        */}
        <div className="content works">
          {/* title */}
          <div className="title">Projects</div>
          {/* filters */}
          {/* <div className="filter-menu filter-button-group">
          <div className="f_btn active">
            <label><input type="radio" name="fl_radio" defaultValue="grid-item" />All</label>
          </div>
          <div className="f_btn">
            <label><input type="radio" name="fl_radio" defaultValue="photo" />Image</label>
          </div>
          <div className="f_btn">
            <label><input type="radio" name="fl_radio" defaultValue="gallery" />Gallery</label>
          </div>
          <div className="f_btn">
            <label><input type="radio" name="fl_radio" defaultValue="video" />Video</label>
          </div>
          <div className="f_btn">
            <label><input type="radio" name="fl_radio" defaultValue="music" />Music</label>
          </div>
          <div className="f_btn">
            <label><input type="radio" name="fl_radio" defaultValue="design" />Content</label>
          </div>
        </div> */}
          {/* content */}
          <div className="row grid-items border-line-v">
            {/* work item photo */}
            {
              data.map((item, index) => (
                <div key={index} className="col col-d-6 col-t-6 col-m-12 grid-item photo border-line-h">
                  <ProjectCard handleChangePage={handleChangePage} item={item} />
                </div>
              ))
            }

            <div className="clear" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Projects

import React from 'react'

const ProjectCard = ({ item, handleChangePage }) => {
  return (
    <div className="box-item">
      <div className="image"
      >
        <a className='img'

        >
          <img

            src={item.avatar} alt="" />

        </a>
      </div>
      <div className="desc">
        <div
          onClick={() => handleChangePage(item)}
          style={{ cursor: 'pointer' }}
          className="name ">{item.title}</div>
        {/* <div className="category">Image</div> */}
      </div>
    </div>
  )
}

export default ProjectCard

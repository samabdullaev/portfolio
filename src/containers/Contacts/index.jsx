import React from 'react'

const Contacts = ({ data }) => {
  return (
    <div className="card-inner contacts" id="contacts-card">
      <div className="card-wrap">
        {/*
          Conacts Info
        */}
        {/* <div className="content contacts">
          <div className="title">Get in Touch</div>
          <div className="row">
            <div className="col col-d-12 col-t-12 col-m-12 border-line-v">
              <div className="map" id="map" />
              <div className="info-list">
                <ul>
                  {
                    Object.keys(data.info).map((item, index) => (
                      <li style={{ fontSize: '12px', }}>
                        <strong>{item} </strong> {data.info[item]}
                      </li>
                    ))
                  }

                </ul>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div> */}
        {/*
          Contact Form
        */}
        <div className="content contacts">
          {/* title */}
          <div className="title">Contact</div>
          {/* content */}
          <div className="row">
            <div className="col col-d-12 col-t-12 col-m-12 border-line-v">
              <div className="contact_form">
                <form id="cform" method="post">
                  <div className="row">
                    <div className="col col-d-6 col-t-6 col-m-12">
                      <div className="group-val">
                        <input type="text" name="name" placeholder="Full Name" />
                      </div>
                    </div>
                    <div className="col col-d-6 col-t-6 col-m-12">
                      <div className="group-val">
                        <input type="text" name="email" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="col col-d-12 col-t-12 col-m-12">
                      <div className="group-val">
                        <textarea name="message" placeholder="Your Message" defaultValue={""} />
                      </div>
                    </div>
                  </div>
                  <div className="align-left">
                    <a href="#" className="button" >
                      <span className="text">Send Message</span>
                      <span className="arrow" />
                    </a>
                  </div>
                </form>
                <div className="alert-success">
                  <p>Thanks, your message is sent successfully.</p>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts

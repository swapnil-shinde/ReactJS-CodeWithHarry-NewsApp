import React, { Component } from 'react'
import NoImage from './noimage.png'


export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, time, source } = this.props
    return (
      <div className='my-3'>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:1, left:'90%'}} >
            {source}
            <span class="visually-hidden">unread messages</span>
          </span>
          <img src={imageUrl === '' || imageUrl === null ? NoImage : imageUrl} className="card-img-top" alt="..." style={{height:'195px'}}/>
          <div className="card-body">
            <h5 className="card-title">{ title }</h5>
            <p className="card-text">{ description }</p>
            <p className="card-text"><small className="text-muted"> By {author} on {new Date(time).toDateString()}, {new Date(time).toLocaleTimeString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
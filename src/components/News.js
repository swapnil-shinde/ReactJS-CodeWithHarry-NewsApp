import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div className='container my-3'>
        <h2>Daily News - Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title='MyTitle' description='MyDesc' imageUrl='https://image.cnbcfm.com/api/v1/image/107314749-1696967314567-AP23282600292422.jpg?v=1696977398&w=1920&h=1080'/>
          </div>
          <div className="col-md-4">
            <NewsItem title='MyTitle' description='MyDesc'/>
          </div>
          <div className="col-md-4">
            <NewsItem title='MyTitle' description='MyDesc'/>
          </div>
        </div>
      </div>
    )
  }
}

export default News
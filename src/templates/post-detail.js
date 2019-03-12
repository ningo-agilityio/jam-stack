import React, { Fragment } from 'react'
import { Link } from "gatsby"
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import './post.css'

const PostDetail = (props) => {
  const {
    title,
    author,
    thumbnail, 
    content,
    gallery
  } = props.data.contentfulPost

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="post-info">
        <h5>Author by: {author.name}</h5>
        <Img sizes={author.avatar.sizes} />
        {/* <img src={author.avatar.url} /> */}
      </div>

      {/* <img src={thumbnail.sizes} /> */}
      <Img sizes={thumbnail.sizes} style={{ height: '100%', objectFit: 'cover' }} />

      <div className="post-content">
        {content.content}
      </div>

      <h5>Gallery</h5>
      <div className="post-gallery row">
        {
          gallery.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <div className="col s12 m4">
                  <div className="card">
                    <div className="card-image" style={{ height: '190px' }}>
                      <Img sizes={item.sizes} style={{ height: '100%', objectFit: 'cover' }} />
                      {/* <img 
                        src={item.url}
                        alt={'Thumbnail'} 
                        
                      /> */}
                    </div>
                    <div className="card-content">
                      <h4 className="card-title truncate">{item.description}</h4>
                    </div>
                  </div>
                  
                </div>
                {
                  (index + 1) % 3 === 0 &&
                  <div className="clearfix"></div>
                }
              </Fragment>
            )
          })
        }
      </div>
      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}

export default PostDetail

export const pageQuery = graphql`
  query postDetailQuery($slug: String!) {
    contentfulPost(slug: {eq: $slug}) {
      id
      title
      content {
        id
        content
      }
      createdDate
      thumbnail {
        id
        sizes(maxWidth: 800, quality: 80) {
          ...GatsbyContentfulSizes
        }
      }
      author {
        id
        name
        avatar {
          id
          sizes(maxWidth: 800, quality: 80) {
            ...GatsbyContentfulSizes
          }
        }
      }
      slug
      gallery {
        id
        description
        sizes(maxWidth: 800, quality: 80) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`

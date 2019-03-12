/*global graphql*/
import React, { Fragment } from 'react'
import { Link } from "gatsby"
import './post.css'

const PostDetail = (props) => {
  const {
    title,
    author,
    thumbnail, 
    content,
    gallery
  } = props.data.contentfulPost
  console.log(gallery)
  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="post-info">
        <h5>Author by: {author.name}</h5>
        <img src={author.avatar.file.url} />
      </div>

      <img src={thumbnail.file.url} />

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
                      <img 
                        src={item.file.url}
                        alt={'Thumbnail'} 
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
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
        file {
          url
        }
      }
      author {
        id
        name
        avatar {
          id
          file {
            url
          }
        }
      }
      slug
      gallery {
        id
        description
        file {
          url
        }
      }
    }
  }
`

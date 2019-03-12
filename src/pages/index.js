import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'

const query = graphql`
  query ListPosts {
    allContentfulPost {
      edges {
        node {
          id
          title
          content {
            content
          }
          createdDate
          author {
            name
          }
          slug
          thumbnail {
            id
            sizes(maxWidth: 800, quality: 80) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StaticQuery 
      query={query}
      render={(data) => {
        return (
          <div className="row">
            {
              data.allContentfulPost.edges.map((post, index) => (
                <>
                  <div 
                    className="col s12 m4" 
                    key={post.node.id} 
                    style={{ 
                      height: '100%', 
                      maxHeight: '300px',
                      marginBottom: '50px'
                    }}
                  >
                    <a href={`/${post.node.slug}`} style={{ display: 'block' }}>
                      <div className="card">
                        <div className="card-image" style={{ height: '190px' }}>
                          <Img sizes={post.node.thumbnail.sizes} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="card-content">
                          <h4 className="card-title truncate">{post.node.title}</h4>
                          <p className="truncate">{post.node.author.name}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  {
                    (index + 1) % 3 === 0 &&
                    <div style={{ clear: 'both' }}></div>
                  }
                </>
              ))
            }
          </div>
        )
      }}
    />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

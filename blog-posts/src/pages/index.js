import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {
                data.allContentfulPost.edges.map((post) => (
                  <tr key={post.node.id}>
                    <td>{post.node.title}</td>
                    <td>{post.node.author.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }}
    />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

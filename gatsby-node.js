const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const postDetailTemplate = path.resolve('src/templates/post-detail.js')

    resolve(
      graphql(`
        {
          allContentfulPost (limit:100) {
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
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulPost.edges.forEach((edge) => {
          createPage({
            path: edge.node.slug,
            component: postDetailTemplate,
            context: {
              slug: edge.node.slug
            }
          })
        })
        return
      })
    )
  })
}


// You can delete this file if you're not using it

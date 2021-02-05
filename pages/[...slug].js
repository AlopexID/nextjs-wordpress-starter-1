import getPostTypeStaticPaths from '@/api/wordpress/_global/getPostTypeStaticPaths'
import getPostTypeStaticProps from '@/api/wordpress/_global/getPostTypeStaticProps'
import Container from '@/components/atoms/Container'
import RichText from '@/components/atoms/RichText'
import BlockGravityForm from '@/components/blocks/Gutenberg/BlockGravityForm'
import Layout from '@/components/common/Layout'
import Blocks from '@/components/molecules/Blocks'
import getPagePropTypes from '@/functions/getPagePropTypes'

// TODO Remove BlockGravityForm once block support is added.
// TODO Remove slug based BlockGravityForm from page render.

// Define route post type.
const postType = 'page'

/**
 * Render the Page component.
 *
 * @author WebDevStudios
 * @param {object} props      The component attributes as props.
 * @param {object} props.post Post data from WordPress.
 * @return {Element} The Page component.
 */
export default function Page({post}) {
  return (
    <Layout seo={{...post?.seo}}>
      <Container>
        <article className="innerWrap">
          <RichText tag="h1">{post?.title}</RichText>
          <Blocks blocks={post?.blocks} />
        </article>
        {post?.slug === 'form-demo' && (
          <BlockGravityForm {...post?.blocks[0]} />
        )}
      </Container>
    </Layout>
  )
}

/**
 * Get post static paths.
 *
 * @author WebDevStudios
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  return await getPostTypeStaticPaths(postType)
}

/**
 * Get post static props.
 *
 * @author WebDevStudios
 * @param {object}  context             Context for current post.
 * @param {object}  context.params      Route parameters for current post.
 * @param {boolean} context.preview     Whether requesting preview of post.
 * @param {object}  context.previewData Post preview data.
 * @return {object} Post props.
 */
export async function getStaticProps({params, preview, previewData}) {
  return getPostTypeStaticProps(params, postType, preview, previewData)
}

Page.propTypes = {
  ...getPagePropTypes(postType)
}

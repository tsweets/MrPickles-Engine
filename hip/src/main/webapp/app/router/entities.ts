import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Blog = () => import('@/entities/blog/blog.vue');
const BlogUpdate = () => import('@/entities/blog/blog-update.vue');
const BlogDetails = () => import('@/entities/blog/blog-details.vue');

const Post = () => import('@/entities/post/post.vue');
const PostUpdate = () => import('@/entities/post/post-update.vue');
const PostDetails = () => import('@/entities/post/post-details.vue');

const Tag = () => import('@/entities/tag/tag.vue');
const TagUpdate = () => import('@/entities/tag/tag-update.vue');
const TagDetails = () => import('@/entities/tag/tag-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'blog',
      name: 'Blog',
      component: Blog,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'blog/new',
      name: 'BlogCreate',
      component: BlogUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'blog/:blogId/view',
      name: 'BlogView',
      component: BlogDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'post',
      name: 'Post',
      component: Post,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'post/new',
      name: 'PostCreate',
      component: PostUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'post/:postId/edit',
      name: 'PostEdit',
      component: PostUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'post/:postId/view',
      name: 'PostView',
      component: PostDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: Tag,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tag/new',
      name: 'TagCreate',
      component: TagUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tag/:tagId/edit',
      name: 'TagEdit',
      component: TagUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tag/:tagId/view',
      name: 'TagView',
      component: TagDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};

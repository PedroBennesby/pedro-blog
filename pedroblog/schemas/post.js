export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
    },
    {
      name: 'titlePt',
      title: 'Title (Portuguese)',
      type: 'string',
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'string',
    },
    {
      name: 'descriptionPt',
      title: 'Description (Portuguese)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (English)',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'bodyEn',
      title: 'Body (English)',
      type: 'blockContent',
    },
    {
      name: 'bodyPt',
      title: 'Body (Portuguese)',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'titleEn',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}

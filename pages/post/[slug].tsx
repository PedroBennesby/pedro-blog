import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useTranslation } from 'next-i18next'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  const { t } = useTranslation('post')
  const localeActive = useRouter().locale
  const [locale, setLocale] = useState(Boolean)

  useEffect(() => {
    if (localeActive === 'en-US') {
      setLocale(true)
    } else {
      setLocale(false)
    }
  }, [localeActive])
  return (
    <main>
      <Header />

      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()}
        alt={locale ? post.titleEn : post.titlePt}
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">
          {locale ? post.titleEn : post.titlePt}
        </h1>
        <h2 className="font-ligh mb-2 text-xl text-gray-500">
          {locale ? post.descriptionEn : post.descriptionPt}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="text-sm font-extralight">
            {locale ? 'Blog post by' : 'Post feito por'}{' '}
            <span className="text-green-600">{post.author.name}</span> -{' '}
            {locale ? 'Published at' : 'Publicado em'}{' '}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={locale ? post.bodyEn : post.bodyPt}
            className=""
            serializers={{
              h1: (props: any) => (
                <h1 classname="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ children, href }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug{
  current },
}`

  const post = await sanityClient.fetch(query)
  const paths = post.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
}: any) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  titleEn,
  titlePt,
  descriptionEn,
  descriptionPt,
  slug,
  mainImage,
  author -> {
  name, 
  image,
},
  bodyEn,
  bodyPt}`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale, ['common', 'home', 'header'])),
    },
    revalidate: 60 * 60,
  }
}

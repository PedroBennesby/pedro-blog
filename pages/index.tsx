import Head from 'next/head'
import Header from '../components/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  const { t } = useTranslation('home')
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
    <div className="">
      <Head>
        <title>{t('name')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${locale ? post.slugEn.current : post.slugPt.current}`}
          >
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
                alt={locale ? post.titleEn : post.titlePt}
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">
                    {locale ? post.titleEn : post.titlePt}
                  </p>
                  <p className="text-xs">
                    {locale ? post.descriptionEn : post.descriptionPt} by{' '}
                    {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: any) {
  const query = `*[_type == "post"] {
  _id,
  titleEn, 
  titlePt, 
  slugEn,
  slugPt,
  descriptionEn, 
  descriptionPt,
  mainImage,
  author -> {
  name, 
  image,
}
}`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common', 'home', 'header'])),
    },
  }
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email?: string
  comment: string
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const notifySuccess = () =>
    toast.success(locale ? 'Comment submitted' : 'Comentário enviado')
  const notifyError = () =>
    toast.error(
      locale
        ? 'Comment not submitted, try again'
        : 'Comentário não enviado, tente novamente'
    )
  const localeActive = useRouter().locale
  const [locale, setLocale] = useState(Boolean)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
        notifySuccess()
      })
      .catch((err) => {
        setSubmitted(false)
        notifyError()
      })
  }

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
          <h3 className="text-3xl font-bold">
            {locale
              ? 'Thank you for submitting your comment!'
              : 'Obrigado por enviar seu comentário!'}
          </h3>
          <p>
            {locale
              ? 'Once it has been approved, it will appear below'
              : 'Assim que ele for aprovado, irá aparecer aqui embaixo'}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-yellow-500">
            {locale ? 'Enjoyed this article?' : 'Gostou desse artigo?'}
          </h3>

          <h4 className="text-3xl font-bold">
            {locale ? 'Leave a comment below!' : 'Deixe um comentário abaixo!'}
          </h4>

          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <span className="text-gray-700">{locale ? 'Name' : 'Nome'}</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow "
              placeholder="John Doe"
              type="text"
            />
          </label>

          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email')}
              className="form-input shado mt-1 block w-full rounded border py-2 px-3"
              placeholder="John Doe"
              type="email"
            />
          </label>

          <label className="mb-5 block">
            <span className="text-gray-700">
              {locale ? 'Comment' : 'Comentário'}
            </span>
            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow"
              placeholder="John Doe"
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">
                {locale
                  ? '- The Name Field is required'
                  : '- O campo Nome é obrigatório'}
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                {locale
                  ? '- The Comment Field is required'
                  : '- O campo Comentário é obrigatório'}
              </span>
            )}
          </div>
          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow transition duration-300 ease-in-out hover:bg-yellow-400 focus:outline-none"
          />
        </form>
      )}
      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
        <h3 className="text-4xl">{locale ? 'Comments' : 'Comentários'}</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
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
'comments': *[
  _type == 'comment' &&
  post._ref == ^._id &&
  approved == true
],
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

export interface Post {
  _id: string
  _createdAt: string
  titleEn: string
  titlePt: string
  author: {
    name: string
    image: string
  }
  descriptionEn: string
  descriptionPt: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  bodyEn: [object]
  bodyPt: [object]
  comments: [Comment]
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

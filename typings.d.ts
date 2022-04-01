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
}

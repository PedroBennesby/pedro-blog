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
  slugEn: {
    current: string
  }
  slugPt: {
    current: string
  }
  bodyEn: [object]
  bodyPt: [object]
}

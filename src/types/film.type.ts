export type FilmType = {
  id: number,
  title: string,
  genre: string,
  categoryId: number,
  year: string,
  director: string,
  roles: string,
  description: string,
  image: string,
  url: string,
  category?: {
    id: number,
    name: string,
    url: string,
  }
}

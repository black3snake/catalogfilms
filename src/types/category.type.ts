export type CategoryType = {
  "id": number,
  "name": string,
  "url": string,
  route: string,
  "queryParams": {
    "_expand": string,
    "categoryId": number,
  }
}

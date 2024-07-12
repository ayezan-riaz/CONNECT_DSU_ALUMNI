// Define the common Event type
export interface News {
  id: number
  name: string
  description: string
  date: string
  news_image: string | File[] // Union type to handle both URL string and File array
}

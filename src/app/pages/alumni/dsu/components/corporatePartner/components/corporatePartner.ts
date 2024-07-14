// Define the common Event type
export interface CorporatePartner {
  id: number
  name: string
  discounted_offer: string
  valid_date: string
  image: string | File[] // Union type to handle both URL string and File array
}


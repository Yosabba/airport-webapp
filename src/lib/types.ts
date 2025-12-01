export interface YelpCategory {
  alias: string;
  title: string;
}

export interface YelpLocation {
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface YelpCoordinates {
  latitude: number;
  longitude: number;
}

export interface YelpHours {
  open: {
    is_overnight: boolean;
    start: string;
    end: string;
    day: number;
  }[];
  hours_type: string;
  is_open_now: boolean;
}

export interface YelpBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: YelpCategory[];
  rating: number;
  coordinates: YelpCoordinates;
  transactions: string[];
  price?: string;
  location: YelpLocation;
  phone: string;
  display_phone: string;
  distance?: number;
}

export interface YelpBusinessDetails extends YelpBusiness {
  photos: string[];
  hours?: YelpHours[];
  is_claimed?: boolean;
}

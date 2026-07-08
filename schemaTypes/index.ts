import type {SchemaTypeDefinition} from 'sanity'

import blockContent from './objects/blockContent'
import faqItem from './objects/faqItem'
import participant from './objects/participant'
import seo from './objects/seo'
import specValue from './objects/specValue'
import addOn from './addOn'
import brand from './brand'
import booking from './booking'
import carouselSlide from './carouselSlide'
import category from './category'
import departure from './departure'
import destination from './destination'
import featuredProductItem from './featuredProductItem'
import homepage from './homepage'
import imageAsset from './imageAsset'
import itinerary from './itinerary'
import landingPage from './landingPage'
import product from './product'
import region from './region'
import scubaClass from './scubaClass'
import scubaClassReference from './scubaClassReference'
import seoPage from './seoPage'
import spec from './spec'
import staff from './staff'
import supplier from './supplier'
import swimLessonReference from './swimLessonReference'
import travelExplorerItem from './travelExplorerItem'
import travelTheme from './travelTheme'
import trip from './trip'
import tripInclusion from './tripInclusion'
import tripPackage from './tripPackage'
import useCase from './useCase'
import vessel from './vessel'
import location from './location'
import brandMedia from './brandMedia'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Shared (objects)
  seo as SchemaTypeDefinition,
  blockContent as SchemaTypeDefinition,
  specValue as SchemaTypeDefinition,
  faqItem as SchemaTypeDefinition,
  participant as SchemaTypeDefinition,
  featuredProductItem as SchemaTypeDefinition,
  travelExplorerItem as SchemaTypeDefinition,
  imageAsset as SchemaTypeDefinition,
  // Products (core commerce graph)
  product as SchemaTypeDefinition,
  category as SchemaTypeDefinition,
  brand as SchemaTypeDefinition,
  spec as SchemaTypeDefinition,
  supplier as SchemaTypeDefinition,
  useCase as SchemaTypeDefinition,
  // Scuba (SEO + education)
  seoPage as SchemaTypeDefinition,
  // Travel (CMS = canonical; WeTravel = booking projection)
  trip as SchemaTypeDefinition,
  departure as SchemaTypeDefinition,
  destination as SchemaTypeDefinition,
  region as SchemaTypeDefinition,
  travelTheme as SchemaTypeDefinition,
  vessel as SchemaTypeDefinition,
  tripPackage as SchemaTypeDefinition,
  addOn as SchemaTypeDefinition,
  itinerary as SchemaTypeDefinition,
  tripInclusion as SchemaTypeDefinition,
  booking as SchemaTypeDefinition,
  staff as SchemaTypeDefinition,
  // Site / pages
  homepage as SchemaTypeDefinition,
  landingPage as SchemaTypeDefinition,
  carouselSlide as SchemaTypeDefinition,
  // Scuba
  scubaClass as SchemaTypeDefinition,
  // Transitional references for swim/classes until canonical types exist
  scubaClassReference as SchemaTypeDefinition,
  swimLessonReference as SchemaTypeDefinition,
  // Operations
  location as SchemaTypeDefinition,
  brandMedia as SchemaTypeDefinition,
]

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Dolphin Scuba CMS',

  projectId: 'j53lv12c',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ─── SITE (pages + components) ───
            S.listItem()
              .title('Site')
              .child(
                S.list()
                  .title('Site')
                  .items([
                    S.listItem()
                      .title('Homepage')
                      .child(S.document().schemaType('homepage').documentId('homepage')),
                    S.listItem()
                      .title('Landing Pages')
                      .child(
                        S.list()
                          .title('Landing Pages')
                          .items([
                            S.listItem()
                              .title('Shop / Webstore')
                              .child(
                                S.document()
                                  .schemaType('landingPage')
                                  .documentId('landing-shop')
                              ),
                            S.listItem()
                              .title('Trips')
                              .child(
                                S.document()
                                  .schemaType('landingPage')
                                  .documentId('landing-trips')
                              ),
                            S.listItem()
                              .title('Scuba Classes')
                              .child(
                                S.document()
                                  .schemaType('landingPage')
                                  .documentId('landing-classes')
                              ),
                            S.listItem()
                              .title('Swim Lessons')
                              .child(
                                S.document()
                                  .schemaType('landingPage')
                                  .documentId('landing-swim')
                              ),
                          ])
                      ),
                    S.listItem()
                      .title('Carousel Slides')
                      .child(S.documentTypeList('carouselSlide').title('Carousel Slides')),
                    // Featured content: pools you pick from when editing Homepage (and landings)
                    S.listItem()
                      .title('Featured content (Homepage cards)')
                      .child(
                        S.list()
                          .title('Featured content')
                          .items([
                            S.listItem()
                              .title('Product References')
                              .child(S.documentTypeList('productReference').title('Product References')),
                            S.listItem()
                              .title('Trip References')
                              .child(S.documentTypeList('tripReference').title('Trip References')),
                            S.listItem()
                              .title('Scuba Class References')
                              .child(S.documentTypeList('scubaClassReference').title('Scuba Class References')),
                            S.listItem()
                              .title('Swim Lesson References')
                              .child(S.documentTypeList('swimLessonReference').title('Swim Lesson References')),
                          ])
                      ),
                    S.listItem()
                      .title('SEO Pages')
                      .child(S.documentTypeList('seoPage').title('SEO Pages')),
                  ])
              ),
            S.divider(),
            // ─── PRODUCTS (dynamic: /shop/[slug]) ───
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem().title('Products').child(S.documentTypeList('product').title('Products')),
                    S.listItem().title('Brands').child(S.documentTypeList('brand').title('Brands')),
                    S.listItem().title('Categories').child(S.documentTypeList('category').title('Categories')),
                    S.listItem().title('Specs').child(S.documentTypeList('spec').title('Specs')),
                    S.listItem().title('Suppliers').child(S.documentTypeList('supplier').title('Suppliers')),
                    S.listItem().title('Use Cases').child(S.documentTypeList('useCase').title('Use Cases')),
                  ])
              ),
            S.divider(),
            // ─── TRAVEL (CMS = canonical; WeTravel = booking) ───
            S.listItem()
              .title('Travel')
              .child(
                S.list()
                  .title('Travel')
                  .items([
                    S.listItem().title('Trips').child(S.documentTypeList('trip').title('Trips')),
                    S.listItem().title('Departures').child(S.documentTypeList('departure').title('Departures')),
                    S.listItem().title('Destinations').child(S.documentTypeList('destination').title('Destinations')),
                    S.listItem().title('Vessels / Resorts').child(S.documentTypeList('vessel').title('Vessels')),
                    S.listItem().title('Packages').child(S.documentTypeList('tripPackage').title('Packages')),
                    S.listItem().title('Add-ons').child(S.documentTypeList('addOn').title('Add-ons')),
                    S.listItem().title('Itineraries').child(S.documentTypeList('itinerary').title('Itineraries')),
                    S.listItem().title('Included / Not Included').child(S.documentTypeList('tripInclusion').title('Trip Inclusions')),
                    S.listItem().title('Bookings').child(S.documentTypeList('booking').title('Bookings (from WeTravel)')),
                  ])
              ),
            S.divider(),
            // ─── OPERATIONS (staff for Travel/Classes) ───
            S.listItem()
              .title('Operations')
              .child(
                S.list()
                  .title('Operations')
                  .items([
                    S.listItem().title('Staff').child(S.documentTypeList('staff').title('Staff')),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

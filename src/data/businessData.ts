/**
 * Business and related data for Cypress LocalLink directory.
 * Contains static businesses, categories, events, and deals.
 * User reviews are stored separately via useUserReviews (localStorage).
 */

export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  description: string;
  image: string;
  priceRange: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  phone?: string;
  tags?: string[];
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  date: string;
  text: string;
  rating: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
}

export interface Deal {
  id: string;
  business_id: string;
  title: string;
  description: string;
  discount: string;
  valid_until: string;
}

export const categories = [
  { name: "Food & Dining", slug: "Restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" },
  { name: "Retail", slug: "Retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
  { name: "Health & Fitness", slug: "Health & Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
  { name: "Services", slug: "Services", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" },
  { name: "Automotive", slug: "Automotive", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop" },
  { name: "Beauty & Spa", slug: "Beauty & Spa", image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop" },
  { name: "Non-Profits", slug: "Non-Profit", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop" },
  { name: "Entertainment", slug: "Entertainment", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=300&fit=crop" },
  { name: "Home & Garden", slug: "Home & Garden", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop" },
  { name: "Education", slug: "Education", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
];

export const businesses: Business[] = [
  // ── RESTAURANTS (20) ──
  { id: "biz_rest_001", name: "Ambriza Social Mexican Kitchen", category: "Restaurant", rating: 4.8, reviewCount: 487, address: "Towne Lake Boardwalk", description: "Authentic Mexican flavors with a modern twist and lakeside views.", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9691, lng: -95.6978, phone: "(281) 888-9999" },
  { id: "biz_rest_002", name: "The Union Kitchen", category: "Restaurant", rating: 4.8, reviewCount: 345, address: "Towne Lake Boardwalk", description: "Neighborhood favorite serving American classics for brunch, lunch, and dinner. Great patio seating.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9693, lng: -95.6975, phone: "(281) 123-4567" },
  { id: "biz_rest_003", name: "Crumbl Cookies", category: "Restaurant", rating: 4.9, reviewCount: 528, address: "Towne Lake Boardwalk", description: "The world's best cookies. Rotating menu of fresh baked gourmet cookies.", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9688, lng: -95.6981, phone: "(281) 555-0199" },
  { id: "biz_rest_004", name: "BBQ Pit Masters", category: "Restaurant", rating: 4.7, reviewCount: 16, address: "369 Smoke Ring Road", description: "Slow-smoked Texas BBQ. Brisket, ribs, sausage and all the fixings.", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9762, lng: -95.6438 },
  { id: "biz_rest_005", name: "Burger Barn", category: "Restaurant", rating: 4.5, reviewCount: 20, address: "789 Patty Lane", description: "Gourmet burgers made with local grass-fed beef. Craft shakes and loaded fries.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9766, lng: -95.6444 },
  { id: "biz_rest_006", name: "Mod Pizza", category: "Restaurant", rating: 4.3, reviewCount: 18, address: "Towne Lake Boardwalk", description: "Build your own artisan-style pizza with unlimited toppings.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9695, lng: -95.6973 },
  { id: "biz_rest_007", name: "Pho King Vietnamese", category: "Restaurant", rating: 4.6, reviewCount: 14, address: "234 Noodle Way", description: "Traditional Vietnamese pho and banh mi. Authentic family recipes since 1998.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9758, lng: -95.6432 },
  { id: "biz_rest_008", name: "Golden Dragon Chinese", category: "Restaurant", rating: 4.4, reviewCount: 22, address: "567 Dynasty Drive", description: "Cantonese and Szechuan cuisine. Dim sum on weekends.", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9788, lng: -95.6262 },
  { id: "biz_rest_009", name: "Sunrise Breakfast Café", category: "Restaurant", rating: 4.8, reviewCount: 31, address: "101 Morning Street", description: "Farm-fresh breakfast and brunch. Best pancakes in Cypress.", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.977, lng: -95.6449 },
  { id: "biz_rest_010", name: "Tuscany Italian Bistro", category: "Restaurant", rating: 4.6, reviewCount: 11, address: "445 Olive Garden Way", description: "Handmade pasta and wood-fired pizza. Romantic evening dining.", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.966, lng: -95.6503 },
  { id: "biz_rest_011", name: "Sushi Zen", category: "Restaurant", rating: 4.7, reviewCount: 19, address: "678 Pacific Blvd", description: "Premium sushi and sashimi. Omakase experience available.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9664, lng: -95.651 },
  { id: "biz_rest_012", name: "Taco Loco", category: "Restaurant", rating: 4.5, reviewCount: 27, address: "321 Fiesta Ave", description: "Authentic street tacos and fresh margaritas. Late night hours.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9656, lng: -95.6497 },
  { id: "biz_rest_013", name: "The Rustic Table", category: "Restaurant", rating: 4.8, reviewCount: 15, address: "890 Farm Road", description: "Farm-to-table dining with locally sourced ingredients. Seasonal menu.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9668, lng: -95.6515 },
  { id: "biz_rest_014", name: "Cypress Coffee Co.", category: "Restaurant", rating: 4.6, reviewCount: 35, address: "112 Bean Street", description: "Specialty coffee roasted in-house. Pastries, sandwiches, and cozy vibes.", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9792, lng: -95.6268 },
  { id: "biz_rest_015", name: "Wings & Things", category: "Restaurant", rating: 4.3, reviewCount: 21, address: "456 Buffalo Blvd", description: "50+ wing flavors. Sports bar with 30 screens.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9756, lng: -95.644 },
  { id: "biz_rest_016", name: "Mediterranean Grill", category: "Restaurant", rating: 4.5, reviewCount: 13, address: "789 Olive Lane", description: "Kebabs, hummus, falafel, and shawarma. Family-owned since 2005.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9652, lng: -95.6508 },
  { id: "biz_rest_017", name: "Sweet Treats Bakery", category: "Restaurant", rating: 4.9, reviewCount: 28, address: "234 Sugar Lane", description: "Custom cakes, cupcakes, and French pastries for every occasion.", image: "https://images.unsplash.com/photo-1486427944544-d2c246c4df4e?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.95, lng: -95.6455 },
  { id: "biz_rest_018", name: "Smokehouse Deli", category: "Restaurant", rating: 4.4, reviewCount: 17, address: "567 Sandwich Street", description: "Artisan deli sandwiches with house-smoked meats and fresh bread.", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9784, lng: -95.6256 },
  { id: "biz_rest_019", name: "India Palace", category: "Restaurant", rating: 4.6, reviewCount: 10, address: "890 Spice Road", description: "Traditional Indian cuisine with a modern twist. Lunch buffet daily.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9504, lng: -95.6462 },
  { id: "biz_rest_020", name: "Frozen Bliss Ice Cream", category: "Restaurant", rating: 4.7, reviewCount: 33, address: "123 Dessert Drive", description: "Handcrafted small-batch ice cream. Unique flavors rotating weekly.", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9796, lng: -95.6274 },

  // ── RETAIL (12) ──
  { id: "biz_ret_001", name: "The Book Corner", category: "Retail", rating: 4.9, reviewCount: 67, address: "789 Elm Street, Arts District", description: "Independent bookstore featuring local authors, rare finds, and weekly reading events. Coffee corner inside.", image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9672, lng: -95.65, phone: "(555) 345-6789" },
  { id: "biz_ret_002", name: "Cozy Corner Bookstore", category: "Retail", rating: 4.6, reviewCount: 9, address: "321 Reader Lane", description: "Independent bookstore with curated selection and cozy reading nooks.", image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9496, lng: -95.6448 },
  { id: "biz_ret_003", name: "Cypress Flower Market", category: "Retail", rating: 4.7, reviewCount: 16, address: "456 Bloom Street", description: "Fresh flowers, arrangements, and plants. Wedding and event floristry.", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.979, lng: -95.6248 },
  { id: "biz_ret_004", name: "Pet Paradise", category: "Retail", rating: 4.5, reviewCount: 22, address: "789 Furry Friend Lane", description: "Premium pet supplies, grooming, and adoption events. All natural foods.", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9764, lng: -95.6452 },
  { id: "biz_ret_005", name: "Tech Hub Electronics", category: "Retail", rating: 4.3, reviewCount: 18, address: "234 Circuit Ave", description: "Latest gadgets, computer repairs, and tech accessories.", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9658, lng: -95.652 },
  { id: "biz_ret_006", name: "Vintage Finds Antiques", category: "Retail", rating: 4.8, reviewCount: 8, address: "567 Heritage Blvd", description: "Curated antiques and vintage collectibles. Estate jewelry and furniture.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9508, lng: -95.6468 },
  { id: "biz_ret_007", name: "Outdoor Adventure Outfitters", category: "Retail", rating: 4.6, reviewCount: 14, address: "890 Trail Road", description: "Camping, hiking, and outdoor gear. Expert staff for trip planning.", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9768, lng: -95.643 },
  { id: "biz_ret_008", name: "Little Ones Children's Boutique", category: "Retail", rating: 4.7, reviewCount: 11, address: "123 Kiddo Street", description: "Adorable children's clothing, toys, and gifts. Locally curated brands.", image: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9785, lng: -95.6276 },
  { id: "biz_ret_009", name: "Green Thumb Garden Center", category: "Retail", rating: 4.5, reviewCount: 20, address: "456 Plant Way", description: "Native Texas plants, trees, and landscaping supplies. Expert garden advice.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9492, lng: -95.644 },
  { id: "biz_ret_010", name: "Cypress Sports & Collectibles", category: "Retail", rating: 4.4, reviewCount: 12, address: "789 Trophy Lane", description: "Sports memorabilia, trading cards, and fan gear for all Houston teams.", image: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0a56?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9512, lng: -95.6474 },
  { id: "biz_ret_011", name: "Stitch & Thread Fabrics", category: "Retail", rating: 4.6, reviewCount: 7, address: "234 Quilting Road", description: "Fine fabrics, sewing supplies, and quilting classes. Custom alterations.", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9666, lng: -95.6492 },
  { id: "biz_ret_012", name: "Cypress Wine & Spirits", category: "Retail", rating: 4.7, reviewCount: 25, address: "567 Vineyard Blvd", description: "Curated wine selection, craft spirits, and weekly tasting events.", image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9488, lng: -95.6455 },

  // ── HEALTH & FITNESS (10) ──
  { id: "biz_fit_001", name: "Club Pilates", category: "Health & Fitness", rating: 4.8, reviewCount: 156, address: "Towne Lake Boardwalk", description: "Premium reformer-based pilates training for all fitness levels. Restore your body and mind.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9689, lng: -95.6984, phone: "(281) 234-5678" },
  { id: "biz_fit_002", name: "Aqua Fitness Center", category: "Health & Fitness", rating: 4.4, reviewCount: 22, address: "222 Splash Lane", description: "Olympic-size pool, water aerobics, and swim lessons.", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9516, lng: -95.6462 },
  { id: "biz_fit_003", name: "CrossFit Cypress", category: "Health & Fitness", rating: 4.7, reviewCount: 15, address: "333 WOD Way", description: "High-intensity functional fitness. Experienced coaches, all skill levels.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9794, lng: -95.626 },
  { id: "biz_fit_004", name: "Yoga Garden Studio", category: "Health & Fitness", rating: 4.9, reviewCount: 26, address: "456 Zen Path", description: "Vinyasa, hot yoga, and meditation classes. Serene garden setting.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9644, lng: -95.6505 },
  { id: "biz_fit_005", name: "Iron Works Gym", category: "Health & Fitness", rating: 4.5, reviewCount: 30, address: "789 Muscle Blvd", description: "Full gym with free weights, machines, and personal training.", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9754, lng: -95.6435 },
  { id: "biz_fit_006", name: "Dance Fusion Studio", category: "Health & Fitness", rating: 4.6, reviewCount: 12, address: "234 Rhythm Road", description: "Zumba, hip-hop, ballet, and salsa classes for all ages.", image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9484, lng: -95.6448 },
  { id: "biz_fit_007", name: "Cypress Martial Arts", category: "Health & Fitness", rating: 4.7, reviewCount: 19, address: "567 Dojo Drive", description: "Karate, Brazilian Jiu-Jitsu, and self-defense. Kids and adult programs.", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9782, lng: -95.6265 },
  { id: "biz_fit_008", name: "Cycle Bar Cypress", category: "Health & Fitness", rating: 4.5, reviewCount: 14, address: "890 Spin Street", description: "Premium indoor cycling. High-energy classes with performance tracking.", image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9662, lng: -95.6528 },
  { id: "biz_fit_009", name: "Chiropractic Wellness Center", category: "Health & Fitness", rating: 4.6, reviewCount: 17, address: "123 Spine Way", description: "Chiropractic adjustments, sports rehab, and wellness programs.", image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9504, lng: -95.6435 },
  { id: "biz_fit_010", name: "Mind & Body Wellness", category: "Health & Fitness", rating: 4.8, reviewCount: 9, address: "456 Harmony Lane", description: "Holistic health services. Acupuncture, nutrition, and wellness coaching.", image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.952, lng: -95.648 },

  // ── BEAUTY & SPA (8) ──
  { id: "biz_beauty_001", name: "Bella Hair Studio", category: "Beauty & Spa", rating: 4.8, reviewCount: 156, address: "567 Fashion Ave", description: "Full-service hair salon offering cuts, color, styling, and spa treatments. Award-winning stylists.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9798, lng: -95.6253, phone: "(555) 567-8901" },
  { id: "biz_beauty_002", name: "Zen Day Spa", category: "Beauty & Spa", rating: 4.7, reviewCount: 11, address: "890 Serenity Blvd", description: "Relaxation and rejuvenation. Massages, facials, and body treatments.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9492, lng: -95.6468 },
  { id: "biz_beauty_003", name: "Nails by Nicole", category: "Beauty & Spa", rating: 4.6, reviewCount: 23, address: "123 Polish Place", description: "Manicures, pedicures, and nail art. Clean, relaxing atmosphere.", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9676, lng: -95.6512 },
  { id: "biz_beauty_004", name: "Glow Skin Bar", category: "Beauty & Spa", rating: 4.8, reviewCount: 10, address: "456 Radiance Road", description: "Advanced skincare treatments. Facials, peels, and microneedling.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9508, lng: -95.644 },
  { id: "biz_beauty_005", name: "The Barber Lounge", category: "Beauty & Spa", rating: 4.7, reviewCount: 28, address: "789 Clipper Blvd", description: "Classic barbershop experience. Straight razor shaves and craft cuts.", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9773, lng: -95.6442 },
  { id: "biz_beauty_006", name: "Lash & Brow Studio", category: "Beauty & Spa", rating: 4.5, reviewCount: 14, address: "234 Beauty Lane", description: "Eyelash extensions, brow shaping, and lash lifts. Certified technicians.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9648, lng: -95.6498 },
  { id: "biz_beauty_007", name: "Serenity Float Spa", category: "Beauty & Spa", rating: 4.9, reviewCount: 6, address: "567 Calm Court", description: "Sensory deprivation float tanks. Deep relaxation and recovery.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6b?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9787, lng: -95.6278 },
  { id: "biz_beauty_008", name: "Color Me Beautiful Salon", category: "Beauty & Spa", rating: 4.6, reviewCount: 19, address: "890 Style Street", description: "Hair color specialists. Balayage, highlights, and vivid color experts.", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.948, lng: -95.646 },

  // ── AUTOMOTIVE (7) ──
  { id: "biz_auto_001", name: "Premier Auto Care", category: "Automotive", rating: 4.6, reviewCount: 112, address: "321 Industrial Blvd", description: "Trusted auto repair and maintenance. ASE certified mechanics, fair prices, and honest service since 1998.", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9396, lng: -95.599, phone: "(555) 456-7890" },
  { id: "biz_auto_002", name: "Cypress Auto Care", category: "Automotive", rating: 4.6, reviewCount: 32, address: "123 Motor Lane", description: "Full-service auto repair and maintenance. ASE certified mechanics.", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.94, lng: -95.5998 },
  { id: "biz_auto_003", name: "Express Oil Change", category: "Automotive", rating: 4.3, reviewCount: 45, address: "456 Quick Lube Drive", description: "Fast oil changes and basic maintenance. No appointment needed.", image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9793, lng: -95.6242 },
  { id: "biz_auto_004", name: "Sparkle Car Wash", category: "Automotive", rating: 4.4, reviewCount: 38, address: "789 Clean Street", description: "Full-service car wash and detailing. Monthly unlimited plans available.", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9392, lng: -95.5982 },
  { id: "biz_auto_005", name: "Tire Town", category: "Automotive", rating: 4.5, reviewCount: 21, address: "234 Rubber Road", description: "New and used tires. Alignments, balancing, and brake service.", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.976, lng: -95.6454 },
  { id: "biz_auto_006", name: "Elite Auto Glass", category: "Automotive", rating: 4.6, reviewCount: 12, address: "567 Windshield Way", description: "Windshield repair and replacement. Mobile service available.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9654, lng: -95.6535 },
  { id: "biz_auto_007", name: "Custom Wheels & Audio", category: "Automotive", rating: 4.7, reviewCount: 9, address: "890 Chrome Blvd", description: "Custom wheels, audio systems, and vehicle accessories.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9404, lng: -95.5975 },

  // ── SERVICES (10) ──
  { id: "biz_svc_001", name: "Ace Hardware & Supply", category: "Services", rating: 4.5, reviewCount: 15, address: "444 Builder Road", description: "Your neighborhood hardware store. Tools, paint, plumbing supplies, and helpful advice.", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9388, lng: -95.6005 },
  { id: "biz_svc_002", name: "Bright Smile Dentistry", category: "Services", rating: 4.4, reviewCount: 19, address: "555 Medical Center Dr", description: "Family dentistry with a gentle touch. Cleanings, cosmetic, and orthodontics.", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9765, lng: -95.6428 },
  { id: "biz_svc_003", name: "Cypress Tax Professionals", category: "Services", rating: 4.7, reviewCount: 11, address: "123 Finance Way", description: "Personal and business tax preparation. Year-round accounting services.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9408, lng: -95.599 },
  { id: "biz_svc_004", name: "Print & Ship Center", category: "Services", rating: 4.3, reviewCount: 16, address: "456 Postal Plaza", description: "Printing, copying, shipping, and mailbox rental. Notary services.", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.9384, lng: -95.5975 },
  { id: "biz_svc_005", name: "Cypress Veterinary Clinic", category: "Services", rating: 4.8, reviewCount: 27, address: "789 Pet Care Lane", description: "Compassionate veterinary care. Wellness exams, surgery, and boarding.", image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.967, lng: -95.6488 },
  { id: "biz_svc_006", name: "Legal Eagle Law Firm", category: "Services", rating: 4.6, reviewCount: 8, address: "234 Justice Drive", description: "Family law, estate planning, and real estate closings. Free consultations.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9412, lng: -95.5998 },
  { id: "biz_svc_007", name: "Cypress Cleaners", category: "Services", rating: 4.4, reviewCount: 24, address: "567 Fresh Street", description: "Dry cleaning, laundry, and alterations. Same-day service available.", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop", priceRange: "$", isOpen: true, lat: 29.978, lng: -95.627 },
  { id: "biz_svc_008", name: "Home Shield Insurance", category: "Services", rating: 4.5, reviewCount: 13, address: "890 Coverage Road", description: "Home, auto, and life insurance. Local agent with personalized service.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.938, lng: -95.5987 },
  { id: "biz_svc_009", name: "Cypress Plumbing Pros", category: "Services", rating: 4.7, reviewCount: 20, address: "123 Pipe Way", description: "24/7 emergency plumbing. Residential and commercial. Licensed and insured.", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9416, lng: -95.598 },
  { id: "biz_svc_010", name: "Sparks Electric Co.", category: "Services", rating: 4.6, reviewCount: 15, address: "456 Watt Drive", description: "Residential electrical services. Panel upgrades, lighting, and smart home.", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9376, lng: -95.5994 },

  // ── NON-PROFITS (8) ──
  { id: "biz_np_001", name: "Cypress Community Food Bank", category: "Non-Profit", rating: 4.9, reviewCount: 89, address: "100 Community Way", description: "Free food pantry and emergency groceries for Cypress residents in need. Volunteer-run, open weekly.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9524, lng: -95.6475, phone: "(281) 555-0100" },
  { id: "biz_np_002", name: "Cypress Youth Foundation", category: "Non-Profit", rating: 4.8, reviewCount: 14, address: "234 Youth Way", description: "After-school programs, mentoring, and scholarships for Cypress youth.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9392, lng: -95.597 },
  { id: "biz_np_003", name: "Habitat for Humanity Cypress", category: "Non-Profit", rating: 4.9, reviewCount: 18, address: "567 Build Hope Lane", description: "Building affordable homes and community. Volunteer and donate.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.942, lng: -95.5995 },
  { id: "biz_np_004", name: "Cypress Animal Rescue", category: "Non-Profit", rating: 4.7, reviewCount: 25, address: "890 Rescue Road", description: "Animal rescue and adoption. Foster programs and community education.", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9646, lng: -95.6516 },
  { id: "biz_np_005", name: "Senior Services Center", category: "Non-Profit", rating: 4.8, reviewCount: 11, address: "123 Golden Years Blvd", description: "Activities, meals, and support services for seniors. Transportation available.", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9372, lng: -95.5982 },
  { id: "biz_np_006", name: "Cypress Literacy Council", category: "Non-Profit", rating: 4.6, reviewCount: 8, address: "456 Reading Road", description: "Adult literacy programs, ESL classes, and GED preparation.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9396, lng: -95.601 },
  { id: "biz_np_007", name: "Green Cypress Environmental", category: "Non-Profit", rating: 4.7, reviewCount: 9, address: "789 Earth Way", description: "Environmental conservation, tree planting, and community clean-ups.", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9775, lng: -95.6446 },
  { id: "biz_np_008", name: "Cypress Arts Council", category: "Non-Profit", rating: 4.5, reviewCount: 12, address: "234 Creative Blvd", description: "Promoting local arts through exhibitions, workshops, and community events.", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop", priceRange: "Free", isOpen: true, lat: 29.9408, lng: -95.5965 },

  // ── ENTERTAINMENT (6) ──
  { id: "biz_ent_001", name: "Cypress Bowling Alley", category: "Entertainment", rating: 4.4, reviewCount: 29, address: "123 Strike Lane", description: "32 lanes, arcade games, and cosmic bowling nights. Party packages available.", image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.962, lng: -95.616 },
  { id: "biz_ent_002", name: "Escape Room Cypress", category: "Entertainment", rating: 4.7, reviewCount: 16, address: "456 Mystery Way", description: "Immersive escape room experiences. 6 themed rooms for all skill levels.", image: "https://images.unsplash.com/photo-1616161560417-66d4db5892ec?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9624, lng: -95.6168 },
  { id: "biz_ent_003", name: "Cypress Cinema 12", category: "Entertainment", rating: 4.5, reviewCount: 42, address: "789 Movie Blvd", description: "Luxury recliner seating, IMAX, and dine-in theater experience.", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9616, lng: -95.6152 },
  { id: "biz_ent_004", name: "Jump Zone Trampoline Park", category: "Entertainment", rating: 4.3, reviewCount: 35, address: "234 Bounce Drive", description: "Indoor trampoline park, ninja course, and foam pit. Birthday parties.", image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9628, lng: -95.6175 },
  { id: "biz_ent_005", name: "TopGolf Cypress", category: "Entertainment", rating: 4.6, reviewCount: 50, address: "567 Tee Time Road", description: "High-tech driving range with games, food, and drinks. Year-round fun.", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9612, lng: -95.6148 },
  { id: "biz_ent_006", name: "Paint & Sip Studio", category: "Entertainment", rating: 4.8, reviewCount: 13, address: "890 Canvas Court", description: "Guided painting classes with wine and cocktails. Private events welcome.", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9632, lng: -95.6182 },

  // ── HOME & GARDEN (6) ──
  { id: "biz_hg_001", name: "Cypress Lumber & Supply", category: "Home & Garden", rating: 4.5, reviewCount: 14, address: "123 Timber Trail", description: "Quality lumber, building materials, and contractor supplies.", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9636, lng: -95.619 },
  { id: "biz_hg_002", name: "Dream Kitchens & Bath", category: "Home & Garden", rating: 4.8, reviewCount: 10, address: "456 Remodel Road", description: "Kitchen and bathroom remodeling. Custom cabinets and countertops.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.964, lng: -95.6195 },
  { id: "biz_hg_003", name: "Pool & Patio Pros", category: "Home & Garden", rating: 4.6, reviewCount: 18, address: "789 Backyard Blvd", description: "Pool construction, maintenance, and patio design. Outdoor living experts.", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9628, lng: -95.6165 },
  { id: "biz_hg_004", name: "Cypress Landscape Design", category: "Home & Garden", rating: 4.7, reviewCount: 12, address: "234 Garden Path", description: "Custom landscape design, installation, and maintenance.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9616, lng: -95.6156 },
  { id: "biz_hg_005", name: "Smart Home Solutions", category: "Home & Garden", rating: 4.5, reviewCount: 8, address: "567 Tech Way", description: "Home automation, security systems, and smart lighting installation.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9624, lng: -95.6175 },
  { id: "biz_hg_006", name: "Furniture Gallery Cypress", category: "Home & Garden", rating: 4.4, reviewCount: 15, address: "890 Décor Drive", description: "Quality home furniture and decor. Living rooms, bedrooms, and dining.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9644, lng: -95.6185 },

  // ── EDUCATION (5) ──
  { id: "biz_edu_001", name: "Kumon Learning Center", category: "Education", rating: 4.5, reviewCount: 20, address: "123 Scholar Way", description: "Math and reading enrichment programs for children. Self-paced learning.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9692, lng: -95.6968 },
  { id: "biz_edu_002", name: "Cypress Music Academy", category: "Education", rating: 4.8, reviewCount: 12, address: "456 Melody Lane", description: "Private music lessons. Piano, guitar, violin, drums, and voice.", image: "https://images.unsplash.com/photo-1514119412350-e174d90d585e?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9705, lng: -95.6950 },
  { id: "biz_edu_003", name: "Code Kids Academy", category: "Education", rating: 4.7, reviewCount: 9, address: "789 Binary Blvd", description: "Coding classes for kids ages 6-18. Robotics, game design, and web development.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9672, lng: -95.6995 },
  { id: "biz_edu_004", name: "Little Explorers Montessori", category: "Education", rating: 4.9, reviewCount: 16, address: "234 Discovery Drive", description: "Montessori preschool and kindergarten. Nurturing environment for ages 2-6.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop", priceRange: "$$$", isOpen: true, lat: 29.9718, lng: -95.6932 },
  { id: "biz_edu_005", name: "Cypress Tutoring Center", category: "Education", rating: 4.6, reviewCount: 14, address: "567 Study Street", description: "SAT/ACT prep, subject tutoring, and college counseling.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", priceRange: "$$", isOpen: true, lat: 29.9660, lng: -95.7012 },
];

export const reviews: Review[] = [
  { id: "r1", author: "Sarah Johnson", initials: "SJ", date: "Oct 12, 2024", text: "The sunset views at the Boardwalk are unmatched. Ambriza is our go-to spot!", rating: 5 },
  { id: "r2", author: "Mike Davis", initials: "MD", date: "Nov 05, 2024", text: "Love the live music on weekends. Great atmosphere for the whole family.", rating: 5 },
  { id: "r3", author: "Emily Chen", initials: "EC", date: "Dec 01, 2024", text: "Club Pilates changed my life. The instructors are amazing.", rating: 5 },
  { id: "r4", author: "David Wilson", initials: "DW", date: "Jan 15, 2025", text: "Great place to hang out, though parking can get busy on Friday nights.", rating: 4 },
  { id: "r5", author: "Jessica Taylor", initials: "JT", date: "Feb 02, 2025", text: "Crumbl Cookies is dangerous! In the best way possible.", rating: 5 },
  { id: "r6", author: "Robert Martinez", initials: "RM", date: "Feb 20, 2025", text: "The green space is perfect for kids to run around while we eat.", rating: 5 },
  { id: "r7", author: "Amanda White", initials: "AW", date: "Mar 10, 2025", text: "Union Kitchen never disappoints. The patio seating is lovely.", rating: 5 },
  { id: "r8", author: "Chris Brown", initials: "CB", date: "Mar 25, 2025", text: "Nice variety of shops and restaurants. Always clean and safe.", rating: 4 },
  { id: "r9", author: "Jennifer Lee", initials: "JL", date: "Apr 05, 2025", text: "The holiday events here are spectacular. My kids love it.", rating: 5 },
  { id: "r10", author: "Sarah M.", initials: "SM", date: "Jan 10, 2025", text: "Absolutely fantastic experience! Will definitely come back.", rating: 5 },
  { id: "r11", author: "John D.", initials: "JD", date: "Feb 15, 2025", text: "Great service and friendly staff. Highly recommended!", rating: 5 },
  { id: "r12", author: "Emily R.", initials: "ER", date: "Mar 01, 2025", text: "The Cypress Community Food Bank does amazing work for our community.", rating: 5 },
];

export const events: Event[] = [
  { id: "evt_001", title: "Downtown Farmers Market", date: "2026-03-01", day: "1", month: "Mar", time: "8:00 AM", location: "Main Street Plaza" },
  { id: "evt_002", title: "Small Business Networking Mixer", date: "2026-03-05", day: "5", month: "Mar", time: "6:00 PM", location: "Community Center" },
  { id: "evt_003", title: "Outdoor Movie Night", date: "2026-03-08", day: "8", month: "Mar", time: "8:00 PM", location: "Central Park" },
  { id: "evt_004", title: "Community Cleanup Day", date: "2026-03-12", day: "12", month: "Mar", time: "9:00 AM", location: "Various Locations" },
  { id: "evt_005", title: "Local Art Walk", date: "2026-03-03", day: "3", month: "Mar", time: "5:00 PM", location: "Arts District" },
  { id: "evt_006", title: "Food Truck Festival", date: "2026-03-19", day: "19", month: "Mar", time: "11:00 AM", location: "Riverside Park" },
  { id: "evt_007", title: "Yoga in the Park", date: "2026-02-28", day: "28", month: "Feb", time: "7:00 AM", location: "Sunrise Park" },
  { id: "evt_008", title: "Kids Coding Workshop", date: "2026-03-10", day: "10", month: "Mar", time: "10:00 AM", location: "Cypress Public Library" },
  { id: "evt_009", title: "Live Music at the Bandshell", date: "2026-03-04", day: "4", month: "Mar", time: "7:00 PM", location: "Memorial Bandshell" },
  { id: "evt_010", title: "Pet Adoption Event", date: "2026-03-06", day: "6", month: "Mar", time: "10:00 AM", location: "Happy Paws Pet Store" },
  { id: "evt_011", title: "Community Blood Drive", date: "2026-03-02", day: "2", month: "Mar", time: "9:00 AM", location: "Cypress Community Center" },
  { id: "evt_012", title: "Neighborhood Watch Meeting", date: "2026-03-07", day: "7", month: "Mar", time: "7:00 PM", location: "Cypress Town Hall" },
  { id: "evt_013", title: "Library Story Time & Crafts", date: "2026-03-01", day: "1", month: "Mar", time: "10:30 AM", location: "Cypress Public Library" },
];

// Deals (subset for display)
export const deals: Deal[] = [
  { id: "deal_001", business_id: "biz_rest_001", title: "20% Off Breakfast", description: "Start your day right! Get 20% off any breakfast item before 10 AM.", discount: "20%", valid_until: "2026-04-01" },
  { id: "deal_002", business_id: "biz_fit_001", title: "First Month Free", description: "New members get their first month absolutely free. No commitment required.", discount: "100% First Month", valid_until: "2026-04-15" },
  { id: "deal_003", business_id: "biz_ret_001", title: "Buy 2 Get 1 Free", description: "Purchase any two books and get a third book of equal or lesser value free.", discount: "Buy 2 Get 1", valid_until: "2026-03-15" },
  { id: "deal_004", business_id: "biz_auto_001", title: "$25 Off Oil Change", description: "Full synthetic oil change at a discounted price. Includes filter and inspection.", discount: "$25 Off", valid_until: "2026-04-30" },
  { id: "deal_005", business_id: "biz_beauty_001", title: "15% Off First Visit", description: "New clients receive 15% off any service. Haircuts, color, or spa treatments.", discount: "15%", valid_until: "2026-05-01" },
  { id: "deal_006", business_id: "biz_rest_002", title: "Family Deal - $5 Off", description: "Get $5 off any large pizza with purchase of a family meal deal.", discount: "$5 Off", valid_until: "2026-03-20" },
  { id: "deal_007", business_id: "biz_np_001", title: "Volunteer & Donate", description: "Support the Cypress Community Food Bank. Volunteer hours and donations welcome.", discount: "Community", valid_until: "2026-12-31" },
  { id: "deal_008", business_id: "biz_np_004", title: "Adoption Fee Waived", description: "Adoption fees waived this month for cats and dogs. Find your new best friend!", discount: "Free Adoption", valid_until: "2026-03-31" },
];

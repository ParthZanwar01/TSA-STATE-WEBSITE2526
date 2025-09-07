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

export const categories = [
  { name: "Food & Dining", icon: "🍽️", slug: "Restaurant" },
  { name: "Retail", icon: "🛍️", slug: "Retail" },
  { name: "Health & Fitness", icon: "💪", slug: "Health & Fitness" },
  { name: "Services", icon: "🔧", slug: "Services" },
  { name: "Automotive", icon: "🚗", slug: "Automotive" },
  { name: "Beauty & Spa", icon: "💆", slug: "Beauty & Spa" },
];

export const businesses: Business[] = [
  {
    id: "biz_rest_001",
    name: "Ambriza Social Mexican Kitchen",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 8,
    address: "Towne Lake Boardwalk",
    description: "Authentic Mexican flavors with a modern twist and lakeside views.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9691,
    lng: -95.6977,
  },
  {
    id: "biz_rest_002",
    name: "The Union Kitchen",
    category: "Restaurant",
    rating: 4.7,
    reviewCount: 12,
    address: "Towne Lake Boardwalk",
    description: "American comfort food with a Southern flair. Brunch favorites and craft cocktails.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9695,
    lng: -95.6980,
  },
  {
    id: "biz_rest_003",
    name: "Crumbl Cookies",
    category: "Restaurant",
    rating: 4.9,
    reviewCount: 24,
    address: "Towne Lake Boardwalk",
    description: "The world's best cookies. Rotating menu of fresh baked gourmet cookies.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop",
    priceRange: "$",
    isOpen: true,
    lat: 29.9688,
    lng: -95.6973,
  },
  {
    id: "biz_rest_004",
    name: "BBQ Pit Masters",
    category: "Restaurant",
    rating: 4.7,
    reviewCount: 16,
    address: "369 Smoke Ring Road",
    description: "Slow-smoked Texas BBQ. Brisket, ribs, sausage and all the fixings.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9710,
    lng: -95.6950,
  },
  {
    id: "biz_rest_005",
    name: "Burger Barn",
    category: "Restaurant",
    rating: 4.5,
    reviewCount: 20,
    address: "789 Patty Lane",
    description: "Gourmet burgers made with local grass-fed beef. Craft shakes and loaded fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9675,
    lng: -95.6990,
  },
  {
    id: "biz_fit_001",
    name: "Club Pilates",
    category: "Health & Fitness",
    rating: 4.8,
    reviewCount: 18,
    address: "Towne Lake Boardwalk",
    description: "Full-body Pilates workout. Reformer classes for all levels.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9692,
    lng: -95.6982,
  },
  {
    id: "biz_fit_002",
    name: "Aqua Fitness Center",
    category: "Health & Fitness",
    rating: 4.4,
    reviewCount: 22,
    address: "222 Splash Lane",
    description: "Olympic-size pool, water aerobics, and swim lessons.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9700,
    lng: -95.6960,
  },
  {
    id: "biz_ret_001",
    name: "Artisan Crafts Market",
    category: "Retail",
    rating: 4.8,
    reviewCount: 13,
    address: "678 Maker Way",
    description: "Handmade crafts from local artisans. Pottery, textiles, jewelry, and home decor.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9685,
    lng: -95.6965,
  },
  {
    id: "biz_ret_002",
    name: "Cozy Corner Bookstore",
    category: "Retail",
    rating: 4.6,
    reviewCount: 9,
    address: "321 Reader Lane",
    description: "Independent bookstore with a curated selection and cozy reading nooks.",
    image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&h=400&fit=crop",
    priceRange: "$",
    isOpen: true,
    lat: 29.9678,
    lng: -95.6985,
  },
  {
    id: "biz_auto_001",
    name: "Classic Car Restoration",
    category: "Automotive",
    rating: 4.9,
    reviewCount: 7,
    address: "876 Vintage Way",
    description: "Vintage car restoration specialists. Full restorations, parts sourcing, and maintenance.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    priceRange: "$$$",
    isOpen: true,
    lat: 29.9715,
    lng: -95.6945,
  },
  {
    id: "biz_beauty_001",
    name: "Bella Hair Studio",
    category: "Beauty & Spa",
    rating: 4.8,
    reviewCount: 15,
    address: "567 Fashion Ave",
    description: "Full-service salon. Cuts, color, extensions, and bridal styling.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9680,
    lng: -95.6970,
  },
  {
    id: "biz_beauty_002",
    name: "Zen Day Spa",
    category: "Beauty & Spa",
    rating: 4.7,
    reviewCount: 11,
    address: "890 Serenity Blvd",
    description: "Relaxation and rejuvenation. Massages, facials, and body treatments.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    priceRange: "$$$",
    isOpen: true,
    lat: 29.9705,
    lng: -95.6955,
  },
  {
    id: "biz_svc_001",
    name: "Ace Hardware & Supply",
    category: "Services",
    rating: 4.5,
    reviewCount: 15,
    address: "444 Builder Road",
    description: "Your neighborhood hardware store. Tools, paint, plumbing supplies, and helpful advice.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9698,
    lng: -95.6940,
  },
  {
    id: "biz_svc_002",
    name: "Bright Smile Dentistry",
    category: "Services",
    rating: 4.4,
    reviewCount: 19,
    address: "555 Medical Center Dr",
    description: "Family dentistry with a gentle touch. Cleanings, cosmetic, and orthodontics.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
    priceRange: "$$",
    isOpen: true,
    lat: 29.9720,
    lng: -95.6935,
  },
  {
    id: "biz_support_001",
    name: "Cypress Community Food Bank",
    category: "Services",
    rating: 4.9,
    reviewCount: 30,
    address: "100 Community Way",
    description: "Free food pantry and emergency groceries for Cypress residents in need.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
    priceRange: "Free",
    isOpen: true,
    lat: 29.9670,
    lng: -95.7000,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sarah Johnson",
    initials: "SJ",
    date: "Oct 12, 2023",
    text: "The sunset views at the Boardwalk are unmatched. Ambriza is our go-to spot!",
    rating: 5,
  },
  {
    id: "r2",
    author: "Mike Davis",
    initials: "MD",
    date: "Nov 05, 2023",
    text: "Love the live music on weekends. Great atmosphere for the whole family.",
    rating: 5,
  },
  {
    id: "r3",
    author: "Emily Chen",
    initials: "EC",
    date: "Dec 01, 2023",
    text: "Club Pilates changed my life. The instructors are amazing.",
    rating: 5,
  },
  {
    id: "r4",
    author: "David Wilson",
    initials: "DW",
    date: "Jan 15, 2024",
    text: "Great place to hang out, though parking can get busy on Friday nights.",
    rating: 4,
  },
  {
    id: "r5",
    author: "Jessica Taylor",
    initials: "JT",
    date: "Feb 02, 2024",
    text: "Crumbl Cookies is dangerous! In the best way possible.",
    rating: 5,
  },
  {
    id: "r6",
    author: "Robert Martinez",
    initials: "RM",
    date: "Feb 20, 2024",
    text: "The green space is perfect for kids to run around while we eat.",
    rating: 5,
  },
  {
    id: "r7",
    author: "Amanda White",
    initials: "AW",
    date: "Mar 10, 2024",
    text: "Union Kitchen never disappoints. The patio seating is lovely.",
    rating: 5,
  },
  {
    id: "r8",
    author: "Chris Brown",
    initials: "CB",
    date: "Mar 25, 2024",
    text: "Nice variety of shops and restaurants. Always clean and safe.",
    rating: 4,
  },
  {
    id: "r9",
    author: "Jennifer Lee",
    initials: "JL",
    date: "Apr 05, 2024",
    text: "The holiday events here are spectacular. My kids love it.",
    rating: 5,
  },
];

export const events: Event[] = [
  { id: "e1", title: "Library Story Time & Crafts", date: "2026-02-24", day: "24", month: "Feb", time: "10:30 AM", location: "Cypress Public Library" },
  { id: "e2", title: "Yoga in the Park", date: "2026-02-25", day: "25", month: "Feb", time: "7:00 AM", location: "Sunrise Park" },
  { id: "e3", title: "Downtown Farmers Market", date: "2026-02-26", day: "26", month: "Feb", time: "8:00 AM", location: "Main Street Plaza" },
  { id: "e4", title: "Community Blood Drive", date: "2026-02-27", day: "27", month: "Feb", time: "9:00 AM", location: "Cypress Community Center" },
  { id: "e5", title: "Local Art Walk", date: "2026-02-28", day: "28", month: "Feb", time: "5:00 PM", location: "Arts District" },
  { id: "e6", title: "Live Music at the Bandshell", date: "2026-03-01", day: "1", month: "Mar", time: "7:00 PM", location: "Memorial Bandshell" },
];

// Mock data for GTTZ Innovations website

// SA local number 064 509 5167 -> international format for WhatsApp
export const WHATSAPP_NUMBER = '27645095167';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi GTTZ Innovations, I'd like to enquire about your services."
)}`;

export const COMPANY = {
  name: 'GTTZ Innovations',
  tagline: 'Building Your Vision with Excellence',
  description:
    'GTTZ Innovations delivers comprehensive construction, engineering and consultancy services with unmatched quality and professionalism.',
  logo: 'https://customer-assets.emergentagent.com/job_4d90888c-dc10-421c-95ff-6c5957c2ea69/artifacts/qaotepxv_ChatGPT_Image_May_18__2026__09_20_14_PM-removebg-preview.png',
  phone: '064 509 5167',
  emails: ['info@gttzinnovations.com', 'zmasilela@gttzinnovations.com'],
  address: {
    line1: 'Lombardy Office Park',
    line2: 'Pretoria East',
    line3: 'South Africa',
  },
  hours: {
    weekdays: 'Mon - Fri: 7:00 AM - 6:00 PM',
    saturday: 'Sat: 8:00 AM - 2:00 PM',
    sunday: 'Sun: Closed',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export const VALUES = [
  { title: 'Quality Excellence', desc: 'Never compromising on quality of work and materials.', icon: 'Award' },
  { title: 'Reliability', desc: 'Delivering on time with professional integrity.', icon: 'ShieldCheck' },
  { title: 'Customer Focus', desc: 'Your satisfaction is our priority.', icon: 'Users' },
  { title: 'Innovation', desc: 'Embracing new technologies for better results.', icon: 'Lightbulb' },
];

export const SERVICES = [
  {
    id: 'general-building',
    title: 'General Building',
    desc: 'Complete construction solutions from foundation to finish.',
    icon: 'Building2',
    image:
      'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHw0fHxidWlsZGluZ3xlbnwwfHx8fDE3ODA0Mjk5NTB8MA&ixlib=rb-4.1.0&q=85',
    features: ['New construction', 'Renovations', 'Extensions', 'Repairs'],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    desc: 'Professional electrical installations and repairs.',
    icon: 'Zap',
    image:
      'https://images.unsplash.com/photo-1635335874521-7987db781153?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxlbGVjdHJpY2FsfGVufDB8fHx8MTc4MDQyOTk1MHww&ixlib=rb-4.1.0&q=85',
    features: ['Installations', 'Wiring', 'Circuit upgrades', 'Lighting'],
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    desc: 'Expert plumbing services for all your needs.',
    icon: 'Wrench',
    image:
      'https://images.unsplash.com/photo-1676210134188-4c05dd172f89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwbHVtYmluZ3xlbnwwfHx8fDE3ODA0Mjk5NTB8MA&ixlib=rb-4.1.0&q=85',
    features: ['Pipe installations', 'Leak repair', 'Bathroom plumbing', 'Drainage'],
  },
  {
    id: 'tiling',
    title: 'Tiling',
    desc: 'Premium tiling solutions with attention to detail.',
    icon: 'Grid3x3',
    image:
      'https://images.unsplash.com/photo-1551893478-d726eaf0442c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwyfHx0aWxpbmd8ZW58MHx8fHwxNzgwNDI5OTUwfDA&ixlib=rb-4.1.0&q=85',
    features: ['Floor tiling', 'Wall tiling', 'Designer patterns', 'Outdoor tiling'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    desc: 'End-to-end management of your construction project.',
    icon: 'ClipboardList',
    image:
      'https://images.unsplash.com/photo-1608303588026-884930af2559?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBwbGFubmluZ3xlbnwwfHx8fDE3OTA2OTYxNjJ8MA&ixlib=rb-4.1.0&q=85',
    features: ['Planning & scheduling', 'Budget control', 'Site supervision', 'Reporting'],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    desc: 'Structural, civil and mechanical engineering expertise.',
    icon: 'Ruler',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludHxlbnwwfHx8fDE3OTA2OTYxNTZ8MA&ixlib=rb-4.1.0&q=85',
    features: ['Structural design', 'Civil works', 'CAD drafting', 'Feasibility studies'],
  },
  {
    id: 'geotechnical',
    title: 'Geotechnical Reports',
    desc: 'Site investigation and detailed geotechnical analysis.',
    icon: 'Mountain',
    image:
      'https://images.unsplash.com/photo-1580420232349-3eefa50d2423?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnZW90ZWNobmljYWwlMjBkcmlsbGluZ3xlbnwwfHx8fDE3OTA2OTYxNjJ8MA&ixlib=rb-4.1.0&q=85',
    features: ['Soil testing', 'Borehole drilling', 'Slope stability', 'Foundation advice'],
  },
];

export const WHY_CHOOSE_US = [
  { title: 'Proven Excellence', desc: '15+ years with 500+ completed projects.', icon: 'Trophy' },
  { title: 'Quality Guarantee', desc: 'Comprehensive warranties on all work.', icon: 'BadgeCheck' },
  { title: 'On-Time Delivery', desc: 'Projects completed on schedule.', icon: 'Clock' },
  { title: 'Fair Pricing', desc: 'Transparent quotes, no hidden costs.', icon: 'Tag' },
  { title: 'Expert Team', desc: 'Certified and experienced professionals.', icon: 'HardHat' },
  { title: 'Full Service', desc: 'Complete solutions under one roof.', icon: 'Layers' },
  { title: 'Licensed & Insured', desc: 'Fully bonded for your protection.', icon: 'ShieldCheck' },
  { title: '98% Satisfaction', desc: 'Countless referrals and repeat clients.', icon: 'Smile' },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Modern Residential Home',
    category: 'Building',
    desc: 'Complete 3-bedroom contemporary home build with premium finishes.',
    image:
      'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob21lfGVufDB8fHx8MTc4MDQyOTk1OXww&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 2,
    title: 'Commercial Complex',
    category: 'Building',
    desc: 'Multi-story office with integrated retail space.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzgwMzkxODg5fDA&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 3,
    title: 'Industrial Electrical Install',
    category: 'Electrical',
    desc: 'Complete electrical system for an industrial facility.',
    image:
      'https://images.pexels.com/photos/33531832/pexels-photo-33531832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 4,
    title: 'Designer Kitchen Remodel',
    category: 'Tiling',
    desc: 'Premium tile work with custom patterns.',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVub3ZhdGlvbnxlbnwwfHx8fDE3ODA0Mjk5NTl8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 5,
    title: 'Structural Engineering Study',
    category: 'Engineering',
    desc: 'Feasibility and structural design for a warehouse.',
    image:
      'https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxlbmdpbmVlcmluZyUyMGJsdWVwcmludHxlbnwwfHx8fDE3OTA2OTYxNTZ8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 6,
    title: 'Luxury Bathroom Suite',
    category: 'Tiling',
    desc: 'Floor-to-ceiling marble tile installation.',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxiYXRocm9vbXxlbnwwfHx8fDE3ODA0Mjk5NTl8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 7,
    title: 'Corporate PM Rollout',
    category: 'Project Management',
    desc: 'Managed multi-phase office fit-out across three sites.',
    image:
      'https://images.unsplash.com/photo-1578052315041-06c7c248b325?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBuaWdodHxlbnwwfHx8fDE3ODA0Mjk5NTB8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    id: 8,
    title: 'Geotechnical Site Study',
    category: 'Geotechnical',
    desc: 'Borehole drilling and soil analysis for a residential estate.',
    image:
      'https://images.unsplash.com/photo-1580420232349-3eefa50d2423?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnZW90ZWNobmljYWwlMjBkcmlsbGluZ3xlbnwwfHx8fDE3OTA2OTYxNjJ8MA&ixlib=rb-4.1.0&q=85',
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'Building',
  'Electrical',
  'Tiling',
  'Engineering',
  'Project Management',
  'Geotechnical',
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    quote:
      'GTTZ transformed our home beyond expectations. Their professionalism and outstanding quality are unmatched.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    quote:
      'Completed on time and within budget. Highly recommended for any commercial construction project.',
    rating: 5,
  },
  {
    name: 'Linda Mbatha',
    role: 'Property Developer',
    quote:
      'We have used GTTZ for multiple projects across Pretoria. Their attention to detail is exceptional.',
    rating: 5,
  },
  {
    name: 'David van der Merwe',
    role: 'Architect',
    quote:
      'A reliable partner for any complex build. They deliver craftsmanship and integrity every single time.',
    rating: 5,
  },
];

export const SERVICE_OPTIONS = [
  'General Building',
  'Electrical',
  'Plumbing',
  'Tiling',
  'Project Management',
  'Engineering',
  'Geotechnical Reports',
];

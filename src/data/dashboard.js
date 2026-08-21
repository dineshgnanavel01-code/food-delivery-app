/**
 * Soft Atelier — Verdant Commerce Dashboard data layer
 * Curated demo data for stat cards, orders table, product performance,
 * sales distribution (category + payment methods), and notifications.
 */

export const overviewStats = [
  {
    label: "Total Orders",
    value: "1,284",
    delta: 12.5,
    sub: "vs last month",
    icon: "ShoppingBag",
    accent: "chart-1",
  },
  {
    label: "Total Sales",
    value: "$84,254",
    delta: 8.2,
    sub: "vs last month",
    icon: "DollarSign",
    accent: "chart-2",
  },
  {
    label: "Total Customers",
    value: "3,642",
    delta: -2.1,
    sub: "vs last month",
    icon: "Users",
    accent: "chart-4",
  },
  {
    label: "Total Products",
    value: "426",
    delta: 4.6,
    sub: "vs last month",
    icon: "Package",
    accent: "chart-3",
  },
];

export const categorySales = [
  { name: "Home & Living", value: 32450, fill: "var(--chart-1)" },
  { name: "Apparel", value: 21800, fill: "var(--chart-2)" },
  { name: "Accessories", value: 14320, fill: "var(--chart-3)" },
  { name: "Kitchen", value: 9180, fill: "var(--chart-4)" },
  { name: "Stationery", value: 6504, fill: "var(--chart-5)" },
];

export const paymentMethods = [
  { name: "Credit Card", value: 48.2, fill: "var(--chart-1)" },
  { name: "PayPal", value: 22.6, fill: "var(--chart-2)" },
  { name: "Apple Pay", value: 14.8, fill: "var(--chart-3)" },
  { name: "Bank Transfer", value: 9.4, fill: "var(--chart-4)" },
  { name: "Gift Card", value: 5.0, fill: "var(--chart-5)" },
];

const avatarColors = [
  "oklch(0.65 0.14 40)",
  "oklch(0.55 0.13 300)",
  "oklch(0.65 0.12 140)",
  "oklch(0.72 0.08 230)",
  "oklch(0.38 0.09 155)",
  "oklch(0.78 0.13 85)",
];

export const orders = [
  { id: "ORD-7421", customer: "Amara Okafor", email: "amara.o@email.com", avatarColor: avatarColors[0], product: "Botanical Soy Candle", amount: 64.0, status: "Completed", payment: "Credit Card", date: "Aug 20, 2026" },
  { id: "ORD-7420", customer: "Lien Marchetti", email: "lien.m@email.com", avatarColor: avatarColors[1], product: "Canvas Tote — Forest", amount: 38.5, status: "Processing", payment: "PayPal", date: "Aug 20, 2026" },
  { id: "ORD-7419", customer: "Daniel Reyes", email: "d.reyes@email.com", avatarColor: avatarColors[2], product: "Speckled Ceramic Mug", amount: 29.0, status: "Completed", payment: "Apple Pay", date: "Aug 19, 2026" },
  { id: "ORD-7418", customer: "Sofia Berg", email: "sofia.b@email.com", avatarColor: avatarColors[3], product: "Linen Throw Blanket", amount: 120.0, status: "Pending", payment: "Credit Card", date: "Aug 19, 2026" },
  { id: "ORD-7417", customer: "Marcus Whitfield", email: "m.whitfield@email.com", avatarColor: avatarColors[4], product: "Brass Desk Lamp", amount: 89.0, status: "Cancelled", payment: "Bank Transfer", date: "Aug 18, 2026" },
  { id: "ORD-7416", customer: "Yuki Tanaka", email: "yuki.t@email.com", avatarColor: avatarColors[5], product: "Olive Wood Cutting Board", amount: 52.0, status: "Completed", payment: "Credit Card", date: "Aug 18, 2026" },
  { id: "ORD-7415", customer: "Priya Sharma", email: "p.sharma@email.com", avatarColor: avatarColors[0], product: "Cotton Waffle Towel Set", amount: 44.5, status: "Processing", payment: "PayPal", date: "Aug 17, 2026" },
  { id: "ORD-7414", customer: "Elias Grant", email: "elias.g@email.com", avatarColor: avatarColors[2], product: "Stoneware Planter — Large", amount: 76.0, status: "Refunded", payment: "Credit Card", date: "Aug 17, 2026" },
  { id: "ORD-7413", customer: "Nora Lindqvist", email: "nora.l@email.com", avatarColor: avatarColors[1], product: "Beeswax Pillar Candle Set", amount: 58.0, status: "Completed", payment: "Apple Pay", date: "Aug 16, 2026" },
  { id: "ORD-7412", customer: "Tomás Almeida", email: "t.almeida@email.com", avatarColor: avatarColors[3], product: "Walnut Serving Bowl", amount: 67.5, status: "Pending", payment: "Gift Card", date: "Aug 16, 2026" },
];

export const products = [
  { id: "p1", name: "Botanical Soy Candle", image: "/manus-storage/product-candle_f4da95c5.png", category: "Home & Living", price: 32, sold: 184, revenue: 5888, stock: 62, trend: 14.2 },
  { id: "p2", name: "Canvas Tote — Forest", image: "/manus-storage/product-tote_2625c87a.png", category: "Accessories", price: 38.5, sold: 146, revenue: 5621, stock: 18, trend: 6.8 },
  { id: "p3", name: "Speckled Ceramic Mug", image: "/manus-storage/product-ceramic_265445c3.png", category: "Kitchen", price: 29, sold: 132, revenue: 3828, stock: 94, trend: -3.4 },
];

export const notifications = [
  { id: "n1", title: "New order received", body: "ORD-7421 — Botanical Soy Candle ($64.00)", time: "12 min ago", unread: true, kind: "order" },
  { id: "n2", title: "Low stock alert", body: "Canvas Tote — Forest has 18 units left", time: "1 hr ago", unread: true, kind: "stock" },
  { id: "n3", title: "Refund processed", body: "ORD-7414 — Stoneware Planter ($76.00)", time: "3 hr ago", unread: true, kind: "order" },
  { id: "n4", title: "Promo campaign live", body: "Summer restock banner is now active", time: "Yesterday", unread: false, kind: "promo" },
];

export const weeklySales = [
  { day: "Mon", sales: 4200, orders: 38 },
  { day: "Tue", sales: 5800, orders: 47 },
  { day: "Wed", sales: 5100, orders: 42 },
  { day: "Thu", sales: 6900, orders: 56 },
  { day: "Fri", sales: 8400, orders: 68 },
  { day: "Sat", sales: 7600, orders: 61 },
  { day: "Sun", sales: 6100, orders: 49 },
];

export const statusTone = {
  Completed: { bg: "bg-[oklch(0.95_0.03_145)]", fg: "text-[oklch(0.42_0.09_145)]", dot: "bg-[oklch(0.55_0.12_140)]" },
  Processing: { bg: "bg-[oklch(0.95_0.05_80)]", fg: "text-[oklch(0.5_0.1_80)]", dot: "bg-[oklch(0.72_0.13_85)]" },
  Pending: { bg: "bg-[oklch(0.95_0.03_80)]", fg: "text-[oklch(0.52_0.08_85)]", dot: "bg-[oklch(0.78_0.13_85)]" },
  Cancelled: { bg: "bg-[oklch(0.95_0.03_28)]", fg: "text-[oklch(0.48_0.14_28)]", dot: "bg-[oklch(0.55_0.19_28)]" },
  Refunded: { bg: "bg-[oklch(0.95_0.03_300)]", fg: "text-[oklch(0.48_0.1_300)]", dot: "bg-[oklch(0.55_0.13_300)]" },
};

export const formatCurrency = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

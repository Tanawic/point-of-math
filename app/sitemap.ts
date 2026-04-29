import { MetadataRoute } from 'next'

const BASE = 'https://point-of-math-st39.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/courses`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/sheets`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/papers`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/videos`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  ]
}

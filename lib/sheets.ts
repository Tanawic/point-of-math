export type Topic = 'Number Theory' | 'Algebra' | 'Geometry' | 'Combinatorics' | 'Logic'
export type Difficulty = 'Medium' | 'Hard' | 'Olympiad'

export interface Sheet {
  unit: number
  slug: string
  title: string
  level: string
  topic: Topic
  difficulty: Difficulty
  downloadUrl: string
}

type UnitDef = { slug: string; title: string; topic: Topic }

const units: UnitDef[] = [
  { slug: 'integers_divisibility',   title: 'Integers & Divisibility',      topic: 'Number Theory' },
  { slug: 'primes_factorization',    title: 'Primes & Factorization',        topic: 'Number Theory' },
  { slug: 'gcd_lcm',                 title: 'GCD & LCM',                     topic: 'Number Theory' },
  { slug: 'modular_arithmetic',      title: 'Modular Arithmetic',            topic: 'Number Theory' },
  { slug: 'polynomials_factoring',   title: 'Polynomials & Factoring',       topic: 'Algebra'       },
  { slug: 'equations_inequalities',  title: 'Equations & Inequalities',      topic: 'Algebra'       },
  { slug: 'sequences_series',        title: 'Sequences & Series',            topic: 'Algebra'       },
  { slug: 'euclidean_geometry',      title: 'Euclidean Geometry',            topic: 'Geometry'      },
  { slug: 'circles',                 title: 'Circles',                       topic: 'Geometry'      },
  { slug: 'coordinate_geometry',     title: 'Coordinate Geometry',           topic: 'Geometry'      },
  { slug: 'trigonometry',            title: 'Trigonometry',                  topic: 'Geometry'      },
  { slug: 'sets_logic',              title: 'Sets & Logic',                  topic: 'Logic'         },
  { slug: 'counting_permutations',   title: 'Counting & Permutations',       topic: 'Combinatorics' },
  { slug: 'combinations_probability',title: 'Combinations & Probability',    topic: 'Combinatorics' },
  { slug: 'proof_techniques',        title: 'Proof Techniques',              topic: 'Logic'         },
]

export const sheets: Sheet[] = units.map((u, i) => {
  const n = i + 1
  const padded = n.toString().padStart(2, '0')
  return {
    unit: n,
    slug: u.slug,
    title: u.title,
    level: 'สอวน.',
    topic: u.topic,
    difficulty: 'Olympiad' as Difficulty,
    downloadUrl: `/sheets/soawn/unit${padded}_${u.slug}.pdf`,
  }
})

export const TOPICS: Array<Topic | 'All'> = [
  'All',
  'Number Theory',
  'Algebra',
  'Geometry',
  'Combinatorics',
  'Logic',
]

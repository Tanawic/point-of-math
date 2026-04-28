export interface Sheet {
  unit: number
  slug: string
  title: string
  level: string
  downloadUrl: string
}

const units: Array<{ slug: string; title: string }> = [
  { slug: 'integers_divisibility', title: 'Integers & Divisibility' },
  { slug: 'primes_factorization', title: 'Primes & Factorization' },
  { slug: 'gcd_lcm', title: 'GCD & LCM' },
  { slug: 'modular_arithmetic', title: 'Modular Arithmetic' },
  { slug: 'polynomials_factoring', title: 'Polynomials & Factoring' },
  { slug: 'equations_inequalities', title: 'Equations & Inequalities' },
  { slug: 'sequences_series', title: 'Sequences & Series' },
  { slug: 'euclidean_geometry', title: 'Euclidean Geometry' },
  { slug: 'circles', title: 'Circles' },
  { slug: 'coordinate_geometry', title: 'Coordinate Geometry' },
  { slug: 'trigonometry', title: 'Trigonometry' },
  { slug: 'sets_logic', title: 'Sets & Logic' },
  { slug: 'counting_permutations', title: 'Counting & Permutations' },
  { slug: 'combinations_probability', title: 'Combinations & Probability' },
  { slug: 'proof_techniques', title: 'Proof Techniques' },
]

export const sheets: Sheet[] = units.map((u, i) => {
  const n = i + 1
  const padded = n.toString().padStart(2, '0')
  return {
    unit: n,
    slug: u.slug,
    title: u.title,
    level: 'สอวน.',
    downloadUrl: `/sheets/soawn/unit${padded}_${u.slug}.pdf`,
  }
})

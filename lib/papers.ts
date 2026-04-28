export type Difficulty = 'Medium' | 'Hard' | 'Olympiad'
export type CompetitionKey = 'SAT' | 'POSN' | 'PAT1' | 'AMC' | 'PCSN'

export interface Paper {
  id: string
  title: string
  competition: string
  competitionKey: CompetitionKey
  year?: string
  difficulty: Difficulty
  downloadUrl: string
  answersUrl?: string
}

export interface PaperGroup {
  competition: string
  competitionKey: CompetitionKey
  description?: string
  papers: Paper[]
  comingSoon?: boolean
}

const satTests: Paper[] = [4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
  id: `sat-test-${n}`,
  title: `SAT Test ${n} — Math`,
  competition: 'SAT',
  competitionKey: 'SAT' as CompetitionKey,
  difficulty: 'Medium' as Difficulty,
  downloadUrl: `/papers/sat/sat-test-${n}.pdf`,
  answersUrl: `/papers/sat/sat-test-${n}-answers.pdf`,
}))

export const paperGroups: PaperGroup[] = [
  {
    competition: 'SAT Math (College Board)',
    competitionKey: 'SAT',
    description: 'Practice tests — math section only',
    papers: satTests,
  },
  {
    competition: 'สอวน. คณิตศาสตร์ (POSN)',
    competitionKey: 'POSN',
    description: 'ข้อสอบคัดเลือกเข้าค่ายโอลิมปิกวิชาการ',
    papers: [
      {
        id: 'posn-camp1-collected',
        title: 'รวมข้อสอบเพื่อคัดเลือกนักเรียนเข้าค่าย 1',
        competition: 'สอวน.',
        competitionKey: 'POSN',
        difficulty: 'Olympiad',
        downloadUrl: '/papers/posn/posn-camp1-collected.pdf',
      },
    ],
  },
  {
    competition: 'PAT1 (ความถนัดคณิตศาสตร์)',
    competitionKey: 'PAT1',
    papers: [],
    comingSoon: true,
  },
  {
    competition: 'AMC 8 / AMC 10 / AMC 12',
    competitionKey: 'AMC',
    papers: [],
    comingSoon: true,
  },
  {
    competition: 'พสวท.',
    competitionKey: 'PCSN',
    papers: [],
    comingSoon: true,
  },
]

export const allPapers: Paper[] = paperGroups.flatMap((g) => g.papers)

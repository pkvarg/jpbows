export const BOW_CATEGORIES = ['jp-double-bass', 'jp-violone', 'other'] as const

export type BowCategory = (typeof BOW_CATEGORIES)[number]

export const BOW_CATEGORY_LABELS: Record<BowCategory, { sk: string; en: string; admin: string }> = {
  'jp-double-bass': { sk: 'JP kontrabasové sláčiky', en: 'JP Double Bass Bows', admin: 'JP kontrabasove slaciky' },
  'jp-violone': { sk: 'JP sláčiky na violone', en: 'JP Violone Bows', admin: 'JP slaciky na violone' },
  other: { sk: 'Ostatné sláčiky', en: 'Other Bows', admin: 'Ostatne slaciky' },
}

export const isBowCategory = (value: unknown): value is BowCategory =>
  typeof value === 'string' && (BOW_CATEGORIES as readonly string[]).includes(value)

// Bows saved before categories existed have none; derive one from the name until the admin saves it.
export const bowCategory = (bow: { category?: string | null; name: string; enName?: string | null }): BowCategory => {
  if (isBowCategory(bow.category)) return bow.category
  if (!bow.name.includes('JP')) return 'other'
  return /violone bow/i.test(bow.enName || '') || /na G violone/i.test(bow.name) ? 'jp-violone' : 'jp-double-bass'
}

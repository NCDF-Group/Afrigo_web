// ISO 3166-1 alpha-2 codes (for flag files in /public/flags) and African Union regions, keyed by the map's numeric ids.
// Regions follow the AU's five official regions; Mauritania, Morocco and Western Sahara (SADR) are in the Northern region.
export type AfricaRegion = 'north' | 'west' | 'central' | 'east' | 'south'

export const COUNTRY_META: Record<string, { iso2: string; region: AfricaRegion }> = {
  '012': { iso2: 'dz', region: 'north' }, '818': { iso2: 'eg', region: 'north' }, '434': { iso2: 'ly', region: 'north' },
  '478': { iso2: 'mr', region: 'north' }, '504': { iso2: 'ma', region: 'north' }, '788': { iso2: 'tn', region: 'north' },
  '732': { iso2: 'eh', region: 'north' },

  '204': { iso2: 'bj', region: 'west' }, '854': { iso2: 'bf', region: 'west' }, '132': { iso2: 'cv', region: 'west' },
  '384': { iso2: 'ci', region: 'west' }, '270': { iso2: 'gm', region: 'west' }, '288': { iso2: 'gh', region: 'west' },
  '324': { iso2: 'gn', region: 'west' }, '624': { iso2: 'gw', region: 'west' }, '430': { iso2: 'lr', region: 'west' },
  '466': { iso2: 'ml', region: 'west' }, '562': { iso2: 'ne', region: 'west' }, '566': { iso2: 'ng', region: 'west' },
  '686': { iso2: 'sn', region: 'west' }, '694': { iso2: 'sl', region: 'west' }, '768': { iso2: 'tg', region: 'west' },

  '108': { iso2: 'bi', region: 'central' }, '120': { iso2: 'cm', region: 'central' }, '140': { iso2: 'cf', region: 'central' },
  '148': { iso2: 'td', region: 'central' }, '178': { iso2: 'cg', region: 'central' }, '180': { iso2: 'cd', region: 'central' },
  '226': { iso2: 'gq', region: 'central' }, '266': { iso2: 'ga', region: 'central' }, '678': { iso2: 'st', region: 'central' },

  '174': { iso2: 'km', region: 'east' }, '262': { iso2: 'dj', region: 'east' }, '232': { iso2: 'er', region: 'east' },
  '231': { iso2: 'et', region: 'east' }, '404': { iso2: 'ke', region: 'east' }, '450': { iso2: 'mg', region: 'east' },
  '480': { iso2: 'mu', region: 'east' }, '646': { iso2: 'rw', region: 'east' }, '690': { iso2: 'sc', region: 'east' },
  '706': { iso2: 'so', region: 'east' }, '728': { iso2: 'ss', region: 'east' }, '729': { iso2: 'sd', region: 'east' },
  '834': { iso2: 'tz', region: 'east' }, '800': { iso2: 'ug', region: 'east' },

  '024': { iso2: 'ao', region: 'south' }, '072': { iso2: 'bw', region: 'south' }, '748': { iso2: 'sz', region: 'south' },
  '426': { iso2: 'ls', region: 'south' }, '454': { iso2: 'mw', region: 'south' }, '508': { iso2: 'mz', region: 'south' },
  '516': { iso2: 'na', region: 'south' }, '710': { iso2: 'za', region: 'south' }, '894': { iso2: 'zm', region: 'south' },
  '716': { iso2: 'zw', region: 'south' }
}

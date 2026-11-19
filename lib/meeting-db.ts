import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother James',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Geffrard',
    wardBusiness: [{ description: 'Sustaining of new Relief Society president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 1040, title: "His Voice as the Sound" },
    speakers: [
      { name: 'Sister Georges', topic: 'The Give of Forgiveness', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 62, title: 'All Creatures if Our God and King' },
    closingPrayer: 'Brother Jackson',
    announcements: ['Youth Game night: Nov 25']
  },

{
  id: 3,
  date: '2026-11-15',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Davis',
  openingHymn: { number: 85, title: 'How Firm a Foundation' },
  openingPrayer: 'Sister Johnson',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
  speakers: [
    { name: 'Brother Wilson', topic: 'The Power of Prayer', type: 'speaker' },
    { name: 'Sister Martinez', topic: 'Trusting in the Lord', type: 'speaker' }
  ],
  closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
  closingPrayer: 'Brother Thomas',
  announcements: ['Ward service project: November 21']
},
{
  id: 4,
  date: '2026-11-22',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Jones',
  openingHymn: { number: 92, title: 'For the Beauty of the Earth' },
  openingPrayer: 'Sister Anderson',
  wardBusiness: [{ description: 'Release of Young Men adviser' }],
  stakeBusiness: false,
  sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
  speakers: [
    { name: 'Sister Williams', topic: 'Developing Gratitude', type: 'speaker' },
    { name: 'Brother Jackson', topic: 'Recognizing Our Blessings', type: 'speaker' }
  ],
  closingHymn: { number: 241, title: 'Count Your Blessings' },
  closingPrayer: 'Sister Brown',
  announcements: ['Ward Thanksgiving activity: November 26']
},
{
  id: 5,
  date: '2026-11-29',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother James',
  openingHymn: { number: 116, title: 'Come, Follow Me' },
  openingPrayer: 'Brother Wilson',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
  speakers: [
    { name: 'Sister Davis', topic: 'Following Jesus Christ', type: 'speaker' },
    { name: 'Brother Anderson', topic: 'Serving Others', type: 'speaker' }
  ],
  closingHymn: { number: 223, title: 'Have I Done Any Good?' },
  closingPrayer: 'Sister Martinez',
  announcements: ['Ward Christmas devotional: December 13']
},
{
  id: 6,
  date: '2026-12-06',
  meetingType: 'testimony',
  presiding: 'Bishop Smith',
  conducting: 'Brother Jones',
  openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
  openingPrayer: 'Sister Thomas',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
  speakers: [
    { name: 'Ward Members', topic: 'Fast and Testimony Meeting', type: 'speaker' }
  ],
  closingHymn: { number: 89, title: 'The Lord Is My Light' },
  closingPrayer: 'Brother Johnson',
  announcements: ['Ward Christmas party: December 12']
},
{
  id: 7,
  date: '2026-12-13',
  meetingType: 'regular',
  presiding: 'Bishop Smith',
  conducting: 'Brother Davis',
  openingHymn: { number: 202, title: 'Oh, Come, All Ye Faithful' },
  openingPrayer: 'Sister Jackson',
  wardBusiness: [{ description: 'Sustaining of new Sunday School teacher' }],
  stakeBusiness: false,
  sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
  speakers: [
    { name: 'Sister Anderson', topic: 'The Birth of Jesus Christ', type: 'speaker' },
    { name: 'Ward Choir', topic: 'Christmas Musical Presentation', type: 'musical-number' },
    { name: 'Brother Williams', topic: 'The Gift of the Savior', type: 'speaker' }
  ],
  closingHymn: { number: 204, title: 'Silent Night' },
  closingPrayer: 'Brother Wilson',
  announcements: ['Christmas sacrament meeting: December 20']
}

  
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(meeting => meeting.id === id) ?? null;
}
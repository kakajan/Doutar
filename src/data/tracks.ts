// Track and album data
export interface Track {
  id: string
  title: string
  subtitle: string
  file: string
  duration: number
  cover?: string
}

export interface MusicGroup {
  id: string
  name: string
  hint: string
  icon: string
  cover: string
  description?: string
  story?: string
  tracks: Track[]
}

const buildTracks = (groupId: string, count: number, prefix: string, artist: string, startIndex = 1): Track[] => {
  const coverPath = `/assets/img/covers/album-${groupId === '1' ? 'unity' : groupId === '2' ? 'chap' : 'joda'}.webp`
  const durationsMap: Record<string, number[]> = {
    '3': [357, 200, 334, 278, 291, 263, 258, 279, 274, 253, 262, 270, 282, 277],
  }
  return Array.from({ length: count }, (_, i) => {
    const num = (startIndex + i).toString().padStart(2, '0')
    const file = groupId === '3'
      ? `/assets/music/3/Track${startIndex + i}.mp3`
      : `https://doutar.ir/assets/music/${groupId}/Track${startIndex + i}.mp3`
    return {
      id: `${groupId}-track-${i + 1}`,
      title: `${prefix} #${num}`,
      subtitle: artist,
      file,
      duration: durationsMap[groupId]?.[i] ?? 180,
      cover: coverPath,
    }
  })
}

export const musicGroups: MusicGroup[] = [
  {
    id: 'unity',
    name: 'اتحاد',
    hint: '۲۷ قطعه',
    icon: 'fa-wave-square',
    cover: '/assets/img/covers/album-unity.webp',
    description: 'بازنمایی معاصر اشعار مختومقلی فراغی با دوتار، قیجیق و سنتز الکترونیک',
    tracks: buildTracks('1', 27, 'Unity', 'Aytronic', 1),
  },
  {
    id: 'chap',
    name: 'چاپ!',
    hint: '۱۷ قطعه',
    icon: 'fa-guitar',
    cover: '/assets/img/covers/album-chap.webp',
    description: 'نوای کوبنده و ریتمیک دوتار و تاخت اسب‌های ترکمن در صحرا',
    tracks: buildTracks('2', 17, 'CHAP!', 'Aytronic', 1),
  },
  {
    id: 'joda',
    name: 'جدا ماندم',
    hint: '۱۴ قطعه',
    icon: 'fa-heart-crack',
    cover: '/assets/img/covers/album-joda.webp',
    description: 'روایت سوزناک دلتنگی مادر، جدایی از مادر و فراق ایل و دیار در اشعار مختومقلی فراغی با نوای دوتار و موسیقی الکترونیک',
    story: 'مختومقلی فراغی در دوران اسارت و دوری از دیار، سوزناک‌ترین اشعار خود را در فراق مادرش (اورازگل)، دلتنگی مادر و حسرت جدایی از مادر و آغوش پرمهر او سرود. «جدا ماندم» (Ayrildim) تجلی این اندوه عمیق و غربت جانکاه است؛ نوایی سوزان از دل صحرا در وصف مادر که داغ دوری از مادر و پیوند جاودانه فرزند با مهر مادری را به تصویر می‌کشد.',
    tracks: buildTracks('3', 14, 'Joda Mandam', 'Aytronic', 1),
  },
]

export const lyrics = [
  'آی ترکمن! اسب را زین کن',
  'زمانِ خواب نیست',
  'آبِ این دنیا سراب است',
  'زلال و ناب نیست',
  'شبیه چشمهٔ جوشان',
  'جدا ماندم ز ایل و مادر...',
  'دلم تنگ است و گریان',
  'از این غربت پریشان...',
]

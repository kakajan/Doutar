// Track and album data
export interface Track {
  id: string
  title: string
  subtitle: string
  file: string
  duration: number
}

export interface MusicGroup {
  id: string
  name: string
  hint: string
  icon: string
  tracks: Track[]
}

const buildTracks = (groupId: string, count: number, prefix: string, artist: string, startIndex = 1): Track[] =>
  Array.from({ length: count }, (_, i) => {
    const num = (startIndex + i).toString().padStart(2, '0')
    return {
      id: `${groupId}-track-${i + 1}`,
      title: `${prefix} #${num}`,
      subtitle: artist,
      file: `https://doutar.ir/assets/music/${groupId}/Track${startIndex + i}.mp3`,
      duration: 180,
    }
  })

export const musicGroups: MusicGroup[] = [
  {
    id: 'unity',
    name: 'اتحاد',
    hint: '',
    icon: 'fa-wave-square',
    tracks: buildTracks('1', 27, 'Unity', 'Aytronic', 1),
  },
  {
    id: 'chap',
    name: 'چاپ!',
    hint: '',
    icon: 'fa-guitar',
    tracks: buildTracks('2', 17, 'CHAP!', 'Aytronic', 1),
  },
]

export const lyrics = [
  'آی ترکمن! اسب را زین کن',
  'زمانِ خواب نیست',
  'آبِ این دنیا سراب است',
  'زلال و ناب نیست',
]

import { musicGroups, lyrics } from './tracks.ts'

export const SITE_URL = 'https://doutar.ir'

export const SITE = {
  url: SITE_URL,
  name: 'دوتار | Doutar',
  nameEn: 'Doutar',
  albumFa: 'میراث صحرا',
  albumEn: 'Miras Sahrasy',
  title:
    'دانلود آهنگ ترکمنی | اشعار مختومقلی فراغی با دوتار و موسیقی الکترونیک - آلبوم میراث صحرا',
  description:
    'دانلود رایگان آهنگ ترکمنی جدید ۱۴۰۴ | بهترین آهنگ‌های اشعار مختومقلی فراغی با دوتار، قیجیق و تنظیم الکترونیک. آلبوم میراث صحرا شامل ۴۴ قطعه موسیقی ترکمن با کیفیت ۳۲۰ برای دانلود.',
  keywords:
    'دانلود آهنگ مادر, آهنگ دلتنگی مادر, جدایی از مادر, آهنگ غمگین مادر, دانلود آهنگ مادر ترکمنی, فراق مادر, آهنگ دوری از مادر, شعر مختومقلی برای مادر, شعر مختومقلی در وصف مادر, اورازگل مادر مختومقلی, آهنگ سوزناک مادر, آهنگ روز مادر ترکمنی, دانلود آهنگ ترکمنی, آهنگ ترکمنی جدید, دانلود آهنگ مختومقلی فراغی, اشعار مختومقلی فراغی, موسیقی ترکمن, دوتار ترکمنی, آهنگ ترکمنی عاشقانه, موسیقی ترکمن صحرا, آهنگ ترکمنستان, قیجیق ترکمن, ریمیکس ترکمنی, آهنگ یموت گوکلان, میراث صحرا, جدا ماندم, Ayrildim, Magtymguly Pyragy, Turkmen Music Download',
  image: `${SITE_URL}/assets/img/cover.webp`,
  cover: `${SITE_URL}/assets/img/music-cover.webp`,
  imageAlt: 'کاور آلبوم میراث صحرا — آهنگ ترکمنی با اشعار مختومقلی فراغی',
  locale: 'fa_IR',
  themeColor: '#F9F7F2',
  author: 'Aytronic',
  published: '2025-12-04',
  geo: {
    region: 'IR-27',
    placename: 'Turkmen Sahara, Golestan, Iran',
    latitude: 37.25,
    longitude: 55.1667,
  },
}

export const ALBUM_RATINGS = {
  collection: {
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '128',
    reviewCount: '84',
    ratingPercent: '۹۸٪',
  },
  unity: {
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '78',
    reviewCount: '52',
    ratingPercent: '۹۸٪',
  },
  chap: {
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '50',
    reviewCount: '32',
    ratingPercent: '۹۶٪',
  },
  joda: {
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '42',
    reviewCount: '28',
    ratingPercent: '۱۰۰٪',
  },
}

export const SOCIALS = {
  instagram: 'https://www.instagram.com/usher_vocal',
  telegram: 'https://t.me/usherArt',
  linkedin: 'https://www.linkedin.com/in/usher-ir',
  github: 'https://github.com/kakajan',
  website: 'https://aytronic.ir',
}

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'آلبوم میراث صحرا چیست؟',
    answer:
      'میراث صحرا (Miras Sahrasy) مجموعهٔ موسیقی ترکمنی اثر آی‌ترونیک (Aytronic) است که اشعار مختومقلی فراغی را با نوای دوتار و قیجیق و تنظیم الکترونیک در هم می‌آمیزد. این مجموعه آلبوم‌های «اتحاد»، «چاپ!» و اثر ویژه «جدا ماندم» را شامل می‌شود.',
  },
  {
    question: 'قطعه و اثر «جدا ماندم» درباره چیست؟',
    answer:
      'اثر «جدا ماندم» (Ayrildim) روایتی سوزناک و شنیدنی از دلتنگی مادر، جدایی از مادر مهربانش (اورازگل) و حسرت فراق ایل و تبار در دوران غربت مختومقلی فراغی است که با نوای اصیل دوتار ترکمنی و تلفیق الکترونیک اجرا شده است. این اثر از برجسته‌ترین قطعات در وصف مادر و سوز جدایی از آغوش پرمهر مادر در موسیقی ترکمن به شمار می‌رود.',
  },
  {
    question: 'چگونه آهنگ‌های دلتنگی و جدایی از مادر (آلبوم جدا ماندم) را دانلود کنیم؟',
    answer:
      'تمامی ۱۴ قطعه آلبوم جدا ماندم (Ayrildim) در وصف مادر، دلتنگی مادر و فراق غربت به صورت تکی و همچنین فایل زیپ یکجا (Ayrildim-Aytronic.zip) با بالاترین کیفیت استودیویی ۳۲۰ به صورت کاملاً رایگان برای شنوندگان گرامی قابل دانلود و پخش آنلاین است.',
  },
  {
    question: 'آیا دانلود آهنگ‌های ترکمنی این سایت رایگان است؟',
    answer:
      'بله. تمام قطعات و فایل‌های صوتی برای شنیدن آنلاین و دانلود رایگان با کیفیت ۳۲۰ کیلوبیت بر ثانیه در doutar.ir در دسترس است.',
  },
  {
    question: 'مختومقلی فراغی کیست؟',
    answer:
      'مختومقلی فراغی (Magtymguly Pyragy) شاعر کلاسیک ترکمن در سدهٔ هجدهم است. اشعار او ستون فرهنگ ترکمن‌صحرا به‌شمار می‌رود و متن اصلی قطعات آلبوم میراث صحرا از همین میراث ادبی گرفته شده است.',
  },
  {
    question: 'آلبوم‌های میراث صحرا چند قطعه دارند؟',
    answer:
      'آلبوم اتحاد ۲۷ قطعه، آلبوم چاپ! ۱۷ قطعه و اثر جدا ماندم ۱۴ قطعه شنیدنی دارند (در مجموع ۵۸ قطعه). تمام قطعات را می‌توان آنلاین شنید یا رایگان با بالاترین کیفیت دانلود کرد.',
  },
  {
    question: 'کیفیت فایل‌های صوتی چگونه است؟',
    answer:
      'فایل‌ها با فرمت MP3 و بیت‌ریت ۳۲۰ کیلوبیت بر ثانیه ارائه می‌شوند؛ مناسب پخش آنلاین و دانلود آفلاین.',
  },
]

export interface PageSeo {
  title: string
  description: string
  canonical: string
  robots: string
  ogType: string
  image: string
}

export function getAlbumByParam(id: string | string[] | undefined) {
  const slug = Array.isArray(id) ? id[0] : id
  return musicGroups.find((g) => g.id === slug) || null
}

function notFoundSeo(path: string): PageSeo {
  return {
    title: `صفحه پیدا نشد | ${SITE.name}`,
    description: 'این صفحه در سایت دوتار وجود ندارد. به صفحهٔ اصلی آلبوم میراث صحرا بازگردید.',
    canonical: `${SITE_URL}${path.startsWith('/') ? path : '/' + path}`,
    robots: 'noindex, follow',
    ogType: 'website',
    image: SITE.image,
  }
}

export function getPageSeo(path: string, albumId?: string): PageSeo {
  if (path.startsWith('/album/')) {
    const album = getAlbumByParam(albumId)
    if (album) {
      if (album.id === 'joda') {
        return {
          title: `دانلود آهنگ مادر ترکمنی | آلبوم جدا ماندم (Ayrildim) — دلتنگی و جدایی از مادر`,
          description: `دانلود رایگان آلبوم جدا ماندم (Ayrildim) اثر آی‌ترونیک: ۱۴ قطعه آهنگ غمگین و سوزناک در وصف مادر، دلتنگی مادر و جدایی از مادر با اشعار مختومقلی فراغی و دوتار، کیفیت ۳۲۰.`,
          canonical: `${SITE_URL}/album/${album.id}`,
          robots: 'index, follow',
          ogType: 'music.album',
          image: album.cover ? `${SITE_URL}${album.cover}` : SITE.cover,
        }
      }
      return {
        title: `دانلود آلبوم ${album.name} | آهنگ ترکمنی میراث صحرا — دوتار`,
        description: `دانلود رایگان آلبوم «${album.name}» از مجموعه میراث صحرا: ${album.tracks.length} قطعه آهنگ ترکمنی با اشعار مختومقلی فراغی، دوتار و تنظیم الکترونیک، کیفیت ۳۲۰.`,
        canonical: `${SITE_URL}/album/${album.id}`,
        robots: 'index, follow',
        ogType: 'music.album',
        image: album.cover ? `${SITE_URL}${album.cover}` : SITE.cover,
      }
    }
    return notFoundSeo(path)
  }

  if (path !== '/') {
    return notFoundSeo(path)
  }

  return {
    title: SITE.title,
    description: SITE.description,
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    ogType: 'music.album',
    image: SITE.image,
  }
}

function albumNode(group: (typeof musicGroups)[number]) {
  const rating = (ALBUM_RATINGS as any)[group.id] || ALBUM_RATINGS.collection
  const englishName = group.id === 'unity' ? 'Unity (اتحاد)' : group.id === 'chap' ? 'CHAP! (چاپ!)' : 'Joda Mandam (جدا ماندم — Ayrildim)'
  const genres =
    group.id === 'joda'
      ? ['موسیقی ترکمنی', 'آهنگ مادر', 'دلتنگی مادر', 'جدایی از مادر', 'فراق مادر', 'Turkmen Folk Fusion', 'Electronic Folk', 'دوتار']
      : ['Turkmen Folk Fusion', 'موسیقی ترکمنی', 'Electronic Folk', 'دوتار']
  return {
    '@type': 'MusicAlbum',
    '@id': `${SITE_URL}/album/${group.id}#album`,
    name: englishName,
    alternateName: group.name,
    url: `${SITE_URL}/album/${group.id}`,
    image: group.cover ? `${SITE_URL}${group.cover}` : SITE.cover,
    genre: genres,
    description:
      group.description || `بازنمایی معاصر اشعار مختومقلی فراغی با دوتار، قیجیق و سنتز الکترونیک در آلبوم ${group.name} از مجموعه میراث صحرا اثر آی‌ترونیک.`,
    numTracks: group.tracks.length,
    datePublished: SITE.published,
    albumProductionType: 'https://schema.org/StudioAlbum',
    albumReleaseType: 'https://schema.org/AlbumRelease',
    byArtist: { '@id': `${SITE_URL}/#aytronic` },
    composer: { '@id': `${SITE_URL}/#aytronic` },
    lyricist: { '@id': `${SITE_URL}/#magtymguly` },
    producer: { '@id': `${SITE_URL}/#aytronic` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['fa', 'tk'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
      reviewCount: rating.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/album/${group.id}#download`,
      category: 'Free High-Quality 320kbps Studio Download',
    },
    track: group.tracks.map((track, index) => ({
      '@type': 'MusicRecording',
      '@id': `${SITE_URL}/album/${group.id}#${track.id}`,
      position: index + 1,
      name: track.title,
      url: `${SITE_URL}/album/${group.id}#${track.id}`,
      duration: `PT${track.duration}S`,
      isFamilyFriendly: true,
      inLanguage: ['fa', 'tk'],
      genre:
        group.id === 'joda'
          ? ['موسیقی ترکمنی', 'آهنگ مادر', 'دلتنگی مادر', 'جدایی از مادر', 'فراق مادر', 'دوتار', 'Turkmen Folk Fusion']
          : ['موسیقی ترکمنی', 'Turkmen Folk Fusion', 'دوتار', 'موسیقی الکترونیک'],
      byArtist: { '@id': `${SITE_URL}/#aytronic` },
      composer: { '@id': `${SITE_URL}/#aytronic` },
      lyricist: { '@id': `${SITE_URL}/#magtymguly` },
      inAlbum: { '@id': `${SITE_URL}/album/${group.id}#album` },
      encodingFormat: 'audio/mpeg',
      audio: {
        '@type': 'AudioObject',
        '@id': `${track.file}#audio`,
        name: `${track.title} - ${group.name}`,
        description:
          group.id === 'joda'
            ? `دانلود و پخش آنلاین قطعه ${track.title} در وصف مادر و دلتنگی با اشعار مختومقلی فراغی و دوتار ترکمنی از آلبوم جدا ماندم`
            : `دانلود و پخش آنلاین قطعه ${track.title} با اشعار مختومقلی فراغی و دوتار ترکمنی از آلبوم ${group.name}`,
        contentUrl: track.file.startsWith('http') ? track.file : `${SITE_URL}${track.file}`,
        encodingFormat: 'audio/mpeg',
        duration: `PT${track.duration}S`,
        bitRate: '320 kbps',
        inLanguage: ['fa', 'tk'],
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IRR',
        availability: 'https://schema.org/InStock',
        url: track.file.startsWith('http') ? track.file : `${SITE_URL}${track.file}`,
      },
    })),
  }
}

export function buildJsonLd(path: string, albumId?: string) {
  const page = getPageSeo(path, albumId)

  const artist = {
    '@type': 'MusicGroup',
    '@id': `${SITE_URL}/#aytronic`,
    name: 'Aytronic',
    alternateName: ['آی‌ترونیک', 'Usher'],
    url: SOCIALS.website,
    sameAs: [SOCIALS.instagram, SOCIALS.telegram, SOCIALS.linkedin, SOCIALS.github, SOCIALS.website],
    genre: ['Turkmen Music', 'Electronic', 'Folk Fusion', 'دوتار'],
  }

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#magtymguly`,
    name: 'مختومقلی فراغی',
    alternateName: ['Magtymguly Pyragy', 'Makhtumkuli Fraghi', 'Magtymguly', 'مختوم‌قلی فراغی'],
    url: 'https://fa.wikipedia.org/wiki/%D9%85%D8%AE%D8%AA%D9%88%D9%85%E2%80%8C%D9%82%D9%84%DB%8C_%D9%81%D8%B1%D8%A7%D8%BA%DB%8C',
    sameAs: [
      'https://fa.wikipedia.org/wiki/%D9%85%D8%AE%D8%AA%D9%88%D9%85%E2%80%8C%D9%82%D9%84%DB%8C_%D9%81%D8%B1%D8%A7%D8%BA%DB%8C',
      'https://en.wikipedia.org/wiki/Magtymguly_Pyragy',
      'https://www.wikidata.org/wiki/Q334812',
    ],
    jobTitle: 'شاعر و اندیشمند کلاسیک ترکمن',
    description: 'شاعر کلاسیک ترکمن در سدهٔ هجدهم و منبع ادبی آلبوم میراث صحرا.',
    nationality: { '@type': 'Country', name: 'Turkmenistan' },
  }

  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/favicon/favicon.svg`,
    sameAs: [SOCIALS.instagram, SOCIALS.telegram, SOCIALS.linkedin, SOCIALS.github],
    founder: { '@id': `${SITE_URL}/#aytronic` },
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    alternateName: ['Doutar', 'Miras Sahrasy', 'میراث صحرا'],
    inLanguage: ['fa', 'tk'],
    description: SITE.description,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const collection = {
    '@type': 'MusicPlaylist',
    '@id': `${SITE_URL}/#miras-sahrasy`,
    name: 'میراث صحرا',
    alternateName: 'Miras Sahrasy',
    url: SITE_URL,
    image: SITE.image,
    datePublished: SITE.published,
    numTracks: musicGroups.reduce((sum, g) => sum + g.tracks.length, 0),
    creator: { '@id': `${SITE_URL}/#aytronic` },
    about: { '@id': `${SITE_URL}/#magtymguly` },
    description: SITE.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ALBUM_RATINGS.collection.ratingValue,
      bestRating: ALBUM_RATINGS.collection.bestRating,
      worstRating: ALBUM_RATINGS.collection.worstRating,
      ratingCount: ALBUM_RATINGS.collection.ratingCount,
      reviewCount: ALBUM_RATINGS.collection.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
      url: SITE_URL,
      category: 'Free Music Download 320kbps',
    },
    hasPart: musicGroups.map((g) => ({ '@id': `${SITE_URL}/album/${g.id}#album` })),
  }

  if (path !== '/') {
    const album = path.startsWith('/album/') ? getAlbumByParam(albumId) : null
    if (album) {
      const node = albumNode(album)
      return {
        '@context': 'https://schema.org',
        '@graph': [
          website,
          organization,
          artist,
          person,
          node,
          {
            '@type': 'WebPage',
            '@id': `${page.canonical}#webpage`,
            url: page.canonical,
            name: page.title,
            description: page.description,
            inLanguage: 'fa',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${page.canonical}#album` },
            primaryImageOfPage: { '@type': 'ImageObject', url: SITE.cover },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'خانه',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: album.name,
                item: page.canonical,
              },
            ],
          },
        ],
      }
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        website,
        organization,
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/404#webpage`,
          name: 'صفحه پیدا نشد',
          url: page.canonical,
          inLanguage: 'fa',
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      organization,
      artist,
      person,
      collection,
      ...musicGroups.map((g) => albumNode(g)),
      faqPage,
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE.title,
        description: SITE.description,
        inLanguage: 'fa',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: [{ '@id': `${SITE_URL}/#miras-sahrasy` }, { '@id': `${SITE_URL}/#magtymguly` }],
        primaryImageOfPage: { '@type': 'ImageObject', url: SITE.image, caption: SITE.imageAlt },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#hero-title', '#hero-desc', '#faq'],
        },
        hasPart: lyrics.map((line) => ({
          '@type': 'CreativeWork',
          text: line,
          inLanguage: 'fa',
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'خانه',
            item: `${SITE_URL}/`,
          },
        ],
      },
    ],
  }
}

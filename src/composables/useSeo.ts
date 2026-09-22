import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { SITE, buildJsonLd, getPageSeo } from '@/data/seo'

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const extraSel = extra
    ? Object.entries(extra).map(([k, v]) => `[${k}="${v}"]`).join('')
    : ''
  let el = document.head.querySelector(`link[rel="${rel}"]${extraSel}`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extra) {
      for (const [key, value] of Object.entries(extra)) {
        el.setAttribute(key, value)
      }
    }
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(data: unknown) {
  let el = document.getElementById('seo-jsonld') as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = 'seo-jsonld'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function applySeo(path: string, albumId?: string) {
  const page = getPageSeo(path, albumId)

  document.title = page.title

  upsertMeta('meta[name="description"]', { name: 'description' }, page.description)
  upsertMeta('meta[name="robots"]', { name: 'robots' }, page.robots)
  upsertMeta('meta[name="keywords"]', { name: 'keywords' }, SITE.keywords)
  upsertMeta('meta[name="author"]', { name: 'author' }, SITE.author)
  upsertMeta('meta[name="theme-color"]', { name: 'theme-color' }, SITE.themeColor)
  upsertMeta('meta[name="geo.region"]', { name: 'geo.region' }, SITE.geo.region)
  upsertMeta('meta[name="geo.placename"]', { name: 'geo.placename' }, SITE.geo.placename)
  upsertMeta('meta[name="geo.position"]', { name: 'geo.position' }, `${SITE.geo.latitude};${SITE.geo.longitude}`)
  upsertMeta('meta[name="ICBM"]', { name: 'ICBM' }, `${SITE.geo.latitude}, ${SITE.geo.longitude}`)

  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, page.ogType)
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, page.canonical)
  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, page.title)
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, page.description)
  upsertMeta('meta[property="og:image"]', { property: 'og:image' }, page.image)
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, SITE.imageAlt)
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, SITE.locale)
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE.name)

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, page.title)
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, page.description)
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, page.image)
  upsertMeta('meta[name="twitter:url"]', { name: 'twitter:url' }, page.canonical)

  upsertLink('canonical', page.canonical)
  upsertLink('alternate', page.canonical, { hreflang: 'fa' })
  upsertLink('alternate', page.canonical, { hreflang: 'x-default' })

  upsertJsonLd(buildJsonLd(path, albumId))
}

export function useSeo() {
  const route = useRoute()

  watch(
    () => [route.path, route.params.id] as const,
    ([path, id]) => {
      const albumId = typeof id === 'string' ? id : undefined
      applySeo(path, albumId)
    },
    { immediate: true },
  )
}

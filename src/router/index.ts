import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { musicGroups } from '@/data/tracks'
import HomePage from '@/pages/HomePage.vue'

const AlbumPage = () => import('@/pages/AlbumPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')

const TRANSITION_MS = 280

function waitForElement(selector: string, timeout = 1200): Promise<Element | null> {
  return new Promise((resolve) => {
    const found = document.querySelector(selector)
    if (found) {
      resolve(found)
      return
    }

    const root = document.getElementById('main-content') || document.body
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector)
      if (el) {
        observer.disconnect()
        resolve(el)
      }
    })
    observer.observe(root, { childList: true, subtree: true })

    window.setTimeout(() => {
      observer.disconnect()
      resolve(document.querySelector(selector))
    }, timeout)
  })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumPage,
    beforeEnter: (to: RouteLocationNormalized) => {
      const id = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id
      if (!id || !musicGroups.some((g) => g.id === id)) {
        return {
          name: 'not-found',
          params: { pathMatch: to.path.slice(1).split('/') },
        }
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Never reset or jump scroll when opening or closing the player overlay
    if (to.hash === '#player' || from.hash === '#player') {
      return false
    }

    // Never reset scroll when staying on the same path with no target anchor
    if (to.path === from.path && !to.hash) {
      return false
    }

    if (savedPosition) {
      return new Promise((resolve) => {
        window.setTimeout(() => resolve(savedPosition), TRANSITION_MS)
      })
    }

    if (to.hash) {
      return waitForElement(to.hash).then((el) => {
        if (!el) return { top: 0 }
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      })
    }

    return new Promise((resolve) => {
      window.setTimeout(() => resolve({ top: 0, left: 0 }), TRANSITION_MS)
    })
  },
})

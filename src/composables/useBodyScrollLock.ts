let lockCount = 0
let savedScrollY = 0

function applyLock() {
  savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
  const scrollbar = window.innerWidth - document.documentElement.clientWidth

  document.documentElement.classList.add('is-scroll-locked')
  document.body.classList.add('is-scroll-locked')
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
  if (scrollbar > 0) {
    document.body.style.paddingLeft = `${scrollbar}px`
  }
}

function applyUnlock() {
  const targetY = savedScrollY
  document.documentElement.classList.remove('is-scroll-locked')
  document.body.classList.remove('is-scroll-locked')
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
  document.body.style.paddingLeft = ''

  window.scrollTo({ top: targetY, left: 0, behavior: 'instant' as ScrollBehavior })
  requestAnimationFrame(() => {
    window.scrollTo({ top: targetY, left: 0, behavior: 'instant' as ScrollBehavior })
  })
}

export function lockBody() {
  if (typeof document === 'undefined') return
  if (lockCount === 0) applyLock()
  lockCount += 1
}

export function unlockBody() {
  if (typeof document === 'undefined') return
  if (lockCount <= 0) {
    lockCount = 0
    return
  }
  lockCount -= 1
  if (lockCount === 0) applyUnlock()
}

export function forceUnlockBody() {
  if (typeof document === 'undefined') return
  lockCount = 0
  applyUnlock()
}

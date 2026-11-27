export async function revealFromOrigin(origin: HTMLElement, update: () => void, name?: string) {
  if (!("startViewTransition" in document)) {
    update()
    return
  }

  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  if (name) document.documentElement.setAttribute("data-theme-transition", name)

  let updated = false
  const run = () => {
    if (updated) return
    updated = true
    update()
  }

  try {
    const transition = document.startViewTransition(run)
    await transition.ready
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    )
    await transition.finished
  } catch {
    // A skipped transition may call the queued callback before or after this point; run once.
    run()
  } finally {
    document.documentElement.removeAttribute("data-theme-transition")
  }
}

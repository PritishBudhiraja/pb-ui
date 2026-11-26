export function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true
  return target.closest('[contenteditable=""], [contenteditable="true"]') !== null
}

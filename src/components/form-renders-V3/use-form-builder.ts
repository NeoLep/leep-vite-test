export const useRenderSlots = (item: any) => {
  const slotsList: {
    key: string
    slotName: string
  }[] = []

  if (item.slots && typeof item.slots === 'string') {
    slotsList.push({
      key: item.slots,
      slotName: item.slots,
    })
  } else if (item.slots && Array.isArray(item.slots)) {
    item.slots.forEach((item: string) =>
      slotsList.push({ key: item, slotName: item })
    )
  } else if (item.slots && item.slots.constructor == Object) {
    for (const key in item.slots) {
      if (typeof item.slots[key] === 'string') {
        slotsList.push({
          key,
          slotName: item.slots[key],
        })
      }
    }
  }

  return slotsList
}

export const useMixinStyle = (self: any, all: any): any => {
  let result: any[] = []
  if (all) {
    if (Array.isArray(all)) result = [...result, ...all]
    else if (all.constructor == Object) result = [...result, all]
  }
  if (self) {
    if (Array.isArray(self)) result = [...result, ...self]
    else if (self.constructor == Object) result = [...result, self]
  }
  return result
}

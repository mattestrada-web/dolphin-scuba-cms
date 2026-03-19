import {useEffect} from 'react'
import {PatchEvent, set} from 'sanity'

const CATEGORY = {
  CONSOLE: 'cdeb2713-a87e-4939-bc7d-b808f08cb609',
  BC: '63422239-2494-449a-8f55-59678f95565d',
  REGULATOR: 'bf303b98-27e0-47e6-90a6-3e2e73124018',
  LIFE_SUPPORT: '10c65c0e-720c-4a9b-a6ee-4d6628383b7b',
}

export default function CategoryAutoLink(props: any) {
  const {value = [], onChange} = props

  useEffect(() => {
    const hasTriggerCategory = value.some((v: any) =>
      [CATEGORY.CONSOLE, CATEGORY.BC, CATEGORY.REGULATOR].includes(v?._ref)
    )

    const hasLifeSupport = value.some((v: any) => v?._ref === CATEGORY.LIFE_SUPPORT)

    if (hasTriggerCategory && !hasLifeSupport) {
      onChange(
        PatchEvent.from(
          set([
            ...value,
            {
              _key: 'auto-life-support',
              _type: 'reference',
              _ref: CATEGORY.LIFE_SUPPORT,
            },
          ])
        )
      )
    }
  }, [value, onChange])

  return props.renderDefault(props)
}

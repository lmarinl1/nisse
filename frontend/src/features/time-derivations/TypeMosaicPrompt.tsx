import * as Popover from '@radix-ui/react-popover'
import { useEffect, useRef, useState } from 'react'
import { DerivationTypeDetailCard } from './DerivationTypeDetailCard'
import type { MethodologicalDerivationType } from './taxonomy'

type Props = {
  type: MethodologicalDerivationType
}

export function TypeMosaicPrompt({ type }: Props) {
  const promptRef = useRef<HTMLParagraphElement>(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = promptRef.current
    if (!el) {
      return
    }
    const measure = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [type.prompt])

  return (
    <div className="td-type-mosaic__prompt-block">
      <p ref={promptRef} className="td-type-mosaic__prompt">
        {type.prompt}
      </p>
      {overflows ? (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button type="button" className="ghost td-type-mosaic__more">
              Ver más
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="td-popover"
              sideOffset={6}
              collisionPadding={12}
            >
              <DerivationTypeDetailCard type={type} mode="pista" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ) : null}
    </div>
  )
}

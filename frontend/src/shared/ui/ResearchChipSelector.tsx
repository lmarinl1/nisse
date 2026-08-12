import type { KeyboardEvent } from 'react'
import { Icon, type IconName } from '../icons'
import './research-chip-selector.css'

export type ResearchChipOption = {
  value: string
  label: string
  icon: IconName
}

export type ResearchChipSelectorProps = {
  options: readonly ResearchChipOption[]
  value: readonly string[]
  onChange: (next: string[]) => void
  'aria-label'?: string
  disabled?: boolean
}

export function ResearchChipSelector({
  options,
  value,
  onChange,
  'aria-label': ariaLabel = 'Selección múltiple',
  disabled,
}: ResearchChipSelectorProps) {
  const selected = new Set(value)

  function toggle(optionValue: string) {
    if (disabled) {
      return
    }
    if (selected.has(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
      return
    }
    onChange([...value, optionValue])
  }

  function onChipKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    optionValue: string,
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle(optionValue)
    }
  }

  return (
    <div
      className="research-chip-selector"
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      {options.map((option) => {
        const isOn = selected.has(option.value)
        return (
          <button
            key={option.value}
            type="button"
            className={[
              'research-chip-selector__chip',
              isOn ? 'research-chip-selector__chip--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={isOn}
            disabled={disabled}
            onClick={() => toggle(option.value)}
            onKeyDown={(e) => onChipKeyDown(e, option.value)}
          >
            <Icon
              name={option.icon}
              size="sm"
              className="research-chip-selector__icon"
              title=""
              aria-hidden
            />
            <span className="research-chip-selector__label">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

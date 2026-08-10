import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '../icons'
import './research-select.css'

export type ResearchSelectOption = {
  value: string
  label: string
}

type ResearchSelectProps = {
  id?: string
  value: string
  onValueChange: (value: string) => void
  options: readonly ResearchSelectOption[]
  placeholder?: string
  'aria-label'?: string
  disabled?: boolean
}

export function ResearchSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = 'Seleccionar…',
  'aria-label': ariaLabel,
  disabled,
}: ResearchSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Select.Trigger
        id={id}
        className="research-select__trigger"
        aria-label={ariaLabel}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="research-select__icon">
          <ChevronDownIcon size="sm" title="" aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="research-select__content"
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="research-select__viewport">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="research-select__item"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

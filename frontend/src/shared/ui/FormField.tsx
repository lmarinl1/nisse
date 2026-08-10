import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor?: string
  optional?: boolean
  hint?: ReactNode
  error?: string | null
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  optional,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div
      className={['research-field', className].filter(Boolean).join(' ')}
    >
      <div className="research-field__label-row">
        <label htmlFor={htmlFor}>{label}</label>
        {optional ? (
          <span className="research-field__optional">(opcional)</span>
        ) : null}
      </div>
      {children}
      {hint ? <div className="research-drawer__hint">{hint}</div> : null}
      {error ? (
        <p className="research-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

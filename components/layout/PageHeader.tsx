interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6 md:mb-8">
      <h1 className="font-heading text-2xl font-bold text-ink md:text-3xl">{title}</h1>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-muted md:text-base">{description}</p>
      )}
    </header>
  )
}

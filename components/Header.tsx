type Props = {
  title: string
  subtitle: string
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-light tracking-wide">
        {title}
      </h1>

      <p className="text-zinc-500 text-sm mt-3">
        {subtitle}
      </p>
    </div>
  )
}
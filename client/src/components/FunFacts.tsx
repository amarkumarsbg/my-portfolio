import { useCountUp } from '../hooks/useCountUp'

const facts = [
  { value: 500, suffix: '+', label: 'Cups of Coffee', icon: '☕' },
  { value: 1000, suffix: '+', label: 'Git Commits', icon: '💻' },
  { value: 75, suffix: '+', label: 'Projects Built', icon: '🚀' },
  { value: 3, suffix: ' AM', label: 'Avg Debug Time', icon: '🌙' },
]

export function FunFacts() {
  return (
    <div className="funfacts">
      {facts.map((fact) => (
        <FactItem key={fact.label} fact={fact} />
      ))}
    </div>
  )
}

function FactItem({ fact }: { fact: (typeof facts)[number] }) {
  const { count, ref } = useCountUp(fact.value)

  return (
    <div className="funfact-item" ref={ref}>
      <span className="funfact-icon">{fact.icon}</span>
      <span className="funfact-value">
        {count}
        {fact.suffix}
      </span>
      <span className="funfact-label">{fact.label}</span>
    </div>
  )
}

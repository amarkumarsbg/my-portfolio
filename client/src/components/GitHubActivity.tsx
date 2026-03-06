import { useScrollReveal } from '../hooks/useScrollReveal'

const WEEKS = 52
const DAYS = 7

function generateMockData(): number[][] {
  const data: number[][] = []
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = []
    for (let d = 0; d < DAYS; d++) {
      const rand = Math.random()
      if (rand < 0.3) week.push(0)
      else if (rand < 0.55) week.push(1)
      else if (rand < 0.78) week.push(2)
      else if (rand < 0.92) week.push(3)
      else week.push(4)
    }
    data.push(week)
  }
  return data
}

const LEVELS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const LEVELS_LIGHT = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']

const activityData = generateMockData()

export function GitHubActivity() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div className="github-activity" ref={ref}>
      <h3 className="github-activity-title">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub Contributions
      </h3>
      <div className="contribution-graph">
        {activityData.map((week, wi) => (
          <div className="contribution-week" key={wi}>
            {week.map((level, di) => (
              <div
                key={di}
                className="contribution-cell"
                data-level={level}
                style={{
                  // @ts-expect-error CSS custom properties
                  '--cell-dark': LEVELS[level],
                  '--cell-light': LEVELS_LIGHT[level],
                }}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="contribution-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="contribution-cell contribution-cell--legend"
            style={{
              // @ts-expect-error CSS custom properties
              '--cell-dark': LEVELS[l],
              '--cell-light': LEVELS_LIGHT[l],
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

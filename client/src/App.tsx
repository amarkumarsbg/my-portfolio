import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { About } from './components/About'
import { BackToTop } from './components/BackToTop'
import { ChatWidget } from './components/ChatWidget'
import { Contact } from './components/Contact'
import { Certifications } from './components/Certifications'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Preloader } from './components/Preloader'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Blog } from './components/Blog'
import { BlogArticle } from './components/BlogArticle'
import { Testimonials } from './components/Testimonials'
import { ProjectCaseStudy } from './components/ProjectCaseStudy'
import { PortfolioDataProvider } from './context/PortfolioData'
import { config } from './config/env'
import {
  AdminCollectionPage,
  AdminInboxPage,
  AdminOverview,
  AdminSettingsPage,
} from './components/AdminPages'
import { useTheme } from './hooks/useTheme'
import './admin.css'

type SessionState = 'loading' | 'authenticated' | 'anonymous'

function AdminThemeToggle() {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      className="admin-theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {theme === 'dark' ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z" />
        </svg>
      )}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}

function PublicPortfolio() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const sectionId = decodeURIComponent(hash.slice(1))
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`
    )
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <PortfolioDataProvider>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Certifications />
        <Experience />
        <Projects />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </PortfolioDataProvider>
  )
}

type PublicSection =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'contact'
  | 'services'
  | 'certifications'
  | 'testimonials'
  | 'blog'

function PublicSectionPage({ section }: { section: PublicSection }) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const sections: Record<PublicSection, ReactNode> = {
    about: <About />,
    skills: <Skills />,
    experience: <Experience />,
    projects: <Projects />,
    contact: <Contact />,
    services: <Services />,
    certifications: <Certifications />,
    testimonials: <Testimonials />,
    blog: <Blog />,
  }

  return (
    <PortfolioDataProvider>
      <Header key={location.pathname} />
      <main>{sections[section]}</main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </PortfolioDataProvider>
  )
}

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const response = await fetch(`${config.apiUrl}/admin/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Unable to sign in')
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the admin service'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-actions">
          <Link className="admin-back-link" to="/">
            ← Back to portfolio
          </Link>
          <AdminThemeToggle />
        </div>
        <div className="admin-eyebrow">PORTFOLIO ADMIN</div>
        <h1>Welcome back</h1>
        <p>Sign in to manage your portfolio.</p>
        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="admin-error" role="alert">
            {error}
          </div>
        )}
        <button className="admin-primary-button" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>('loading')
  useEffect(() => {
    let active = true
    fetch(`${config.apiUrl}/admin/auth/me`, { credentials: 'include' })
      .then((response) => {
        if (active) setSession(response.ok ? 'authenticated' : 'anonymous')
      })
      .catch(() => {
        if (active) setSession('anonymous')
      })
    return () => {
      active = false
    }
  }, [])
  if (session === 'loading')
    return <div className="admin-loading">Checking your session…</div>
  if (session === 'anonymous') return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pageName =
    location.pathname.split('/').filter(Boolean).at(-1) ?? 'admin'
  const pageLabel =
    pageName === 'admin'
      ? 'Overview'
      : pageName === 'inbox'
        ? 'Contact messages'
        : pageName
            .replace(/-/g, ' ')
            .replace(/^./, (letter) => letter.toUpperCase())
  async function logout() {
    await fetch(`${config.apiUrl}/admin/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => undefined)
    navigate('/admin/login', { replace: true })
  }
  return (
    <div className="admin-shell">
      {mobileNavOpen && (
        <button
          className="admin-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <aside
        className={`admin-sidebar ${mobileNavOpen ? 'admin-sidebar-open' : ''}`}
      >
        <Link
          className="admin-brand"
          to="/admin"
          onClick={() => setMobileNavOpen(false)}
        >
          <span>AM</span> Portfolio CMS
        </Link>
        <div className="admin-nav-label">WORKSPACE</div>
        <nav>
          <NavLink end to="/admin" onClick={() => setMobileNavOpen(false)}>
            Overview
          </NavLink>
          <NavLink to="/admin/settings" onClick={() => setMobileNavOpen(false)}>
            Site & profile
          </NavLink>
          <NavLink to="/admin/projects" onClick={() => setMobileNavOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/admin/skills" onClick={() => setMobileNavOpen(false)}>
            Skills
          </NavLink>
          <NavLink to="/admin/services" onClick={() => setMobileNavOpen(false)}>
            Services
          </NavLink>
          <NavLink
            to="/admin/experience"
            onClick={() => setMobileNavOpen(false)}
          >
            Experience
          </NavLink>
          <NavLink
            to="/admin/certifications"
            onClick={() => setMobileNavOpen(false)}
          >
            Certifications
          </NavLink>
          <NavLink
            to="/admin/testimonials"
            onClick={() => setMobileNavOpen(false)}
          >
            Testimonials
          </NavLink>
          <NavLink to="/admin/blog" onClick={() => setMobileNavOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/admin/inbox" onClick={() => setMobileNavOpen(false)}>
            Contact messages
          </NavLink>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" onClick={() => setMobileNavOpen(false)}>
            View portfolio ↗
          </Link>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span aria-hidden="true">☰</span>
          </button>
          <div>
            <span>Workspace</span>
            <b> / {pageLabel}</b>
          </div>
          <div className="admin-topbar-actions">
            <AdminThemeToggle />
            <button onClick={logout}>Sign out</button>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </section>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPortfolio />} />
      <Route path="/about" element={<PublicSectionPage section="about" />} />
      <Route path="/skills" element={<PublicSectionPage section="skills" />} />
      <Route
        path="/experience"
        element={<PublicSectionPage section="experience" />}
      />
      <Route
        path="/projects"
        element={<PublicSectionPage section="projects" />}
      />
      <Route
        path="/projects/mydetailos"
        element={
          <PortfolioDataProvider>
            <Header />
            <ProjectCaseStudy project="mydetailos" />
            <Footer />
            <BackToTop />
            <ChatWidget />
          </PortfolioDataProvider>
        }
      />
      <Route
        path="/projects/sk-academy"
        element={
          <PortfolioDataProvider>
            <Header />
            <ProjectCaseStudy project="sk-academy" />
            <Footer />
            <BackToTop />
            <ChatWidget />
          </PortfolioDataProvider>
        }
      />
      <Route
        path="/contact"
        element={<PublicSectionPage section="contact" />}
      />
      <Route
        path="/services"
        element={<PublicSectionPage section="services" />}
      />
      <Route
        path="/certifications"
        element={<PublicSectionPage section="certifications" />}
      />
      <Route
        path="/testimonials"
        element={<PublicSectionPage section="testimonials" />}
      />
      <Route path="/blog" element={<PublicSectionPage section="blog" />} />
      <Route
        path="/blog/:slug"
        element={
          <PortfolioDataProvider>
            <BlogArticle />
          </PortfolioDataProvider>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route
          path="projects"
          element={<AdminCollectionPage type="projects" />}
        />
        <Route path="skills" element={<AdminCollectionPage type="skills" />} />
        <Route
          path="services"
          element={<AdminCollectionPage type="services" />}
        />
        <Route
          path="experience"
          element={<AdminCollectionPage type="experience" />}
        />
        <Route
          path="certifications"
          element={<AdminCollectionPage type="certifications" />}
        />
        <Route
          path="testimonials"
          element={<AdminCollectionPage type="testimonials" />}
        />
        <Route path="blog" element={<AdminCollectionPage type="blog" />} />
        <Route path="inbox" element={<AdminInboxPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

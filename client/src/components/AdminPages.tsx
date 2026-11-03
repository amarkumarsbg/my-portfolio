import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../config/env'
import { usePortfolioData } from '../context/PortfolioData'

type RecordData = Record<string, unknown> & { _id?: string; createdAt?: string }
type Field = {
  name: string
  label: string
  kind?: 'text' | 'textarea' | 'number' | 'boolean' | 'list' | 'file'
}
type CollectionConfig = { title: string; fields: Field[]; columns: string[] }

const collectionConfig: Record<string, CollectionConfig> = {
  projects: {
    title: 'Projects',
    columns: ['title', 'techStack', 'isPublished'],
    fields: [
      { name: 'title', label: 'Project title' },
      { name: 'description', label: 'Description', kind: 'textarea' },
      { name: 'imageUrl', label: 'Image URL', kind: 'file' },
      { name: 'liveUrl', label: 'Live preview URL' },
      { name: 'repoUrl', label: 'Repository URL' },
      {
        name: 'techStack',
        label: 'Technologies (comma separated)',
        kind: 'list',
      },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isFeatured', label: 'Featured', kind: 'boolean' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  skills: {
    title: 'Skills',
    columns: ['name', 'category', 'isPublished'],
    fields: [
      { name: 'name', label: 'Skill name' },
      { name: 'category', label: 'Category' },
      { name: 'iconUrl', label: 'Icon URL', kind: 'file' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  services: {
    title: 'Services',
    columns: ['title', 'description', 'isPublished'],
    fields: [
      { name: 'title', label: 'Service title' },
      { name: 'description', label: 'Description', kind: 'textarea' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  experience: {
    title: 'Experience',
    columns: ['role', 'company', 'period'],
    fields: [
      { name: 'role', label: 'Role' },
      { name: 'company', label: 'Company' },
      { name: 'period', label: 'Period' },
      { name: 'description', label: 'Description', kind: 'textarea' },
      { name: 'tech', label: 'Technologies (comma separated)', kind: 'list' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  certifications: {
    title: 'Certifications',
    columns: ['title', 'issuer', 'year'],
    fields: [
      { name: 'title', label: 'Certificate title' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'year', label: 'Year' },
      { name: 'iconUrl', label: 'Icon URL', kind: 'file' },
      { name: 'credentialUrl', label: 'Credential URL' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    columns: ['name', 'role', 'isPublished'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'role', label: 'Role' },
      { name: 'text', label: 'Testimonial', kind: 'textarea' },
      { name: 'avatar', label: 'Avatar initials' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
  blog: {
    title: 'Blog posts',
    columns: ['title', 'tag', 'date', 'isPublished'],
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'slug', label: 'URL slug' },
      { name: 'excerpt', label: 'Excerpt', kind: 'textarea' },
      { name: 'content', label: 'Article content', kind: 'textarea' },
      { name: 'date', label: 'Date' },
      { name: 'readTime', label: 'Read time' },
      { name: 'tag', label: 'Tag' },
      { name: 'coverImageUrl', label: 'Cover image', kind: 'file' },
      { name: 'order', label: 'Display order', kind: 'number' },
      { name: 'isPublished', label: 'Published', kind: 'boolean' },
    ],
  },
}

async function adminRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers)
  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json')
  }
  const response = await fetch(`${config.apiUrl}/admin/${path}`, {
    ...init,
    credentials: 'include',
    headers,
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Request failed')
  }
  if (response.status === 204) return undefined as T
  const data = await response.json()
  const method = (init.method ?? 'GET').toUpperCase()
  if (method !== 'GET' && path.startsWith('content/')) {
    localStorage.setItem('portfolio-cms-updated-at', String(Date.now()))
  }
  return data
}

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Published' : 'Draft'
  return String(value ?? '—')
}

function emptyForm(configItem: CollectionConfig) {
  return Object.fromEntries(
    configItem.fields.map((field) => [
      field.name,
      field.kind === 'boolean' ? true : field.kind === 'number' ? 0 : '',
    ])
  ) as Record<string, string | boolean | number>
}

function formFromRecord(item: RecordData, configItem: CollectionConfig) {
  const result = emptyForm(configItem)
  for (const field of configItem.fields) {
    const value = item[field.name]
    if (field.kind === 'list')
      result[field.name] = Array.isArray(value) ? value.join(', ') : ''
    else if (field.kind === 'boolean') result[field.name] = value !== false
    else
      result[field.name] =
        typeof value === 'number' ? value : String(value ?? '')
  }
  return result
}

function normalizeForm(
  form: Record<string, string | boolean | number>,
  configItem: CollectionConfig
) {
  return Object.fromEntries(
    configItem.fields.map((field) => {
      const value = form[field.name]
      if (field.kind === 'list')
        return [
          field.name,
          String(value)
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
        ]
      if (field.kind === 'number') return [field.name, Number(value) || 0]
      if (field.kind === 'boolean') return [field.name, Boolean(value)]
      return [field.name, value]
    })
  )
}

export function AdminOverview() {
  const [metrics, setMetrics] = useState<{
    db: string
    counts: Record<string, number>
  }>({ db: 'loading', counts: {} })
  const [seedMessage, setSeedMessage] = useState('')
  const [seedBusy, setSeedBusy] = useState(false)
  useEffect(() => {
    adminRequest<typeof metrics>('content/dashboard/metrics')
      .then(setMetrics)
      .catch(() => setMetrics({ db: 'offline', counts: {} }))
  }, [])
  async function seedContent() {
    setSeedBusy(true)
    setSeedMessage('')
    try {
      const result = await adminRequest<{ message: string }>(
        'content/seed-starter-content',
        { method: 'POST', body: '{}' }
      )
      setSeedMessage(result.message)
      setMetrics(
        await adminRequest<typeof metrics>('content/dashboard/metrics')
      )
      localStorage.setItem('portfolio-cms-updated-at', String(Date.now()))
    } catch (err) {
      setSeedMessage(
        err instanceof Error ? err.message : 'Could not import starter content'
      )
    } finally {
      setSeedBusy(false)
    }
  }
  const cards = [
    ['Projects', metrics.counts.projects ?? 0],
    ['Unread messages', metrics.counts.unread ?? 0],
    ['Published skills', metrics.counts.skills ?? 0],
    ['Published services', metrics.counts.services ?? 0],
  ]
  return (
    <>
      <div className="admin-eyebrow">YOUR WORKSPACE</div>
      <h1>Portfolio overview</h1>
      <p className="admin-subtitle">
        Manage your public portfolio from one place.
      </p>
      <div className="admin-status-grid admin-metrics-grid">
        {cards.map(([label, value]) => (
          <article key={String(label)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="admin-welcome-card">
        <div className="admin-card-icon">●</div>
        <div>
          <h2>
            Database{' '}
            {metrics.db === 'connected'
              ? 'connected'
              : metrics.db === 'loading'
                ? 'checking…'
                : 'unavailable'}
          </h2>
          <p>
            {metrics.db === 'connected'
              ? 'Edits are saved to MongoDB and appear on the public site.'
              : 'The public portfolio keeps using its local fallback content while MongoDB is unavailable.'}
          </p>
        </div>
      </div>
      <div className="admin-quick-links">
        <Link to="/admin/projects">Manage projects →</Link>
        <Link to="/admin/settings">Edit profile and SEO →</Link>
        <Link to="/admin/inbox">Open message inbox →</Link>
      </div>
      <div className="admin-seed-row">
        <div>
          <h2>First time setup</h2>
          <p>
            Import starter portfolio content into any empty collections.
            Existing database records are preserved.
          </p>
          {seedMessage && <small>{seedMessage}</small>}
        </div>
        <button
          className="admin-secondary-button"
          onClick={() => void seedContent()}
          disabled={seedBusy || metrics.db !== 'connected'}
        >
          {seedBusy ? 'Importing…' : 'Import starter content'}
        </button>
      </div>
    </>
  )
}

export function AdminCollectionPage({ type }: { type: string }) {
  const page = collectionConfig[type]
  const [items, setItems] = useState<RecordData[]>([])
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<RecordData | null>(null)
  const [form, setForm] = useState<Record<string, string | boolean | number>>(
    {}
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async () => {
    try {
      setItems(await adminRequest<RecordData[]>(`content/${type}`))
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load content')
    }
  }, [type])
  useEffect(() => {
    void load()
  }, [load])
  if (!page) return <p>Unknown content section.</p>
  const filtered = items.filter((item) =>
    page.columns.some((column) =>
      displayValue(item[column]).toLowerCase().includes(search.toLowerCase())
    )
  )

  function startEdit(item: RecordData | null) {
    setEditing(item ?? {})
    setForm(item ? formFromRecord(item, page) : emptyForm(page))
    setError('')
  }
  async function save(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const payload = JSON.stringify(normalizeForm(form, page))
      if (editing?._id)
        await adminRequest(`content/${type}/${editing._id}`, {
          method: 'PATCH',
          body: payload,
        })
      else
        await adminRequest(`content/${type}`, { method: 'POST', body: payload })
      setEditing(null)
      setNotice(
        'Saved. The public site will show published changes on refresh.'
      )
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save')
    } finally {
      setBusy(false)
    }
  }
  async function remove(item: RecordData) {
    if (
      !item._id ||
      !window.confirm(
        `Delete “${String(item.title ?? item.name ?? item.role)}”?`
      )
    )
      return
    try {
      await adminRequest(`content/${type}/${item._id}`, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete')
    }
  }

  async function importFeaturedProjects() {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const result = await adminRequest<{ message: string }>(
        'content/import-featured-projects',
        { method: 'POST', body: '{}' }
      )
      setNotice(result.message)
      await load()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not import featured projects'
      )
    } finally {
      setBusy(false)
    }
  }

  async function syncResumeExperience() {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const result = await adminRequest<{ message: string }>(
        'content/sync-resume-experience',
        { method: 'POST', body: '{}' }
      )
      setNotice(result.message)
      await load()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not update experience'
      )
    } finally {
      setBusy(false)
    }
  }

  async function importResumeSkills() {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const result = await adminRequest<{ message: string }>(
        'content/import-resume-skills',
        { method: 'POST', body: '{}' }
      )
      setNotice(result.message)
      await load()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not add resume skills'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <div className="admin-eyebrow">CONTENT</div>
          <h1>{page.title}</h1>
          <p className="admin-subtitle">
            Create, edit, publish, and order your {page.title.toLowerCase()}.
          </p>
        </div>
        <div className="admin-page-heading-actions">
          {type === 'projects' && (
            <button
              className="admin-secondary-button"
              onClick={() => void importFeaturedProjects()}
              disabled={busy}
            >
              {busy ? 'Adding…' : 'Add my featured projects'}
            </button>
          )}
          {type === 'experience' && (
            <button
              className="admin-secondary-button"
              onClick={() => void syncResumeExperience()}
              disabled={busy}
            >
              {busy ? 'Updating…' : 'Update from resume'}
            </button>
          )}
          {type === 'skills' && (
            <button
              className="admin-secondary-button"
              onClick={() => void importResumeSkills()}
              disabled={busy}
            >
              {busy ? 'Adding…' : 'Add skills from resume'}
            </button>
          )}
          <button
            className="admin-primary-button admin-action-button"
            onClick={() => startEdit(null)}
          >
            ＋ Add {page.title.slice(0, -1)}
          </button>
        </div>
      </div>
      <div className="admin-toolbar">
        <input
          placeholder={`Search ${page.title.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>{items.length} items</span>
      </div>
      {error && <p className="admin-error admin-notice">{error}</p>}
      {notice && <p className="admin-success">{notice}</p>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {page.columns.map((column) => (
                <th key={column}>
                  {column
                    .replace(/[A-Z]/g, (letter) => ` ${letter}`)
                    .toUpperCase()}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item._id}>
                {page.columns.map((column) => (
                  <td key={column}>
                    {column === 'imageUrl' &&
                    typeof item[column] === 'string' ? (
                      <img
                        className="admin-thumb"
                        src={String(item[column])}
                        alt=""
                      />
                    ) : (
                      displayValue(item[column])
                    )}
                  </td>
                ))}
                <td className="admin-row-actions">
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button
                    className="admin-danger-text"
                    onClick={() => void remove(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={page.columns.length + 1} className="admin-empty">
                  {error
                    ? 'Unable to load content.'
                    : 'No records yet. Add your first item.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editing && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEditing(null)
          }}
        >
          <form className="admin-edit-form" onSubmit={save}>
            <div className="admin-modal-header">
              <div>
                <div className="admin-eyebrow">
                  {editing._id ? 'EDIT ENTRY' : 'NEW ENTRY'}
                </div>
                <h2>
                  {editing._id ? 'Edit' : 'Add'} {page.title.slice(0, -1)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="admin-form-grid">
              {page.fields.map((field) => (
                <AdminField
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, [field.name]: value }))
                  }
                />
              ))}
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="admin-primary-button admin-action-button"
                disabled={busy}
              >
                {busy ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

function AdminField({
  field,
  value,
  onChange,
}: {
  field: Field
  value: string | boolean | number | undefined
  onChange: (value: string | boolean | number) => void
}) {
  if (field.kind === 'boolean')
    return (
      <label className="admin-check-field">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        {field.label}
      </label>
    )
  const inputProps = {
    value: String(value ?? ''),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(
        field.kind === 'number' ? Number(e.target.value) : e.target.value
      ),
  }
  return (
    <label
      className={`admin-field ${field.kind === 'textarea' ? 'admin-field-wide' : ''}`}
    >
      <span>{field.label}</span>
      {field.kind === 'textarea' ? (
        <textarea rows={4} {...inputProps} />
      ) : field.kind === 'file' ? (
        <UploadableInput value={String(value ?? '')} onChange={onChange} />
      ) : (
        <input
          type={field.kind === 'number' ? 'number' : 'text'}
          {...inputProps}
        />
      )}
    </label>
  )
}

function UploadableInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const body = new FormData()
    body.append('file', file)
    try {
      const result = await adminRequest<{ url: string }>('media/upload', {
        method: 'POST',
        body,
      })
      onChange(result.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }
  return (
    <>
      <div className="admin-upload-row">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL"
        />
        <label className="admin-upload-button">
          {uploading ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
            onChange={upload}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <small className="admin-error">{error}</small>}
    </>
  )
}

const settingFields: Field[] = [
  { name: 'name', label: 'Name' },
  { name: 'title', label: 'Professional title' },
  { name: 'email', label: 'Email' },
  { name: 'github', label: 'GitHub URL' },
  { name: 'linkedin', label: 'LinkedIn URL' },
  { name: 'avatarUrl', label: 'Avatar image', kind: 'file' },
  { name: 'resumeUrl', label: 'Resume file or URL', kind: 'file' },
  { name: 'bio', label: 'Bio', kind: 'textarea' },
  { name: 'seoTitle', label: 'SEO title' },
  { name: 'seoDescription', label: 'SEO description', kind: 'textarea' },
  {
    name: 'chatbotWelcomeMessage',
    label: 'Chat welcome message',
    kind: 'textarea',
  },
  {
    name: 'chatbotSystemPrompt',
    label: 'Chat system prompt',
    kind: 'textarea',
  },
]

export function AdminSettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    adminRequest<Record<string, unknown>>('content/settings')
      .then((data) =>
        setForm(
          Object.fromEntries(
            settingFields.map((field) => [
              field.name,
              String(data[field.name] ?? ''),
            ])
          )
        )
      )
      .catch((err) => setError(err.message))
  }, [])
  async function save(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setSaved(false)
    try {
      await adminRequest('content/settings', {
        method: 'PUT',
        body: JSON.stringify(form),
      })
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save settings')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <div className="admin-eyebrow">PUBLISHING</div>
      <h1>Site & profile settings</h1>
      <p className="admin-subtitle">
        These details appear across your public portfolio and chatbot.
      </p>
      <form className="admin-settings-form" onSubmit={save}>
        <div className="admin-form-grid">
          {settingFields.map((field) => (
            <AdminField
              key={field.name}
              field={field}
              value={form[field.name] ?? ''}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  [field.name]: String(value),
                }))
              }
            />
          ))}
        </div>
        {error && <p className="admin-error">{error}</p>}
        {saved && <p className="admin-success">Settings saved.</p>}
        <button
          className="admin-primary-button admin-action-button"
          disabled={busy}
        >
          {busy ? 'Saving…' : 'Save settings'}
        </button>
      </form>
    </>
  )
}

type InboxMessage = {
  _id: string
  name: string
  email: string
  message: string
  status: string
  createdAt: string
}

type AdminDropdownOption = { value: string; label: string }

function AdminDropdown({
  value,
  options,
  label,
  onChange,
  compact = false,
}: {
  value: string
  options: AdminDropdownOption[]
  label: string
  onChange: (value: string) => void
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  )

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    optionRefs.current[activeIndex]?.focus()
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, activeIndex])

  function moveFocus(nextIndex: number) {
    const wrapped = (nextIndex + options.length) % options.length
    setActiveIndex(wrapped)
    optionRefs.current[wrapped]?.focus()
  }

  const selected = options[selectedIndex]
  const menuId = `admin-dropdown-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <div
      className={`admin-dropdown ${compact ? 'admin-dropdown--compact' : ''} ${open ? 'admin-dropdown--open' : ''}`}
      ref={rootRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className="admin-dropdown-trigger"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (!open) setActiveIndex(selectedIndex)
          setOpen((current) => !current)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex(selectedIndex)
            setOpen(true)
          }
        }}
      >
        <span>{selected?.label}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>
      {open && (
        <div
          className="admin-dropdown-menu"
          id={menuId}
          role="listbox"
          aria-label={label}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              className={`admin-dropdown-option ${option.value === value ? 'admin-dropdown-option--selected' : ''}`}
              role="option"
              aria-selected={option.value === value}
              tabIndex={activeIndex === index ? 0 : -1}
              onFocus={() => setActiveIndex(index)}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
                triggerRef.current?.focus()
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  moveFocus(index + 1)
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  moveFocus(index - 1)
                } else if (event.key === 'Home') {
                  event.preventDefault()
                  moveFocus(0)
                } else if (event.key === 'End') {
                  event.preventDefault()
                  moveFocus(options.length - 1)
                }
              }}
            >
              <span>{option.label}</span>
              {option.value === value && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function AdminInboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([])
  const [status, setStatus] = useState('')
  const [query, setQuery] = useState('')
  const [unread, setUnread] = useState(0)
  const [error, setError] = useState('')
  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (query) params.set('q', query)
      const result = await adminRequest<{
        messages: InboxMessage[]
        unread: number
      }>(`inbox?${params}`)
      setMessages(result.messages)
      setUnread(result.unread)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load inbox')
    }
  }, [status, query])
  useEffect(() => {
    const timeout = setTimeout(() => void load(), 250)
    return () => clearTimeout(timeout)
  }, [load])
  async function updateStatus(id: string, next: string) {
    try {
      await adminRequest(`inbox/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: next }),
      })
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update message')
    }
  }
  async function remove(id: string) {
    if (!window.confirm('Delete this message permanently?')) return
    try {
      await adminRequest(`inbox/${id}`, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete message')
    }
  }
  return (
    <>
      <div className="admin-eyebrow">CONTACT</div>
      <h1>
        Contact messages{' '}
        <span className="admin-count-pill">{unread} unread</span>
      </h1>
      <p className="admin-subtitle">
        Search and manage messages sent through your portfolio.
      </p>
      <div className="admin-toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, message…"
        />
        <AdminDropdown
          label="Filter messages by status"
          value={status}
          onChange={setStatus}
          options={[
            { value: '', label: 'All statuses' },
            ...['unread', 'read', 'replied', 'archived'].map((item) => ({
              value: item,
              label: item[0].toUpperCase() + item.slice(1),
            })),
          ]}
        />
      </div>
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-inbox-list">
        {messages.map((message) => (
          <article
            className={`admin-message-card ${!message.status || message.status === 'unread' ? 'admin-message-card--unread' : ''}`}
            key={message._id}
          >
            <div className="admin-message-heading">
              <div>
                <h2>{message.name}</h2>
                <a href={`mailto:${message.email}`}>{message.email}</a>
              </div>
              <time>{new Date(message.createdAt).toLocaleString()}</time>
            </div>
            <p className="admin-message-body">{message.message}</p>
            <div className="admin-message-actions">
              <AdminDropdown
                label={`Message status for ${message.name}`}
                value={message.status || 'unread'}
                onChange={(next) => void updateStatus(message._id, next)}
                compact
                options={['unread', 'read', 'replied', 'archived'].map(
                  (item) => ({
                    value: item,
                    label: item[0].toUpperCase() + item.slice(1),
                  })
                )}
              />
              <a
                className="admin-secondary-button"
                href={`mailto:${message.email}?subject=${encodeURIComponent('Re: Portfolio message')}`}
              >
                Reply by email
              </a>
              <button
                className="admin-danger-text"
                onClick={() => void remove(message._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
        {!messages.length && !error && (
          <div className="admin-empty-card">Your inbox is empty.</div>
        )}
      </div>
    </>
  )
}

export function BlogReadPage() {
  const { blog } = usePortfolioData()
  const navigate = useNavigate()
  useEffect(() => {
    if (!blog.length) navigate('/', { replace: true })
  }, [blog.length, navigate])
  return <Link to="/blog">Return to articles</Link>
}

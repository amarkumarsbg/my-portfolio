import { dummyAbout } from '../data/dummy'

export function Contact() {
  return (
    <section className="section" id="contact">
      <h2 className="section-title">Contact</h2>
      <div className="contact-content">
        <p>Feel free to reach out. I&apos;m open to opportunities and chats.</p>
        <a href={`mailto:${dummyAbout.email}`} className="contact-email">
          {dummyAbout.email}
        </a>
      </div>
    </section>
  )
}

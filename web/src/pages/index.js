import React, { useState } from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import CustomCodeBlock from '../components/CustomCodeBlock'

const heroExample = `
import { createClient } from '@supabase/supabase-js'

// Connect to your own PostgreSQL database
const supabase = createClient('https://your-db.supabase.co', 'api-key')

// Receive updates when a new record is inserted into your database
const realtime = supabase
  .from('*')
  .on('INSERT', change => {
    console.log('Change received!', change)
  })
  .subscribe()
`.trim()
const subscribeExample = `
import { createClient } from '@supabase/supabase-js'

// Connect to the chat room 
const supabase = createClient('https://chat-room.supabase.co', '1a2b-3c4d-5e6f-7g8h')

// Get notified of all new chat messages
const realtime = supabase
  .from('messages')
  .on('INSERT', message => {
    console.log('New message!', message)
  })
  .subscribe()
`.trim()
const readExample = `
import { createClient } from '@supabase/supabase-js'

// Connect to the chat room 
const supabase = createClient('https://chat-room.supabase.co', '1a2b-3c4d-5e6f-7g8h')

// Get public rooms and their messages
const publicRooms = await supabase
  .from('rooms')
  .eq('public', true)
  .select(\`
    name,
    messages ( text )
  \`)
`.trim()
const createExample = `
import { createClient } from '@supabase/supabase-js'

// Connect to the chat room 
const supabase = createClient('https://chat-room.supabase.co', '1a2b-3c4d-5e6f-7g8h')

// Create a new chat room
const newRoom = await supabase
  .from('rooms')
  .insert({ name: 'Supabase Fan Club', public: true })
`.trim()
const updateExample = `
import { createClient } from '@supabase/supabase-js'

// Connect to the chat room 
const supabase = createClient('https://chat-room.supabase.co', '1a2b-3c4d-5e6f-7g8h')

// Update a user
const updatedUser = await supabase
  .from('users')
  .eq('username', 'kiwicopple')
  .update({ status: 'Online' })
`.trim()

const features = [
  {
    title: <>Chat apps</>,
    imageUrl: '',
    description: <>Build a realtime chat application using PostgreSQL and Expo</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Realtime dashboards</>,
    imageUrl: '',
    description: <>Build live dashboards using PostgreSQL and D3.js</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Logging</>,
    imageUrl: '',
    description: <>Log all your database changes to an immutable logging system</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Realtime Games</>,
    imageUrl: '',
    description: <>Keep all players in-sync with game actions and leader dashboards.</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Streaming analytics</>,
    imageUrl: '',
    description: <>Send actions and events to your data warehouses.</>,
    href: '/docs/guides/examples',
  },
  {
    title: <>Backoffice and Admin</>,
    imageUrl: '',
    description: <>Build admin dashboards without stressing about conflict resolution.</>,
    href: '/docs/guides/examples',
  },
]
const repos = [
  {
    title: <>Monorepo</>,
    description: (
      <>Website, docs, and client libraries. Follow to stay updated about our public Beta.</>
    ),
    href: 'https://github.com/supabase/monorepo',
    handle: 'supabase/monorepo',
    stars: 49,
  },
  {
    title: <>Realtime</>,
    description: (
      <>Listen to your to PostgreSQL database in realtime via websockets. Built with Elixir.</>
    ),
    href: 'https://github.com/supabase/realtime',
    handle: 'supabase/realtime',
    stars: 285,
  },
  {
    title: <>Schemas</>,
    description: <>An opensource repository of PostgreSQL schemas to get your projects started.</>,
    href: 'https://github.com/supabase/schemas',
    handle: 'supabase/schemas',
    stars: 3,
  },
]

function Feature({ imageUrl, title, description, href }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4 m-b-md', styles.feature)}>
      <Link className={classnames('card', styles.featureCard)} to={href}>
        <div className="card__body">
          {imgUrl && (
            <div className="">
              <img className={styles.featureImage} src={imgUrl} alt={title} />
            </div>
          )}
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  )
}
function GithubCard({ title, description, href, stars, handle }) {
  return (
    <div className={classnames('col', styles.feature)}>
      <a className={classnames('card', styles.githubCard)} href={href}>
        <div className="card__body">
          <h3>{title}</h3>
          <small>{description}</small>
        </div>
        <hr />
        <div className={classnames(styles.cardBase)}>
          <div>{handle}</div>
          <div>{stars} ★</div>
        </div>
      </a>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const [visibleCodeExample, showCodeExample] = useState('SUBSCRIBE')
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <main className="HomePage">
        {/* HEARDER */}
        <header className={classnames('hero', styles.heroBanner)}>
          <div className="container">
            <div className="row">
              <div className="col col--5">
                <h2 className="hero__title">{siteConfig.tagline}</h2>
                <p className="hero__subtitle">
                  Supabase adds realtime and RESTful APIs to your{' '}
                  <strong className="has-emphasis">existing</strong> PostgreSQL database without a
                  single line of code.
                </p>
                <div>
                  <Link
                    className={classnames(
                      'button hero--button button--md button--secondary button--outline responsive-button',
                      styles.button
                    )}
                    to={useBaseUrl('docs/about')}
                    style={{ marginLeft: 0, marginTop: 10 }}
                  >
                    Learn More
                  </Link>
                  <Link
                    className={classnames(
                      'button hero--button button--md button--primary responsive-button',
                      styles.button
                    )}
                    to={'https://github.com/supabase/monorepo'}
                    style={{ marginTop: 10 }}
                  >
                    Follow our GitHub →
                  </Link>
                </div>
              </div>
              <div className="col col--7">
                <CustomCodeBlock
                  header="Get notified of all new records in your database"
                  js={heroExample}
                />
              </div>
            </div>
          </div>
        </header>

        <section
          style={{
            padding: '50px 0',
          }}
          className="hero is--dark"
        >
          <div className="container text--center">{/* <small>CUSTOMER LOGOS</small> */}</div>
        </section>

        {/* For Devs */}
        <section className={styles.forDevelopers}>
          <div className="container">
            <div className={classnames('row', styles.responsiveCentered)}>
              <div className="col col--6 col--offset-3">
                <h2 className="with-underline">For Developers</h2>
                <p className="">
                  We introspect your database and provide APIs 
                  <strong className="has-emphasis">instantly</strong> so you can stop building
                  repetitive CRUD APIs and focus on building your products.
                </p>
              </div>
            </div>
            <div className="ForDevelopers">
              <div className="row">
                <div className="ButtonTabs col col--3">
                  <div>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'SUBSCRIBE' ? 'info is-active' : 'info'
                      }`}
                      onClick={() => showCodeExample('SUBSCRIBE')}
                    >
                      Realtime subscriptions
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'READ' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('READ')}
                    >
                      Get your data
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'CREATE' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('CREATE')}
                    >
                      Create a record
                    </button>
                    <button
                      className={`button button--${
                        visibleCodeExample === 'UPDATE' ? 'info is-active' : 'info '
                      }`}
                      onClick={() => showCodeExample('UPDATE')}
                    >
                      Update mulitple rows
                    </button>
                  </div>
                </div>
                <div className="col col--9 code-with-header">
                  {visibleCodeExample === 'SUBSCRIBE' && (
                    <CustomCodeBlock
                      header="Receive realtime messages in an example chat room"
                      js={subscribeExample}
                    />
                  )}
                  {visibleCodeExample === 'READ' && (
                    <CustomCodeBlock
                      header="Get all public rooms and their messages"
                      js={readExample}
                    />
                  )}
                  {visibleCodeExample === 'CREATE' && (
                    <CustomCodeBlock header="Create a new chat room" js={createExample} />
                  )}
                  {visibleCodeExample === 'UPDATE' && (
                    <CustomCodeBlock header="Update a user" js={updateExample} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className={styles.features}>
          <div className="container">
            <h2 className="with-underline">Use Cases</h2>
            <div className="row is-multiline">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        {/* OSS */}
        <section className={styles.forDevelopers}>
          <div className="container">
            <div className={classnames('row', styles.responsiveCentered)}>
              <div className="col col--6 col--offset-3">
                <h2 className="with-underline">Open source</h2>
                <p className="">
                  Follow us on <a href="https://github.com/supabase">GitHub</a>.{' '}
                  <strong>Watch</strong> the releases of each repo to get notified when we are ready
                  for Beta launch.
                </p>
              </div>
            </div>

            <div className="row">
              {repos.map((props, idx) => (
                <GithubCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 100,
            padding: '50px 0',
            borderTop: '1px solid var(--custom-border-color)',
          }}
          className="hero is--dark"
        >
          <div className="container text--center">
            {/* <div>
              <h2>Get Early Access</h2>
            </div> */}
            <div className="">
              <Link
                className={classnames(
                  'button hero--button button--outline button--md button--secondary responsive-button',
                  styles.button
                )}
                style={{ margin: 5 }}
                to={useBaseUrl('docs/about')}
              >
                Learn More
              </Link>
              <Link
                className={classnames(
                  'button hero--button button--md button--primary responsive-button',
                  styles.button
                )}
                to={'https://github.com/supabase/monorepo'}
                style={{ margin: 5 }}
              >
                Follow our GitHub →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Home

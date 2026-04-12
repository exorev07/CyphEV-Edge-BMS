export function Footer() {
  return (
    <footer style={{ padding: '0 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '75%' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '26px', fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            CYPH<span style={{ color: '#b18ddd' }}>EV</span>
          </span>
        </a>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 200, color: '#ffffffa4', margin: 0 }}>
          © 2025 Akshita Sondhi & Ekansh Arohi. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

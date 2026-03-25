export function Footer() {
  return (
    <footer style={{ padding: '0 24px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
        <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '26px', fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
          CYPH<span style={{ color: '#b18ddd' }}>EV</span>
        </span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#4b5563', margin: 0 }}>
          © 2025 Akshita Sondhi & Ekansh Arohi. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

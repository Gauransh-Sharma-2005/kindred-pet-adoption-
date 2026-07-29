export default function SuccessModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ background: '#fff', color: '#000', padding: '3rem', borderRadius: '32px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
        <span style={{ fontSize: '3.5rem' }}>🎉</span>
        <h3 style={{ margin: '1rem 0', fontSize: '1.7rem', fontWeight: 800 }}>Dossier Received!</h3>
        <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          Your request has been successfully processed through Kindred's smart shelter interface network.
        </p>
        <button onClick={onClose} style={{ padding: '0.6rem 2rem', borderRadius: '99px', border: 'none', background: '#2d251e', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Return to Hub</button>
      </div>
    </div>
  );
}

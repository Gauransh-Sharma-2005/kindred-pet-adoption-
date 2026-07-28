export default function QRCodeGenerator({ value }) {
  return (
    <div style={{ padding: '4px', background: '#ffffff', borderRadius: '8px', display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.06)' }}>
      <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 3H9V9H3V3ZM4.5 4.5H7.5V7.5H4.5V4.5Z" fill="#121212"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15 3H21V9H15V3ZM16.5 4.5H19.5V7.5H16.5V4.5Z" fill="#121212"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 15H9V21H3V15ZM4.5 16.5H7.5V19.5H4.5V16.5Z" fill="#121212"/>
        <path d="M13 3H14V5H13V3ZM11 7H13V8H11V7ZM13 10H14V13H11V11H13V10ZM15 15H16V18H15V15ZM19 19H21V21H19V19Z" fill="#ff6b35"/>
      </svg>
    </div>
  );
}

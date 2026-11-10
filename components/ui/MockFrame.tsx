export default function MockFrame({ label, active = true }: { label: string; active?: boolean }) {
  return (
    <svg className="mock-frame" viewBox="0 0 640 360" role="img" aria-label={`${label} — local simulated camera frame`}>
      <rect width="640" height="360" fill="#05070a" />
      <path d="M0 275 130 190 245 228 350 142 480 196 640 112V360H0Z" fill="#0c121d" />
      <path d="M0 275 130 190 245 228 350 142 480 196 640 112" fill="none" stroke="#263247" strokeWidth="2" />
      <g stroke="#1b2432" strokeWidth="1"><path d="M0 90h640M0 180h640M0 270h640"/><path d="M160 0v360M320 0v360M480 0v360"/></g>
      {active && <><rect x="420" y="102" width="86" height="128" fill="none" stroke="#d6a54a" strokeWidth="2"/><rect x="192" y="176" width="68" height="96" fill="none" stroke="#6f9be8" strokeWidth="2"/></>}
      <text x="18" y="28" fill="#9aa6b9" fontSize="13" fontFamily="system-ui">LOCAL MOCK • NO CCTV CONNECTION</text>
      <text x="18" y="338" fill="#e8ecf4" fontSize="14" fontFamily="system-ui">{label}</text>
    </svg>
  );
}

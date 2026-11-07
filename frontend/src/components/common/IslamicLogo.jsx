export default function IslamicLogo({ size = 32, className = '' }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-emerald-600 dark:text-emerald-400"
      >
        {/* Subtle geometric outer 8-point star (Rub el Hizb) */}
        <rect
          x="7"
          y="7"
          width="26"
          height="26"
          rx="3.5"
          className="stroke-current opacity-30 dark:opacity-40"
          strokeWidth="1.5"
        />
        <rect
          x="7"
          y="7"
          width="26"
          height="26"
          rx="3.5"
          transform="rotate(45 20 20)"
          className="stroke-current opacity-30 dark:opacity-40"
          strokeWidth="1.5"
        />

        {/* Central Dome & Minaret Silhouette */}
        <path
          d="M20 9C19.4 11 18.2 12.8 17 14.5C15.2 17 14 19.4 14 22C14 25.3 16.7 28 20 28C23.3 28 26 25.3 26 22C26 19.4 24.8 17 23 14.5C21.8 12.8 20.6 11 20 9Z"
          className="fill-current opacity-20 dark:opacity-30"
        />
        {/* Arch outline */}
        <path
          d="M15.5 29V23C15.5 19 18 16.5 20 14.5C22 16.5 24.5 19 24.5 23V29"
          className="stroke-current"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Mihrab inner arch */}
        <path
          d="M17.5 29V24.5C17.5 22.5 18.8 21 20 20C21.2 21 22.5 22.5 22.5 24.5V29"
          className="stroke-current"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crescent finial on apex */}
        <path
          d="M20 7.5C19.7 8.3 20 9.2 20.8 9.5C20.3 9.7 19.7 9.5 19.4 9C19.1 8.5 19.3 7.8 19.8 7.5"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="20" cy="7" r="0.75" className="fill-emerald-600 dark:fill-emerald-400" />
      </svg>
    </div>
  );
}


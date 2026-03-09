export default function Card({ title, children }) {
  // You can mix and match styling from 'vanilla' Tailwind & styling libraries like DaisyUI.
  //   e.g. h-full, shadow-md are from Tailwind,
  //   while card, bg-base-* are DaisyUI component classes
  return (
    <section className="h-full card bg-base-100 shadow-md">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="leading-relaxed font-bold text-sm text-gray-900">{title}</h2>
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}
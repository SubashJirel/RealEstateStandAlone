export function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg px-4 pt-10 pb-14 lg:max-w-none lg:px-10 lg:pt-12 lg:pb-16">
      <div className="rounded-2xl border border-light-border bg-surface-container-lowest p-4 shadow-high md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-on-surface-variant">
              Dashboard Overview
            </p>
            <p className="text-lg font-semibold text-on-surface">
              Today&apos;s Activity
            </p>
          </div>
          <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
            Live
          </span>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 md:gap-3">
          {[
            { label: "Leads", value: "24", color: "bg-[#e9f6fd]" },
            { label: "Site Visits", value: "8", color: "bg-[#faf7f0]" },
            { label: "Follow-ups", value: "12", color: "bg-[#f3ede3]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl ${stat.color} p-3 text-center`}
            >
              <p className="text-xl font-bold text-primary">{stat.value}</p>
              <p className="text-[10px] font-medium text-on-surface-variant md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { title: "3 BHK Apartment  Lazimpat", price: "NPR 2.5 Cr" },
            { title: "Land Plot  Bhaktapur", price: "NPR 45 Lakh" },
            { title: "Premium Villa  Budhanilkantha", price: "NPR 4.2 Cr" },
          ].map((property) => (
            <div
              key={property.title}
              className="flex items-center justify-between rounded-lg border border-light-border bg-cream/50 px-3 py-2.5"
            >
              <div>
                <p className="text-xs font-semibold text-on-surface md:text-sm">
                  {property.title}
                </p>
                <p className="text-[10px] text-on-surface-variant md:text-xs">
                  Active listing
                </p>
              </div>
              <span className="text-xs font-semibold text-deep-sage">
                {property.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-surface-container p-3">
          <p className="mb-2 text-xs font-medium text-on-surface-variant">
            Lead Trend (7 days)
          </p>
          <div className="flex h-16 items-end gap-1.5">
            {[40, 55, 35, 70, 50, 85, 65].map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-deep-sage/70"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -left-2 -top-4 hidden rounded-xl border border-light-border bg-white px-4 py-3 shadow-high md:block lg:-left-6">
        <p className="text-xs text-on-surface-variant">New Lead</p>
        <p className="text-sm font-semibold text-on-surface">WhatsApp Inquiry</p>
      </div>

      <div className="absolute -right-2 -bottom-4 hidden rounded-xl border border-light-border bg-white px-4 py-3 shadow-high md:block lg:-right-6">
        <p className="text-xs text-on-surface-variant">Site Visit</p>
        <p className="text-sm font-semibold text-on-surface">Scheduled Today</p>
      </div>
    </div>
  );
}
import { COMPARISON_ROWS } from "@/lib/data";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="text-deep-sage font-semibold" aria-label="Included">
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-outline-variant" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-sm font-medium text-on-surface">{value}</span>;
}

export function PlanComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-light-border bg-surface-container-lowest shadow-low">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-light-border bg-cream/50">
            <th className="px-4 py-4 text-sm font-semibold text-on-surface md:px-6">
              Feature
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-on-surface md:px-6">
              Basic
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-deep-sage md:px-6">
              Plus
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-on-surface md:px-6">
              Pro
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, index) => (
            <tr
              key={row.feature}
              className={index % 2 === 0 ? "bg-white" : "bg-cream/30"}
            >
              <td className="px-4 py-3.5 text-sm text-on-surface md:px-6">
                {row.feature}
              </td>
              <td className="px-4 py-3.5 text-center md:px-6">
                <CellValue value={row.basic} />
              </td>
              <td className="px-4 py-3.5 text-center md:px-6">
                <CellValue value={row.plus} />
              </td>
              <td className="px-4 py-3.5 text-center md:px-6">
                <CellValue value={row.pro} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

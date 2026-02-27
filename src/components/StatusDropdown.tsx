type Status = "Pending" | "Verified" | "Shipped";

interface StatusDropdownProps {
  value: Status;
  onChange?: (value: Status) => void;
  disabled?: boolean;
}

const options: Status[] = ["Pending", "Verified", "Shipped"];

export function StatusDropdown({
  value,
  onChange,
  disabled = false,
}: StatusDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value as Status)}
      disabled={disabled}
      className="min-w-[7.5rem] cursor-pointer appearance-none rounded-md border border-slate-600 bg-slate-700/80 py-1.5 pl-2.5 pr-7 text-sm text-slate-200 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2378818a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.4rem center",
        backgroundSize: "1rem",
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

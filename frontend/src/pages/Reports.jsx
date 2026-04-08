import React, { useState } from "react";
import { Search, Printer } from "lucide-react";

// ─── Mock Log Data ─────────────────────────────────────────────────────────────
const mockLogs = [
  {
    id: 100,
    timestamp: "2026-03-09 07:17:52",
    action: "added",
    item: "DDR4 8GB RAM",
    itemId: 1,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +30,
    by: "System",
  },
  {
    id: 101,
    timestamp: "2026-03-09 07:18:52",
    action: "added",
    item: "Intel Core i5-12400",
    itemId: 2,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +15,
    by: "System",
  },
  {
    id: 102,
    timestamp: "2026-03-09 07:19:52",
    action: "added",
    item: "500GB SSD",
    itemId: 3,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +20,
    by: "System",
  },
  {
    id: 103,
    timestamp: "2026-03-09 07:20:52",
    action: "added",
    item: "Windows 11 Pro License",
    itemId: 4,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +30,
    by: "System",
  },
  {
    id: 104,
    timestamp: "2026-03-09 07:21:52",
    action: "added",
    item: "Network Switch 24-port",
    itemId: 5,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +2,
    by: "System",
  },
  {
    id: 105,
    timestamp: "2026-03-09 07:22:52",
    action: "added",
    item: "Cleaning Kit",
    itemId: 6,
    field: null,
    oldValue: null,
    newValue: null,
    qtyDelta: +5,
    by: "System",
  },
  {
    id: 106,
    timestamp: "2026-03-12 05:37:52",
    action: "qty_decreased",
    item: "DDR4 8GB RAM",
    itemId: 1,
    field: "qty",
    oldValue: "30",
    newValue: "29",
    qtyDelta: -1,
    by: "System",
  },
  {
    id: 107,
    timestamp: "2026-03-12 05:38:52",
    action: "qty_decreased",
    item: "Intel Core i5-12400",
    itemId: 2,
    field: "qty",
    oldValue: "15",
    newValue: "14",
    qtyDelta: -1,
    by: "System",
  },
  {
    id: 108,
    timestamp: "2026-03-12 05:39:52",
    action: "qty_decreased",
    item: "500GB SSD",
    itemId: 3,
    field: "qty",
    oldValue: "20",
    newValue: "19",
    qtyDelta: -1,
    by: "System",
  },
];

const FILTERS = ["All", "Added", "Edited", "Deleted", "Assigned", "Restored"];

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, valueColor, sub }) => (
  <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 flex flex-col gap-2">
    <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
      {label}
    </span>
    <span className={`text-4xl font-bold ${valueColor}`}>{value}</span>
    <span className="text-xs text-zinc-500 font-mono">{sub}</span>
  </div>
);

// ─── Action Badge ──────────────────────────────────────────────────────────────
const ActionBadge = ({ action }) => {
  const map = {
    added: {
      label: "+ Added",
      cls: "bg-green-500/10 text-green-400 border border-green-500/20",
    },
    edited: {
      label: "✎ Edited",
      cls: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    },
    deleted: {
      label: "✕ Deleted",
      cls: "bg-red-500/10 text-red-400 border border-red-500/20",
    },
    assigned: {
      label: "→ Assigned",
      cls: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    },
    restored: {
      label: "↺ Restored",
      cls: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    },
    qty_decreased: {
      label: "↓ Qty Decreased",
      cls: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    qty_increased: {
      label: "↑ Qty Increased",
      cls: "bg-green-500/10 text-green-400 border border-green-500/20",
    },
  };
  const { label, cls } = map[action] ?? {
    label: action,
    cls: "bg-zinc-700 text-zinc-300",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
};

// ─── Value Pill ────────────────────────────────────────────────────────────────
const ValuePill = ({ value, variant }) => {
  if (!value) return <span className="text-zinc-600 text-sm">—</span>;
  const cls =
    variant === "old"
      ? "bg-red-500/10 text-red-400 border border-red-500/20"
      : "bg-green-500/10 text-green-400 border border-green-500/20";
  return (
    <span
      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${cls}`}
    >
      {value}
    </span>
  );
};

// ─── Reports Page ──────────────────────────────────────────────────────────────
const Reports = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Stats derived from mock data
  const totalEntries = mockLogs.length;
  const itemsAdded = mockLogs.filter((l) => l.action === "added").length;
  const itemsEdited = mockLogs.filter((l) => l.action === "edited").length;
  const itemsDeleted = mockLogs.filter((l) => l.action === "deleted").length;
  const qtyChanges = mockLogs.filter(
    (l) => l.action === "qty_decreased" || l.action === "qty_increased",
  ).length;

  const filtered = mockLogs.filter((log) => {
    const matchesFilter =
      activeFilter === "All" ||
      log.action === activeFilter.toLowerCase() ||
      (activeFilter === "Edited" && log.action === "edited") ||
      (activeFilter === "Deleted" && log.action === "deleted") ||
      (activeFilter === "Assigned" && log.action === "assigned") ||
      (activeFilter === "Restored" && log.action === "restored");

    const matchesSearch =
      log.item.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      {/* ── Top Navbar ── */}
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Inventory Logs</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Full audit trail of all inventory changes
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-150 cursor-pointer bg-cyan-500/20 text-cyan-400 font-semibold hover:bg-cyan-500/30"
        >
          <Printer size={18} className="shrink-0" />
          <span className="text-sm whitespace-nowrap">Print</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* ── Stat Cards ── */}
        <div className="flex gap-4">
          <StatCard
            label="Total Entries"
            value={totalEntries}
            valueColor="text-blue-400"
            sub="all time"
          />
          <StatCard
            label="Items Added"
            value={itemsAdded}
            valueColor="text-green-400"
            sub="add_item"
          />
          <StatCard
            label="Items Edited"
            value={itemsEdited}
            valueColor="text-amber-400"
            sub="edit_item"
          />
          <StatCard
            label="Items Deleted"
            value={itemsDeleted}
            valueColor="text-red-400"
            sub="delete_item"
          />
          <StatCard
            label="Qty Changes"
            value={qtyChanges}
            valueColor="text-zinc-100"
            sub="assign / restore"
          />
        </div>

        {/* ── Audit Trail Panel ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-zinc-100">
                Audit Trail
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                {filtered.length} entries
              </span>
              {/* Filter tabs */}
              <div className="flex items-center gap-1">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-150
                      ${
                        activeFilter === f
                          ? "bg-blue-600 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 w-56">
              <Search size={14} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none w-full"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  {[
                    "#",
                    "Timestamp",
                    "Action",
                    "Item",
                    "Field",
                    "Old Value",
                    "New Value",
                    "Qty Δ",
                    "By",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-zinc-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-10 text-center text-sm text-zinc-600"
                    >
                      No log entries found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((log, idx) => (
                    <tr
                      key={log.id}
                      className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/40
                        ${idx % 2 !== 0 ? "bg-zinc-800/20" : ""}`}
                    >
                      {/* # */}
                      <td className="px-5 py-3 text-xs text-zinc-500 font-mono">
                        {log.id}
                      </td>

                      {/* Timestamp */}
                      <td className="px-5 py-3 text-xs text-zinc-400 font-mono whitespace-nowrap">
                        {log.timestamp}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-3">
                        <ActionBadge action={log.action} />
                      </td>

                      {/* Item */}
                      <td className="px-5 py-3">
                        <p className="text-sm font-semibold text-zinc-100 whitespace-nowrap">
                          {log.item}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          ID #{log.itemId}
                        </p>
                      </td>

                      {/* Field */}
                      <td className="px-5 py-3">
                        {log.field ? (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {log.field}
                          </span>
                        ) : (
                          <span className="text-zinc-600 text-sm">—</span>
                        )}
                      </td>

                      {/* Old Value */}
                      <td className="px-5 py-3">
                        <ValuePill value={log.oldValue} variant="old" />
                      </td>

                      {/* New Value */}
                      <td className="px-5 py-3">
                        <ValuePill value={log.newValue} variant="new" />
                      </td>

                      {/* Qty Delta */}
                      <td className="px-5 py-3">
                        <span
                          className={`text-sm font-bold font-mono ${log.qtyDelta > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {log.qtyDelta > 0 ? `+${log.qtyDelta}` : log.qtyDelta}
                        </span>
                      </td>

                      {/* By */}
                      <td className="px-5 py-3 text-xs text-zinc-500">
                        {log.by}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

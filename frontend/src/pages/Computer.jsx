import React, { useState, useMemo } from 'react';
import {
  LaptopMinimal,
  CirclePlus,
  PencilIcon,
  Trash2Icon,
  X,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Cpu,
  MemoryStick,
  HardDrive,
  Building2,
} from 'lucide-react';

// ─── Mock data (30 computers across 5 labs) ───────────────────────────────────
const MOCK_COMPUTERS = [
  {
    id: 1,
    name: 'PC-001',
    model: 'Dell OptiPlex 7090',
    cpu: 'Intel i5-10400',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 1',
    slot: 'Slot 1',
    status: 'active',
  },
  {
    id: 2,
    name: 'PC-002',
    model: 'HP ProDesk 400 G7',
    cpu: 'Intel i3-8100',
    ram: '4 GB',
    storage: '128 GB HDD',
    lab: 'Lab 1',
    slot: 'Slot 2',
    status: 'maintenance',
  },
  {
    id: 3,
    name: 'PC-003',
    model: 'Dell OptiPlex 3080',
    cpu: 'Intel i5-10500T',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 1',
    slot: 'Slot 3',
    status: 'active',
  },
  {
    id: 4,
    name: 'PC-004',
    model: 'Lenovo ThinkCentre M70',
    cpu: 'AMD Ryzen 5 3400G',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 1',
    slot: 'Slot 4',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'PC-005',
    model: 'HP EliteDesk 800 G6',
    cpu: 'Intel i7-10700',
    ram: '32 GB',
    storage: '1 TB SSD',
    lab: 'Lab 1',
    slot: 'Slot 5',
    status: 'active',
  },
  {
    id: 6,
    name: 'PC-006',
    model: 'Acer Veriton X4',
    cpu: 'Intel i3-10100',
    ram: '4 GB',
    storage: '256 GB SSD',
    lab: 'Lab 1',
    slot: 'Slot 6',
    status: 'active',
  },
  {
    id: 7,
    name: 'PC-007',
    model: 'Dell OptiPlex 5090',
    cpu: 'Intel i5-11500',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 2',
    slot: 'Slot 1',
    status: 'active',
  },
  {
    id: 8,
    name: 'PC-008',
    model: 'HP ProDesk 600 G6',
    cpu: 'Intel i7-10700T',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 2',
    slot: 'Slot 2',
    status: 'active',
  },
  {
    id: 9,
    name: 'PC-009',
    model: 'Lenovo ThinkCentre M90',
    cpu: 'Intel i5-10400T',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 2',
    slot: 'Slot 3',
    status: 'inactive',
  },
  {
    id: 10,
    name: 'PC-010',
    model: 'Dell OptiPlex 7080',
    cpu: 'Intel i7-10700',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 2',
    slot: 'Slot 4',
    status: 'active',
  },
  {
    id: 11,
    name: 'PC-011',
    model: 'HP EliteDesk 705 G8',
    cpu: 'AMD Ryzen 7 4750G',
    ram: '32 GB',
    storage: '1 TB SSD',
    lab: 'Lab 2',
    slot: 'Slot 5',
    status: 'maintenance',
  },
  {
    id: 12,
    name: 'PC-012',
    model: 'Acer Veriton N4',
    cpu: 'Intel i3-10105',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 2',
    slot: 'Slot 6',
    status: 'active',
  },
  {
    id: 13,
    name: 'PC-013',
    model: 'Dell OptiPlex 3070',
    cpu: 'Intel i3-9100',
    ram: '4 GB',
    storage: '128 GB SSD',
    lab: 'Lab 3',
    slot: 'Slot 1',
    status: 'inactive',
  },
  {
    id: 14,
    name: 'PC-014',
    model: 'HP ProDesk 400 G6',
    cpu: 'Intel i5-9500',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 3',
    slot: 'Slot 2',
    status: 'active',
  },
  {
    id: 15,
    name: 'PC-015',
    model: 'Lenovo ThinkCentre M80',
    cpu: 'Intel i5-10500',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 3',
    slot: 'Slot 3',
    status: 'active',
  },
  {
    id: 16,
    name: 'PC-016',
    model: 'Dell OptiPlex 5080',
    cpu: 'Intel i5-10600',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 3',
    slot: 'Slot 4',
    status: 'maintenance',
  },
  {
    id: 17,
    name: 'PC-017',
    model: 'HP EliteDesk 800 G5',
    cpu: 'Intel i7-9700',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 3',
    slot: 'Slot 5',
    status: 'active',
  },
  {
    id: 18,
    name: 'PC-018',
    model: 'Acer Veriton X2',
    cpu: 'Intel i3-9100',
    ram: '4 GB',
    storage: '128 GB HDD',
    lab: 'Lab 3',
    slot: 'Slot 6',
    status: 'inactive',
  },
  {
    id: 19,
    name: 'PC-019',
    model: 'Dell OptiPlex 7070',
    cpu: 'Intel i7-9700',
    ram: '32 GB',
    storage: '1 TB SSD',
    lab: 'Lab 4',
    slot: 'Slot 1',
    status: 'active',
  },
  {
    id: 20,
    name: 'PC-020',
    model: 'HP ProDesk 600 G5',
    cpu: 'Intel i5-9500T',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 4',
    slot: 'Slot 2',
    status: 'active',
  },
  {
    id: 21,
    name: 'PC-021',
    model: 'Lenovo ThinkCentre M720',
    cpu: 'Intel i3-8100',
    ram: '4 GB',
    storage: '128 GB SSD',
    lab: 'Lab 4',
    slot: 'Slot 3',
    status: 'maintenance',
  },
  {
    id: 22,
    name: 'PC-022',
    model: 'Dell OptiPlex 3060',
    cpu: 'Intel i3-8100',
    ram: '4 GB',
    storage: '128 GB HDD',
    lab: 'Lab 4',
    slot: 'Slot 4',
    status: 'inactive',
  },
  {
    id: 23,
    name: 'PC-023',
    model: 'HP EliteDesk 705 G4',
    cpu: 'AMD Ryzen 5 2400G',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 4',
    slot: 'Slot 5',
    status: 'active',
  },
  {
    id: 24,
    name: 'PC-024',
    model: 'Acer Veriton M4',
    cpu: 'Intel i5-8500',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 4',
    slot: 'Slot 6',
    status: 'active',
  },
  {
    id: 25,
    name: 'PC-025',
    model: 'Dell OptiPlex 5060',
    cpu: 'Intel i5-8500',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 5',
    slot: 'Slot 1',
    status: 'active',
  },
  {
    id: 26,
    name: 'PC-026',
    model: 'HP ProDesk 400 G5',
    cpu: 'Intel i3-8100',
    ram: '4 GB',
    storage: '128 GB HDD',
    lab: 'Lab 5',
    slot: 'Slot 2',
    status: 'inactive',
  },
  {
    id: 27,
    name: 'PC-027',
    model: 'Lenovo ThinkCentre M710',
    cpu: 'Intel i5-7500',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 5',
    slot: 'Slot 3',
    status: 'active',
  },
  {
    id: 28,
    name: 'PC-028',
    model: 'Dell OptiPlex 3050',
    cpu: 'Intel i3-7100',
    ram: '4 GB',
    storage: '128 GB SSD',
    lab: 'Lab 5',
    slot: 'Slot 4',
    status: 'maintenance',
  },
  {
    id: 29,
    name: 'PC-029',
    model: 'HP EliteDesk 800 G3',
    cpu: 'Intel i7-7700',
    ram: '16 GB',
    storage: '512 GB SSD',
    lab: 'Lab 5',
    slot: 'Slot 5',
    status: 'active',
  },
  {
    id: 30,
    name: 'PC-030',
    model: 'Acer Veriton Z4',
    cpu: 'Intel i5-7400',
    ram: '8 GB',
    storage: '256 GB SSD',
    lab: 'Lab 5',
    slot: 'Slot 6',
    status: 'active',
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  active: {
    label: 'Active',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    badge: 'bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20',
  },
  maintenance: {
    label: 'Maintenance',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-400/10  text-amber-400  ring-1 ring-amber-400/20',
  },
  inactive: {
    label: 'Inactive',
    dot: 'bg-zinc-500',
    text: 'text-zinc-400',
    badge: 'bg-zinc-700/60   text-zinc-400   ring-1 ring-zinc-600/40',
  },
};

const STATUS_FILTERS = ['All', 'Active', 'Maintenance', 'Inactive'];
const PAGE_SIZE = 15;

const SORT_FIELDS = {
  name: (a, b) => a.name.localeCompare(b.name),
  lab: (a, b) => a.lab.localeCompare(b.lab) || a.slot.localeCompare(b.slot),
  model: (a, b) => a.model.localeCompare(b.model),
  status: (a, b) => a.status.localeCompare(b.status),
};

const EMPTY_FORM = {
  name: '',
  model: '',
  cpu: '',
  ram: '',
  storage: '',
  lab: '',
  slot: '',
  status: 'active',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inputCls =
  'w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-colors';
const labelCls = 'block text-xs font-medium text-zinc-400 mb-1.5';

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const SortIcon = ({ field, sortField, sortDir }) => {
  if (sortField !== field)
    return <ChevronUp size={12} className="text-zinc-700" />;
  return sortDir === 'asc' ? (
    <ChevronUp size={12} className="text-violet-400" />
  ) : (
    <ChevronDown size={12} className="text-violet-400" />
  );
};

const Th = ({ label, field, sortField, sortDir, onSort, className = '' }) => (
  <th
    onClick={() => onSort(field)}
    className={`px-3 py-2.5 text-left text-xs font-medium text-zinc-500 cursor-pointer select-none hover:text-zinc-300 transition-colors whitespace-nowrap ${className}`}>
    <span className="inline-flex items-center gap-1">
      {label}
      <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
    </span>
  </th>
);

const Field = ({ label, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

// ─── Row expand detail ────────────────────────────────────────────────────────
const ExpandedRow = ({ computer, colSpan }) => (
  <tr className="bg-zinc-950/60">
    <td colSpan={colSpan} className="px-4 py-3">
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Cpu size={12} className="text-zinc-500" />
          {computer.cpu}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <MemoryStick size={12} className="text-zinc-500" />
          {computer.ram}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <HardDrive size={12} className="text-zinc-500" />
          {computer.storage}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Building2 size={12} className="text-zinc-500" />
          {computer.lab} · {computer.slot}
        </div>
      </div>
    </td>
  </tr>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const ComputerModal = ({
  isOpen,
  onClose,
  onSubmit,
  editTarget,
  labOptions,
}) => {
  const isEdit = !!editTarget;
  const [form, setForm] = useState(EMPTY_FORM);

  React.useEffect(() => {
    setForm(editTarget ?? EMPTY_FORM);
  }, [editTarget, isOpen]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-zinc-100">
            {isEdit ? 'Edit Computer' : 'Add Computer'}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors">
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3.5">
            <Field label="Computer ID">
              <input
                className={inputCls}
                placeholder="PC-031"
                value={form.name}
                onChange={set('name')}
                required
              />
            </Field>
            <Field label="Status">
              <select
                className={inputCls}
                value={form.status}
                onChange={set('status')}>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>

          <Field label="Model">
            <input
              className={inputCls}
              placeholder="Dell OptiPlex 7090"
              value={form.model}
              onChange={set('model')}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3.5">
            <Field label="CPU">
              <input
                className={inputCls}
                placeholder="Intel i5-10400"
                value={form.cpu}
                onChange={set('cpu')}
              />
            </Field>
            <Field label="RAM">
              <input
                className={inputCls}
                placeholder="8 GB"
                value={form.ram}
                onChange={set('ram')}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <Field label="Storage">
              <input
                className={inputCls}
                placeholder="256 GB SSD"
                value={form.storage}
                onChange={set('storage')}
              />
            </Field>
            <Field label="Slot">
              <input
                className={inputCls}
                placeholder="Slot 1"
                value={form.slot}
                onChange={set('slot')}
              />
            </Field>
          </div>

          <Field label="Lab">
            <select
              className={inputCls}
              value={form.lab}
              onChange={set('lab')}
              required>
              <option value="" disabled>
                Select a lab
              </option>
              {labOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
              <option value="__new__">+ New lab…</option>
            </select>
          </Field>

          {form.lab === '__new__' && (
            <Field label="New Lab Name">
              <input
                className={inputCls}
                placeholder="e.g. Lab 6"
                onChange={(e) =>
                  setForm((f) => ({ ...f, lab: e.target.value }))
                }
              />
            </Field>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
              {isEdit ? 'Save Changes' : 'Add Computer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete confirm ───────────────────────────────────────────────────────────
const DeleteConfirm = ({ target, onConfirm, onCancel }) => {
  if (!target) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl mx-4 text-center">
        <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-3">
          <Trash2Icon size={18} className="text-red-400" />
        </div>
        <p className="text-sm font-semibold text-zinc-100 mb-1">
          Remove {target.name}?
        </p>
        <p className="text-xs text-zinc-500 mb-5">
          {target.model} · {target.lab}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(target.id);
              onCancel();
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-500 transition-colors">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Computer = () => {
  const [computers, setComputers] = useState(MOCK_COMPUTERS);
  const [statusFilter, setStatus] = useState('All');
  const [labFilter, setLabFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const labOptions = useMemo(
    () => [...new Set(computers.map((c) => c.lab))].sort(),
    [computers],
  );

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };
  const openEdit = (c, e) => {
    e.stopPropagation();
    setEditTarget(c);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleSubmit = (form) => {
    if (editTarget) {
      setComputers((prev) =>
        prev.map((c) => (c.id === editTarget.id ? { ...c, ...form } : c)),
      );
    } else {
      setComputers((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setPage(1);
  };

  const handleDelete = (id) =>
    setComputers((prev) => prev.filter((c) => c.id !== id));

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return computers
      .filter(
        (c) =>
          statusFilter === 'All' || c.status === statusFilter.toLowerCase(),
      )
      .filter((c) => labFilter === 'All' || c.lab === labFilter)
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.lab.toLowerCase().includes(q) ||
          c.cpu.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const cmp = (SORT_FIELDS[sortField] ?? SORT_FIELDS.name)(a, b);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [computers, statusFilter, labFilter, search, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setPage(1);
  }, [statusFilter, labFilter, search]);

  const counts = {
    All: computers.length,
    Active: computers.filter((c) => c.status === 'active').length,
    Maintenance: computers.filter((c) => c.status === 'maintenance').length,
    Inactive: computers.filter((c) => c.status === 'inactive').length,
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <LaptopMinimal size={20} className="text-violet-400" />
              Computers
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {computers.length} units · {labOptions.length} labs
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
            <CirclePlus size={15} />
            Add Computer
          </button>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: 'Active',
              count: counts.Active,
              dot: 'bg-emerald-400',
              text: 'text-emerald-400',
            },
            {
              label: 'Maintenance',
              count: counts.Maintenance,
              dot: 'bg-amber-400',
              text: 'text-amber-400',
            },
            {
              label: 'Inactive',
              count: counts.Inactive,
              dot: 'bg-zinc-500',
              text: 'text-zinc-400',
            },
          ].map(({ label, count, dot, text }) => (
            <div
              key={label}
              className="bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
              <div>
                <p className="text-xs text-zinc-500">{label}</p>
                <p className={`text-lg font-semibold leading-tight ${text}`}>
                  {count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Status filter */}
            <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700/60 rounded-xl p-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatus(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === f
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60'
                  }`}>
                  {f}
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      statusFilter === f
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-700 text-zinc-500'
                    }`}>
                    {counts[f]}
                  </span>
                </button>
              ))}
            </div>

            {/* Lab filter */}
            <select
              value={labFilter}
              onChange={(e) => setLabFilter(e.target.value)}
              className="bg-zinc-800 border border-zinc-700/60 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-violet-500/60 transition-colors">
              <option value="All">All Labs</option>
              {labOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search name, model, CPU…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800 border border-zinc-700/60 rounded-xl pl-8 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-colors w-56"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-800/50 border border-zinc-700/60 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700/60 bg-zinc-800">
                  <Th
                    label="ID / Name"
                    field="name"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                    className="pl-4 w-28"
                  />
                  <Th
                    label="Model"
                    field="model"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <Th
                    label="Lab"
                    field="lab"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                    className="w-28"
                  />
                  <Th
                    label="Status"
                    field="status"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                    className="w-32"
                  />
                  <th className="px-3 py-2.5 text-xs font-medium text-zinc-500 text-right pr-4 w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((c) => (
                    <React.Fragment key={c.id}>
                      <tr
                        onClick={() =>
                          setExpandedId(expandedId === c.id ? null : c.id)
                        }
                        className={`border-b border-zinc-700/30 cursor-pointer transition-colors ${
                          expandedId === c.id
                            ? 'bg-zinc-700/30'
                            : 'hover:bg-zinc-700/20'
                        }`}>
                        {/* Name */}
                        <td className="px-3 py-3 pl-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_CONFIG[c.status].dot}`}
                            />
                            <span className="text-sm font-semibold text-zinc-100">
                              {c.name}
                            </span>
                          </div>
                        </td>

                        {/* Model */}
                        <td className="px-3 py-3">
                          <span className="text-sm text-zinc-300">
                            {c.model}
                          </span>
                        </td>

                        {/* Lab */}
                        <td className="px-3 py-3">
                          <span className="text-xs text-zinc-400 bg-zinc-700/50 px-2 py-0.5 rounded-md">
                            {c.lab} · {c.slot}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3">
                          <StatusBadge status={c.status} />
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-3 pr-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => openEdit(c, e)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-sky-500/20 hover:text-sky-400 transition-colors">
                              <PencilIcon size={13} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(c);
                              }}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                              <Trash2Icon size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded specs row */}
                      {expandedId === c.id && (
                        <ExpandedRow computer={c} colSpan={5} />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-sm text-zinc-600">
                      <LaptopMinimal
                        size={28}
                        className="mx-auto mb-2 opacity-40"
                      />
                      No computers match your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-700/60 bg-zinc-800/40">
            <span className="text-xs text-zinc-500">
              {filtered.length === 0
                ? '0 results'
                : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={safePage === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
                )
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '…' ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="w-7 text-center text-xs text-zinc-600">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                        safePage === p
                          ? 'bg-violet-600 text-white'
                          : 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                      }`}>
                      {p}
                    </button>
                  ),
                )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={safePage === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ComputerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editTarget={editTarget}
        labOptions={labOptions}
      />

      <DeleteConfirm
        target={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Computer;

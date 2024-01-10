import {
  FileTextIcon,
  ListBulletIcon,
  CalendarIcon,
  Link1Icon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

/** Reordering this affects the column orders */
export const columnHeaders: {
  icon?: React.ReactNode;
  label?: string;
  value: string;
  cellWidth?: string;
}[] = [
  {
    value: 'empty',
  },
  {
    value: 'bookmark',
    cellWidth: '64px',
  },
  {
    icon: <FileTextIcon fontSize={16} />,
    label: 'Company Name',
    value: 'company',
    cellWidth: '240px',
  },
  {
    icon: <ListBulletIcon fontSize={16} />,
    label: 'Position',
    value: 'position',
    cellWidth: '270px',
  },
  {
    icon: <CalendarIcon fontSize={16} />,
    label: 'Applied Date',
    value: 'appliedDate',
    cellWidth: '180px',
  },
  {
    icon: <Link1Icon fontSize={16} />,
    label: 'Link to apply',
    value: 'linkApply',
    cellWidth: '240px',
  },
  {
    icon: <CheckCircledIcon fontSize={16} />,
    label: 'Status',
    value: 'status',
    cellWidth: '164px',
  },
];

export const statusOptions = [
  { value: 'applied', label: 'Applied', color: '#CADFE0' },
  { value: 'progress', label: 'In Progress', color: '#FFE0BC' },
  { value: 'interview', label: 'Interview', color: '#C4F0C3' },
];

// will be from fetch
export const positionOptions = [
  { value: '1', label: '2024 Summer Internship' },
  { value: '2', label: '2024 Summer Tech Internship' },
  { value: '3', label: '2024 Winter Internship' },
  { value: '4', label: '2023 Internship Summer' },
  { value: '5', label: '2023 Internship Winter' },
  { value: '6', label: '2023 Software Genius Internship' },
  { value: '7', label: '2024 Internship Summer' },
  { value: '8', label: 'Internship for noobs' },
];

// will be from fetch
export const companies = [
  {
    logo: 'data:image/png;base64,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',
    value: 'blackrock',
    label: 'BlackRock',
  },
  {
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAMAAABKKxPSAAAA4VBMVEX///9ChfTpQjU0qFP6uwUre/Pr8f4xffPP3fzpPzLoNCPw9P7nKRX6uAAUoUD75OPud3D97u380XdZkfUipEdDrV7q9OzT6dj1t7TxlI/sa2PufXbympX2wL7++fjzpqLqSDzoOSrrWlH3yMX50tDrVEr//vXqQxL62tj82pXuayzoNjf7wgDyjCH+8dr3qBP936b0qpIDcPODqvf7xk5rm/b6wjewzpnB0/uSs/jduCCwsjQQp1ePyZx9rURHpTyqxPqd0Kqx1Myu17c2oX1AiuEzqkA8k8Aql5V1voZmuXot1Mh3AAABe0lEQVQ4jc3Qa1uCMBQHcGQgMgZqbmjecKaWWVZ2s9LK6Kbf/wOFMC5jGPWmp/8LHnf8cQ47kvQ/Um7sV5rNVrtT/QZ1nR6ClOo6pRD1O7uYg6AuR9GhfJClqj0o89FRS2QDpMtCYF9kiT7hGzosp4ei6C9Eh0PvkcmkHmsBew1/IeU2pBnMYVdATryjChLY6HASsCPuW4S7jpXjLUQDcQ1cFOXkdCLTdg6bmh4802kOk849pyjmRVQo8jFYeS9w05AZM5XLJatfKb6L2hlqgcs1q9/kuNovHZvbzXPiPTQW/vv8vZjKbTS4xDL3oXaX2LN5D7CwWObm4dljDwuAl2lX88eqxfA8Nh8XAACrntWuUIgKoyfgh4el4Nrac1xaYQZXce1lFnTTku+SwAEMXHt7tl1ivQrtvLoFQmlhQryH94u8afGSWeoRTOT9Q9UM6SfwsyilYxOcZpjYAvPiYk5ivMpSviSWbzHGFtmpgoUs15vNeulmTvz7fAG/MyCzpVwuDgAAAABJRU5ErkJggg==',
    value: 'google',
    label: 'Google',
  },
  {
    logo: 'data:image/jpeg;base64,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',
    value: 'instagram',
    label: 'Instagram',
  },
];

import { columnHeaders } from './config';

type THeaderColumnCellBase = (typeof columnHeaders)[number];

type THeaderColumnCell = THeaderColumnCellBase & {
  handleSelectEntireColumn: () => void;
};

export default function HeaderRow({
  handleSelectEntireColumn,
}: {
  handleSelectEntireColumn: (idx: number) => void;
}) {
  return (
    <tr className="Spreadsheet__cell bg-[#E1E7EA] text-[#606060]">
      {columnHeaders.map((col, idx) => (
        <HeaderColumnCell
          handleSelectEntireColumn={() => {
            if (idx === 0) return null;
            handleSelectEntireColumn(idx - 1);
          }}
          key={col.value + idx}
          icon={col.icon}
          label={col.label}
          value={col.value}
          cellWidth={col.cellWidth}
        />
      ))}
    </tr>
  );
}

function HeaderColumnCell({
  icon,
  label,
  cellWidth,
  value,
  handleSelectEntireColumn,
}: THeaderColumnCell) {
  return (
    <th
      style={{
        border: value === 'empty' || value === 'bookmark' ? 0 : '',
      }}
      className="Spreadsheet__header"
      // properly separate this with filter button
      onClick={handleSelectEntireColumn}
      // tabIndex={value === 'empty' || value === 'bookmark' ? -1 : 0}
    >
      <span
        style={{
          width: cellWidth,
          maxWidth: cellWidth,
        }}
        className={`flex gap-4 items-center pr-5 
        ${label === 'Company Name' ? 'pl-12' : 'pl-5'}
        `}
      >
        <i>{icon ? icon : null}</i>
        {value === 'empty' ? '' : label}
      </span>
    </th>
  );
}

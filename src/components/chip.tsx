interface ChipProps {
    value: string;
}

const Chip = ({ value }: ChipProps) => {
    return (
        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-slate-600 ring-inset m-0.5">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 dark:fill-slate-300 fill-sky-900">
                <circle r={3} cx={3} cy={3} />
            </svg>
            {value}
        </span>
    );
};
export default Chip;

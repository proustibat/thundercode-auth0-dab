import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const EmptyProjects = () => {
    return (
        <section className="dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 rounded-xl p-10 mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
            <div className="text-center">
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-400"
                >
                    <path
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        strokeWidth={2}
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-semibold">No projects</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                <div className="mt-6">
                    <button
                        onClick={() => {
                            toast.info("Not implemented yet!");
                        }}
                        type="button"
                        className="inline-flex items-center rounded-md dark:bg-slate-600 px-3 py-2 text-sm font-semibold shadow-xs"
                    >
                        <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                        New Project
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EmptyProjects;

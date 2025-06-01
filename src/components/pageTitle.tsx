import type { PropsWithChildren } from "react";

interface PageTitleProps extends PropsWithChildren {
    title: string;
    subtitle?: string;
}

const PageTitle = ({ title, subtitle, children = null }: PageTitleProps) => {
    return (
        <div className="p-10 dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 sm:rounded-xl mt-2 lg:mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
            <div className="text-center">
                <h1 className="text-3xl font-semibold sm:text-5xl">{title}</h1>
                {subtitle && <p className="mt-8 font-medium text-pretty text-lg sm:text-xl">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
};
export default PageTitle;

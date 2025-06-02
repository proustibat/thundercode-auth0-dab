import type { Project } from "../graphql/types.ts";
import Chip from "./chip.tsx";

interface ProjectItemProps extends Project {
    isFirst?: boolean;
    isLast?: boolean;
}

const ProjectItem = ({ name, tech, description, isFirst, isLast }: ProjectItemProps) => {
    return (
        <div className={`${!isFirst ? "pt-5" : ""} pb-5 w-full ${!isLast ? "border-b border-gray-300" : ""}`}>
            <h3 className="text-base font-semibold ">{name}</h3>
            <p className="mt-2 max-w-4xl text-sm">{description}</p>
            <p className="mt-2 max-w-4xl text-sm">
                {JSON.parse(tech).length &&
                    JSON.parse(tech).map((techName: string) => <Chip key={techName} value={techName} />)}
            </p>
        </div>
    );
};
export default ProjectItem;

import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

/**
 * Sample TypeScript editor used by AddRemoveService.
 */
@Editor("RetireService", "take a service out of deployment")
@Tags("documentation")
export class RetireService implements EditProject {

    @Parameter({
        displayName: "Service Name",
        description: "name of the service to retire, in snake case",
        pattern: Pattern.any,
        validInput: "snake case",
        minLength: 1,
        maxLength: 100,
    })
    public serviceName: string;

    public edit(project: Project) {
        const svcFilename = `60-${this.serviceName}-svc.json`;
        if (!project.fileExists(svcFilename)) {
            console.log("Warning: service file " + svcFilename + " not found")
        }
        project.deleteFile(svcFilename);
        project.deleteFile(`80-${this.serviceName}-deployment.json`)
    }
}

export const retireService = new RetireService();

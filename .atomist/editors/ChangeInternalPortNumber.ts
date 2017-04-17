import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { File } from '@atomist/rug/model/File';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

/**
 * Use this when the web app running in a pod wants to listen on 
 * a different port.
 */
@Editor("ChangeInternalPortNumber", "modify the port number requests are sent to internally")
@Tags("k8")
export class ChangeInternalPortNumber implements EditProject {

    @Parameter({
        pattern: Pattern.project_name,
        displayName: "project name",
        description: "Project whose port number is changing"
    })
    projectName: String;

    @Parameter({
        pattern: Pattern.any,
        displayName: "new port number",
        description: "Port number to change to"
    })
    newPort: String;

    @Parameter({
        pattern: Pattern.any,
        displayName: "old port number",
        description: "Port number to change from",
        required: false
    })
    oldPort: String = "8080";

    edit(project: Project) {

        let serviceDefinitionFilename = `60-${this.projectName}-svc.json`;
        let deploymentDefinitionFilename = `80-${this.projectName}-deployment.json`;

        if (!project.fileExists(serviceDefinitionFilename) || !project.fileExists(deploymentDefinitionFilename)) {
            throw `Can't change port for ${this.projectName}: can't find ${serviceDefinitionFilename} and/or ${deploymentDefinitionFilename}`;
        } 

        let serviceDefinition = project.findFile(serviceDefinitionFilename);
        serviceDefinition.setContent(serviceDefinition.content.replace(`"targetPort": ${this.oldPort}`, `"targetPort": ${this.newPort}`));

        let deployment = project.findFile(deploymentDefinitionFilename);
        deployment.setContent(deployment.content.replace(`"containerPort" : ${this.oldPort}`, `"containerPort" : ${this.newPort}`));
    }
}

export const changeInternalPortNumber = new ChangeInternalPortNumber();

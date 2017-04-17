import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { File } from '@atomist/rug/model/File';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

/**
 * Increase memory requests across the board
 */
@Editor("ChangeMemoryRequirements", "modify the memory level in deployments")
@Tags("documentation")
export class ChangeMemoryRequirements implements EditProject {

    edit(project: Project) {
        let pxe = project.context.pathExpressionEngine;

        pxe.with<File>(project, "/File()", f => {
            if (f.name.match(/^80.*deployment.json$/)) {
                let newContent = f.content.replace(
                    /"memory" : "256Mi"/, `"memory" : "512Mi"`).replace(
                    /"memory" : "128Mi"/, `"memory" : "256Mi"`)
                f.setContent(newContent)
            }
        })
    }
}

export const changeMemoryRequirements = new ChangeMemoryRequirements();

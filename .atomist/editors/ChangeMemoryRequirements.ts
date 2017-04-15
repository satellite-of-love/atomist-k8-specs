import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { File } from '@atomist/rug/model/File';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

/**
 * Sample TypeScript editor used by AddChangeMemoryRequirements.
 */
@Editor("ChangeMemoryRequirements", "modify the memory level in deployments")
@Tags("documentation")
export class ChangeMemoryRequirements implements EditProject {

    edit(project: Project) {
        let pxe = project.context.pathExpressionEngine;

        pxe.with<File>(project, "/File()", f => {
            if (f.name.match(/^80.*deployment.json$/)) {
                let newContent = f.content.replace(
                    /"memory" : "768Mi"/, `"memory" : "128Mi"`).replace(
                    /"memory" : "1024Mi"/, `"memory" : "256Mi"`)
                f.setContent(newContent)
            }
        })
    }
}

export const changeMemoryRequirements = new ChangeMemoryRequirements();

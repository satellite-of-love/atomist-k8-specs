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
                let spec = JSON.parse(f.content);
                try {
                    let currentMemoryLimit = spec.spec.template.spec.containers[0].resources.limits.memory;
                    if (currentMemoryLimit == "1024Mi") {
                        spec.spec.template.spec.containers[0].resources.limits.memory = "256Mi";
                    }
                    let currentMemoryRequest = spec.spec.template.spec.containers[0].resources.requests.memory;
                    if (currentMemoryLimit == "768Mi") {
                        spec.spec.template.spec.containers[0].resources.requests.memory = "128Mi";
                    }
                    f.setContent(JSON.stringify(spec, null, 2).replace(/":/g, `" :`))
                } catch (e) {
                    console.log("looks like we got the structure wrong: " + e);
                }
            }
        })
    }
}

export const changeMemoryRequirements = new ChangeMemoryRequirements();

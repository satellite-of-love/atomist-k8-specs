import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

/**
 * Sample TypeScript editor used by AddChangeMemoryRequirements.
 */
@Editor("ChangeMemoryRequirements", "modify the memory level in deployments")
@Tags("documentation")
export class ChangeMemoryRequirements implements EditProject {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100
    })
    inputParameter: string;

    edit(project: Project) {
        project.addFile("hello.txt", "Hello, World!\n" + this.inputParameter + "\n");
    }
}

export const changeMemoryRequirements = new ChangeMemoryRequirements();

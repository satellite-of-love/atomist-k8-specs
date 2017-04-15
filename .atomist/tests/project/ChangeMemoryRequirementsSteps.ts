import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("ChangeMemoryRequirements inputParameteristhe inputParameter value for ChangeMemoryRequirements is added to your project by AddChangeMemoryRequirements", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ChangeMemoryRequirements");

    psworld.editWith(editor, { inputParameter: "the inputParameter value" });
});

Then("fileContains hello txt Hello Worldnot for ChangeMemoryRequirements is added to your project by AddChangeMemoryRequirements", (p, world) => {

    return p.fileContains("hello.txt", "Hello, World!");
});

import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

When("the RemoveService is run", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("RemoveService");
    w.editWith(editor, { inputParameter: "the inputParameter value" });
});

Then("the hello file says hello", (p, world) => {
    return p.fileContains("hello.txt", "Hello, World!");
});

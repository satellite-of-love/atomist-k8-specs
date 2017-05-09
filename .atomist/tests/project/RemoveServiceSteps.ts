import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When, rugAssert } from "@atomist/rug/test/project/Core";

When("the RetireService editor is run on (.+)", (p, world, name) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("RetireService");
    w.editWith(editor, { serviceName: name });
});

Then("(.+) service file is gone", (p, world, name) => {
    return rugAssert(() => !p.fileExists(`60-${name}-svc.json`), "Found file " + `60-${name}-svc.json`);
});

Then("(.+) deployment file is gone", (p, world, name) => {
    return !p.fileExists(`80-${name}-deployment.json`);
});
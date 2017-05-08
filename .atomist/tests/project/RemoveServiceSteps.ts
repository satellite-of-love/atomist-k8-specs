import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

When("the RetireService editor is run on (\w+)", (p, world, name) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("RetireService");
    w.editWith(editor, { serviceName: "the service to retire value" });
});

Then("(\w+) service file is gone", (p, world, name) => {
    return !p.fileExists(`60-${name}-svc.json`);
});

Then("(\w+) deployment file is gone", (p, world, name) => {
    return !p.fileExists(`80-${name}-deployment.json`);
});
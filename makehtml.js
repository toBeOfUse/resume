const fs = require("fs");
const { Converter } = require("showdown");

const converter = new Converter();
converter.setFlavor("github");

const c = {encoding: "utf-8"};
const readFileText = (path) => fs.readFileSync(path, c);

const paths = {
    template: "resume_template.html",
    markdown: "README.md",
    output: "resume.html"
}

function output(){
    const template = readFileText(paths.template);
    const html = converter.makeHtml(readFileText(paths.markdown));
    fs.writeFileSync(paths.output, template.replace("{{body}}", html), c);
}

output();
fs.watch(paths.template, output);
fs.watch(paths.markdown, output);

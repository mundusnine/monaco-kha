let project = new Project('New Project');
project.addAssets('Assets/haxe_language.json');
project.addAssets('Assets/main.xml');
project.addSources('Sources');
project.addAssets('Assets/vs/**', {
    nameBaseDir: 'Assets',
    destination: '{dir}/{name}',
    name: '{dir}/{name}'
});
project.addLibrary('/home/jsnadeau/foundsdk/hscript');
project.addLibrary('/home/jsnadeau/foundsdk/haxeui-core');
project.addLibrary('/home/jsnadeau/foundsdk/haxeui-kha');
project.addLibrary('Libraries/monaco-kha');
// project.addLibrary('/home/jsnadeau/foundsdk/haxeui-code-editor');
// project.addLibrary('/home/jsnadeau/foundsdk/haxeui-kha-extended');
resolve(project);

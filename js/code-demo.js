var editors = document.getElementsByClassName('code-demo');
var previews = document.getElementsByClassName('code-preview');
var delay;
var cmEditors = [];

for(var i = 0; i < editors.length; i++) {
    var editor = editors.item(i);
    var cmEditor = CodeMirror.fromTextArea(editor, {
        mode: 'text/html',
        tabMode: 'indent',
        theme: 'eclipse',
    });

    cmEditor.on("change", function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview(editor), 300);
    });

    cmEditors.push(cmEditor);
}

function updatePreview(editor) {
    var previewId = editor.id + "-preview";
    var previewFrame = document.getElementById(previewId);
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

    preview.open();
    preview.write(cmEditor.getValue());
    preview.close();
}

Reveal.addEventListener("demo", function(){
    cmEditors.forEach(function(e){
        e.refresh();
        updatePreview(e.getTextArea());
    });
});

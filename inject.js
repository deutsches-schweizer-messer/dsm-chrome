(function() {
    function post(path, params, method) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", path, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function () {
        //     // if (xhr.readyState === 4 && xhr.status === 200) {
        //     //     var json = JSON.parse(xhr.responseText);
        //     //     console.log(json.email + ", " + json.password);
        //     // }
        // };
        xhr.send(JSON.stringify(params));
    }

    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function doSomethingWithSelectedText() {
        var selectedText = getSelectedText();
        if (selectedText) {
            post("http://localhost:8080/word",{definition:selectedText, mainTranslation: "???", language: "de"});
            alert("Got selected text " + selectedText);
        }
    }

    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;

    alert('Auto-translate enabled :)');

})();
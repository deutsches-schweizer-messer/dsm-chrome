(function () {
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

    function getTranslation() {
        var data = "{\n  'q': 'The Great Pyramid of Giza (also known as the Pyramid of Khufu or the\n        Pyramid of Cheops) is the oldest and largest of the three pyramids in\n        the Giza pyramid complex.',\n  'source': 'en',\n  'target': 'de',\n  'format': 'text'\n}";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                alert(JSON.parse(this.responseText).data.translations[0].translatedText)
            }
        });

        xhr.open("POST", "https://translation.googleapis.com/language/translate/v2");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer ya29.c.El_KBSQJdKBOXrYKtud_4svBYWEvj6A4rX1-iIjAznA-dDwBCq_2PameactT6XhJ9TXTqF6QZxziUJevDuPoHBaxnyaU0i1JsyI8Wep-LiCy6YZcX65UFTZ-Ls2Kohucyw");
        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.send(data);
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
        getTranslation();
        if (selectedText) {
            post("http://localhost:8080/word",
                {
                    definition: selectedText,
                    mainTranslation: "???",
                    language: "de",
                    resourceOriginUri: document.location.href
                });
            alert("Got selected text " + selectedText);
        }
    }

    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;

    alert('Auto-translate enabled :)');

})();
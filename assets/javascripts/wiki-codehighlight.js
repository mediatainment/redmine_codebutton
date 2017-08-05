codehighlight = {
    type: 'button',
    title: 'Highlighted code',
    fn: {
        wiki: function() {
            precodeTextField = this;

            var codeRayLanguages = ["bash", "c", "clojure", "cpp", "css", "delphi", "diff", "erb", "groovy", "haml", "html", "java", "javascript", "json", "php", "python", "ruby", "sql", "text", "xml", "yaml"];

            var languageOptions = [];
	          var select = "";
            for (var i = 0; i < codeRayLanguages.length; i++) {
              if ( codeRayLanguages[i].indexOf(jsToolBar.prototype.codehighlightDefaultLanguage) > -1 )
                 select = "selected" ;
              else
		        select = "";
		        languageOptions[i] = "<option " + select + ">" + codeRayLanguages[i] + "</option>";
            }
            var languageSelect = "<select>" + languageOptions.join("") + "</select>";

            var selectVal = "\' + $(this).closest(\'div\').find(\'select\').first().val() + \'";
            var encloseContent = "";
            if(String(jsToolBar.prototype.elements.strong.fn.wiki).match(/\*/g).length == 1) {
              /* Wiki formatter: Textile */
              encloseContent = "\'<pre><code class=&quot;"+selectVal+"&quot;>\\n\', \'\\n</code></pre>\'";
            } else {
              /* Wiki formatter: Markdown */
              var syntax = jsToolBar.prototype.codehighlightMarkdownSyntax;
              encloseContent = "\'"+syntax+" "+selectVal+"\\n\', \'\\n"+syntax+"\'";
            }

            var hideJs = "hideModal(this);$('#toolbar-code-options').remove();return false;";
            var questionBox = '<div id="toolbar-code-options" style="display: none">\
              <form action="#"><h3 class="title">Highlight code for</h3>\
              <p><label>Language ' + languageSelect + '</label></p><p class="buttons">\
              <input onclick="precodeTextField.encloseLineSelection('+encloseContent+');'+hideJs+'" type="submit" value="Insert code">\
              <input onclick="'+hideJs+'" type="button" value="Cancel"></p></form></div>';

            $('#main').append(questionBox);
            showModal('toolbar-code-options', '200px');
            $('#toolbar-code-options select').focus();
        }
    }
}

/* Redmine >= 3.3: replace native code highlight button with our button */
if(jsToolBar.prototype.elements.precode !== undefined) {
  jsToolBar.prototype.elements.precode = codehighlight;
} else {
  /* Redmine <= 3.2: Add our button at the the pf the list */
  jsToolBar.prototype.elements.codehighlight = codehighlight;
}

jsToolBar.prototype.elements.codehighlight = {
    type: 'button',
    title: 'Highlighted code',
    fn: {
        wiki: function() {
            precodeTextField = this;

            var codeRayLanguages = ["c", "clojure", "cpp", "css", "delphi", "diff", "erb", "groovy", "haml", "html", "java", "javascript", "json", "php", "python", "ruby", "sql", "text", "xml", "yaml"];

            var languageOptions = [];
	    var select = "";
            for (var i = 0; i < codeRayLanguages.length; i++) {
		if ( codeRayLanguages[i].indexOf("xml") > -1 )
			select = "selected" ;
		else 
		        select = "";
		languageOptions[i] = "<option " + select + ">" + codeRayLanguages[i] + "</option>";
            }
            var languageSelect = "<select>" + languageOptions.join("") + "</select>";
            var hideJs = "hideModal(this);$('#toolbar-code-options').remove();return false;";
            var questionBox = '<div id="toolbar-code-options" style="display: none"><form action="#"><h3 class="title">Highlight code for</h3><p><label>Language ' + languageSelect + '</label></p><p class="buttons"><input onclick="precodeTextField.encloseLineSelection(\'<pre><code class=&quot;\' + $(this).closest(\'div\').find(\'select\').first().val() + \'&quot;>\\n\', \'\\n</code></pre>\');'+hideJs+'" type="submit" value="Insert code"><input onclick="'+hideJs+'" type="button" value="Cancel"></p></form></div>';

            $('#main').append(questionBox);
            showModal('toolbar-code-options', '200px');
            $('#toolbar-code-options select').focus();
        }
    }
}

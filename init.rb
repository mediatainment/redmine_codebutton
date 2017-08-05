Redmine::Plugin.register :redmine_codebutton do
  name 'Code Highlight plugin'
  author 'Jan Jezek'
  description 'This is a plugin for Redmine. It adds a CodeHighlight Button to the editor, which wraps a code around selected text'
  version '0.2.0'
  url 'https://github.com/mediatainment/redmine-codebutton'
  author_url 'http://www.mediatainment-productions.com'

  settings :default => {
    'default_language' => false
  }, :partial => 'redmine_codebutton_settings'
end

Rails.configuration.to_prepare do
  # Guards against including the module multiple time (like in tests)
  # and registering multiple callbacks

  unless Redmine::WikiFormatting::Textile::Helper.included_modules.include? WikiCodehighlightHelperPatch
    Redmine::WikiFormatting::Textile::Helper.send(:include, WikiCodehighlightHelperPatch)
  end

end

# Wiki Extensions plugin for Redmine
# Copyright (C) 2011-2013  Haruyuki Iida
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

require_dependency "redmine/wiki_formatting/textile/helper"

module WikiCodehighlightHelperPatch
  def self.included(base) # :nodoc:
    base.send(:include, HelperMethodsWikiExtensions)

    base.class_eval do
      unloadable # Send unloadable so it will not be unloaded in development    
      alias_method_chain :heads_for_wiki_formatter, :redmine_codebutton
    end
  end

end

module HelperMethodsWikiExtensions
  def heads_for_wiki_formatter_with_redmine_codebutton
    heads_for_wiki_formatter_without_redmine_codebutton
    return if ie6_or_ie7?

    unless @heads_for_wiki_redmine_codebutton_included
      content_for :header_tags do
        o = javascript_include_tag('wiki-codehighlight.js', :plugin => 'redmine_codebutton')
        o << stylesheet_link_tag('wiki-codehighlight.css', :plugin => 'redmine_codebutton')
		if Setting.plugin_redmine_codebutton['default_language']
          o << javascript_tag("jsToolBar.prototype.codehighlightDefaultLanguage = '" + Setting.plugin_redmine_codebutton['default_language'] + "';")
        end
		o.html_safe
      end
      @heads_for_wiki_redmine_codebutton_included = true
    end
  end
  private
  def ie6_or_ie7?
    useragent = request.env['HTTP_USER_AGENT'].to_s
    return useragent.match(/IE[ ]+[67]./) != nil
  end


end



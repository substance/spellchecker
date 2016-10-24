import {
  Configurator, EditorSession, ProseEditor, ProseEditorPackage,
  Tool, SpellCheckPackage, SpellCheckManager
} from 'substance'

import fixture from './fixture'

const config = {
  name: 'spellcheck-example',
  configure: function(config) {
    config.import(ProseEditorPackage)
    config.import(SpellCheckPackage)
  }
}
const cfg = new Configurator().import(config)

window.onload = function() {
  const doc = cfg.createArticle(fixture)
  let editorSession = new EditorSession(doc, {
    configurator: cfg
  })
  // TODO: we need to discuss how such session extensions should be
  // registered
  let spellchecker = new SpellCheckManager(editorSession)

  var editor = ProseEditor.mount({
    editorSession: editorSession,
    scrollbarType: 'substance'
  }, document.body)

  spellchecker.runGlobalCheck()
}

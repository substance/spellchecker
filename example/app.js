import {
  Configurator, DocumentSession, ProseEditor, ProseEditorPackage,
  Tool
} from 'substance'

import SpellCheckPackage from '../src/spell-check/SpellCheckPackage'
import SpellCheckManager from '../src/spell-check/SpellCheckManager'
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
  let editSession = new DocumentSession(doc, {
    configurator: cfg,
    context: {}
  })
  // TODO: we need to discuss how such session extensions should be
  // registered
  let spellchecker = new SpellCheckManager(editSession)

  var editor = ProseEditor.mount({
    editSession: editSession,
    configurator: cfg,
    scrollbarType: 'substance'
  }, document.body)

  spellchecker.runGlobalCheck()
}
import { EditAnnotationCommand } from 'substance'
import SpellError from './SpellError'
import CorrectionTool from './CorrectionTool'
import SpellCheckCommand from './SpellCheckCommand'

export default {
  name: 'spell-check',
  configure: function(config) {
    config.addNode(SpellError)
    config.addToolGroup('context-menu-spell-check')
    config.addCommand('correction', SpellCheckCommand)
    config.addTool('correction', CorrectionTool, {toolGroup: 'context-menu-spell-check'})
    config.addTool('correction', CorrectionTool, {target: 'context-menu-spell-check'})
  }
}

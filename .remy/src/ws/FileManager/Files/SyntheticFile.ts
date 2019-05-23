import { BaseFile } from './BaseFile';
import { EditorType } from '../../model/OutboundMessage';

export class SyntheticFile extends BaseFile {
  open() {
    this.editorType = EditorType.VISUAL;
  }

  close() {
    //
  }
}

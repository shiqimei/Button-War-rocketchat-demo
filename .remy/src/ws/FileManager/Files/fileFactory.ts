import { Server } from '../../Server';

import { BaseFile } from './BaseFile';
import { File } from './File';
import { GitManager } from '../../GitManager';
import { SyntheticFile } from './SyntheticFile';

export function fileFactory(server: Server, projectPath: string, path: string): BaseFile {
  if (path.startsWith('synthetic!')) {
    return new SyntheticFile(server, projectPath, path);
  }

  return new File(server, projectPath, path);
}

import { PtyFrame, EditorType } from './OutboundMessage';

export interface InboundMessage {
  type: InboundMessage.Type;
}

export interface InboundLsMessage extends InboundMessage {
  ls: InboundMessage.LsPayload;
}
export interface InboundRmMessage extends InboundMessage {
  rm: InboundMessage.RmPayload;
}
export interface InboundMvMessage extends InboundMessage {
  mv: InboundMessage.MvPayload;
}
export interface InboundTouchMessage extends InboundMessage {
  touch: InboundMessage.TouchPayload;
}

export interface InboundOpenFileMessage extends InboundMessage {
  openFile: InboundMessage.OpenFilePayload;
}
export interface InboundCloseFileMessage extends InboundMessage {
  closeFile: InboundMessage.CloseFilePayload;
}
export interface InboundSaveFileMessage extends InboundMessage {
  saveFile: InboundMessage.SaveFilePayload;
}
export interface InboundSetSelectionMessage extends InboundMessage {
  setSelection: InboundMessage.SetSelectionPayload;
}
export interface InboundApplyOperationMessage extends InboundMessage {
  applyOperation: InboundMessage.ApplyOperationPayload;
}
export interface InboundJsonSetValueMessage extends InboundMessage {
  jsonSetValue: InboundMessage.JsonSetValuePayload;
}

export interface InboundPtySpawnMessage extends InboundMessage {
  ptySpawn: InboundMessage.PtySpawnPayload;
}
export interface InboundPtyKillMessage extends InboundMessage {
  ptyKill: InboundMessage.PtyKillPayload;
}
export interface InboundPtyWriteMessage extends InboundMessage {
  ptyWrite: InboundMessage.PtyWritePayload;
}
export interface InboundPtyResizeMessage extends InboundMessage {
  ptyResize: InboundMessage.PtyResizePayload;
}

export interface InboundGitLoadStatusMessage extends InboundMessage {
  gitLoadStatus: InboundMessage.GitLoadStatusPayload;
}
export interface InboundGitCreateNewVersionMessage extends InboundMessage {
  gitCreateNewVersion: InboundMessage.GitCreateNewVersionPayload;
}

export namespace InboundMessage {
  export enum Type {
    // Filesystem operations
    LS = 'fs/ls',
    RM = 'fs/rm',
    MV = 'fs/mv',
    TOUCH = 'fs/touch',

    // File operations
    OPEN_FILE = 'file/open_file',
    CLOSE_FILE = 'file/close_file',
    SAVE_FILE = 'file/save_file',
    SET_SELECTION = 'file/set_selection',
    APPLY_OPERATION = 'file/apply_operation',
    JSON_SET_VALUE = 'file/json_set_value',

    // Terminal operations
    PTY_SPAWN = 'pty/spawn',
    PTY_KILL = 'pty/kill',
    PTY_WRITE = 'pty/write',
    PTY_RESIZE = 'pty/resize',

    GIT_LOAD_STATUS = 'git/load_status',
    GIT_CREATE_NEW_VERSION = 'git/new_version',
  }

  // Filesystem
  export interface LsPayload {
    //
  }
  export interface RmPayload {
    path: string;
  }
  export interface MvPayload {
    source: string;
    dest: string;
  }
  export interface TouchPayload {
    path: string;
  }

  // File
  export interface OpenFilePayload {
    path: string;
    editorType?: EditorType;
  }
  export interface CloseFilePayload {
    path: string;
  }
  export interface SaveFilePayload {
    path: string;
    options?: {
      commitImmediately?: boolean;
      commitMessage?: string;
    };
  }
  export interface ApplyOperationPayload {
    path: string;
    operation: string;
  }
  export interface JsonSetValuePayload {
    path: string;
    key: string;
    newValue: string;
  }
  export interface SetSelectionPayload {
    path: string;
    caretIndex: number;
    range: number;
  }

  // Terminal
  export interface PtySpawnPayload {
    name?: string;
  }
  export interface PtyKillPayload {
    ptyId: string;
  }
  export interface PtyWritePayload {
    ptyId: string;
    frame: PtyFrame;
  }
  export interface PtyResizePayload {
    ptyId: string;
    cols: number;
    rows: number;
  }

  export interface GitLoadStatusPayload {
    //
  }
  export interface GitCreateNewVersionPayload {
    message: string;
  }
}

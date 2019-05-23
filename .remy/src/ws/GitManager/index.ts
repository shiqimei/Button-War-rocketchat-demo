import * as Git from 'simple-git/promise';
import { exec } from 'child_process';
import { Server } from '../Server';
import { OutboundMessage, GitStatusChanged } from '../model/OutboundMessage';

export class GitManager {
  private readonly server: Server;
  private readonly git: Git.SimpleGit;

  private isOperationInProgress: boolean = false;
  private isPushInProgress: boolean = false;
  private isLoading: boolean = true;
  private cachedStatus: {[index: string]: any} = {};

  constructor(server: Server) {
    this.server = server;
    this.git = Git('/usr/src/app');
    this.updateStatus();
  }

  get statusChangedMessage(): GitStatusChanged {
    return {
      status: {
        isOperationInProgress: this.isOperationInProgress,
        isPushInProgress: this.isPushInProgress,
        isLoading: this.isLoading,
        ...this.cachedStatus,
      },
    };
  }

  markGitOperationInProgress(isInProgress: boolean) {
    // Only update if we're sending new info
    if (this.isOperationInProgress && !isInProgress ||
        !this.isOperationInProgress && isInProgress) {
      this.isOperationInProgress = isInProgress;
      this.statusChanged();
    }
  }

  statusChanged() {
    this.server.broadcast(OutboundMessage.getGitStatusChangedCommand(this.statusChangedMessage));
  }

  async updateStatus() {
    this.isLoading = true;
    this.statusChanged();

    this.cachedStatus = {
      status: await this.git.status(),
    };

    this.isLoading = false;
    this.statusChanged();
  }

  // async updateRepositoryStatus() {
  //   this.isLoading = true;
  //   this.statusChanged();

  //   await this.updateRemotes();
  //   const currentLocalHash = (await this.git.revparse(['HEAD'])).trim();
  //   const currentRemoteHash = (await this.git.revparse(['origin/master'])).trim();

  //   const status = await this.git.status();
  //   const remote = (await this.git.listRemote(['--get-url'])).trim();

  //   let mostRecentUpstream = null;
  //   try {
  //     const upstream = await this.git.log(['-n', 1, 'upstream/master']);
  //     mostRecentUpstream = upstream.latest;
  //   } catch (err) {
  //     //
  //   }

  //   let mostRecentOrigin = null;
  //   try {
  //     const origin = await this.git.log(['-n', 1, 'origin/master']);
  //     mostRecentOrigin = origin.latest;
  //   } catch (err) {
  //     //
  //   }

  //   this.cachedStatus = {
  //     status,
  //     remote,
  //     currentLocalHash,
  //     currentRemoteHash,
  //     mostRecentOrigin,
  //     mostRecentUpstream,
  //   };
  //   this.isLoading = false;
  //   this.statusChanged();
  // }

  async updateRemotes() {
    return new Promise((resolve) => {
      exec('git remote update', (err, res) => {
        resolve(res);
      });
    });
  }

  async createNewVersion(message: string) {
    this.isPushInProgress = true;
    this.statusChanged();

    try {
      await this.git.add('./*');
      await this.git.commit(message);
      await this.git.raw(['push', '-u', 'origin', 'master']);
    } catch (err) {
      this.server.broadcast(OutboundMessage.getGitErrorCommand({
        error: err.message,
      }));
    }

    this.isPushInProgress = false;
    await this.updateStatus();
  }

  async commitAndPush(file: string, message: string) {
    this.isPushInProgress = true;
    this.statusChanged();

    try {
      await this.git.add(file);
      await this.git.commit(message);
      await this.git.raw(['push', '-u', 'origin', 'master']);
    } catch (err) {
      this.server.broadcast(OutboundMessage.getGitErrorCommand({
        error: err.message,
      }));
    }

    this.isPushInProgress = false;
    await this.updateStatus();
  }
}

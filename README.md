# Hype Man

A passive dose of encouragement in the VS Code status bar whenever you save.
No dialogs, no focus changes, no network, no telemetry.

## Features

- A random hype phrase appears in the status bar after a save, then fades away.
- A cooldown keeps autosave and save-all from becoming noisy.
- Manage your own phrases from the Command Palette.

## Commands

| Command                                  | What it does                                  |
| ---------------------------------------- | --------------------------------------------- |
| Hype Man: Hype Me                        | Show a phrase now, regardless of `enabled`    |
| Hype Man: Add Hype Phrase                | Append a phrase to your list                  |
| Hype Man: Remove Hype Phrase             | Pick one or more phrases to remove            |
| Hype Man: Reset Hype Phrases to Default  | Restore the bundled list                      |

## Settings

| Setting                   | Default | Description                                   |
| ------------------------- | ------- | --------------------------------------------- |
| `hypeman.enabled`         | `true`  | Show phrases automatically on save            |
| `hypeman.cooldownSeconds` | `30`    | Minimum seconds between automatic phrases     |
| `hypeman.displaySeconds`  | `5`     | How long a phrase stays visible               |
| `hypeman.phrases`         | 14 from Encourage plus 12 originals | The phrase list (also editable in settings) |

## Development

```text
npm install
npm test
```

Press F5 to launch an Extension Development Host.

## Releasing

Bump `version` in `package.json`, commit, then push a matching tag:

```text
git tag v0.1.0
git push origin v0.1.0
```

The Release workflow tests, packages a `.vsix`, and attaches it to a new GitHub release.
Install it with `code --install-extension hypeman-vscode.vsix` or Extensions: Install from VSIX.

## Credits

Hype Man is a VS Code port of the idea behind [Encourage](https://github.com/haacked/Encourage) by Phil Haack,
which in turn credits Pat Nakajima's TextMate extension.
See [NOTICE](NOTICE).
A Rider port is planned.

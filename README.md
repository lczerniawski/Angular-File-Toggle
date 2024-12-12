# Angular File Toggle

The Angular File Toggle extension for Visual Studio Code allows you to quickly switch between different file types (TypeScript, HTML, CSS) in Angular projects.

## Features

- Toggle between TypeScript, HTML, and CSS files for Angular components.
- Supports multiple CSS preprocessor extensions (SCSS, SASS, LESS, CSS, Stylus).
- Switches to the corresponding file based on the currently opened and selected file.

## Commands

The extension provides the following commands:

- `angular-file-toggle.toggleTs`: Toggle to the corresponding TypeScript file.
- `angular-file-toggle.toggleHtml`: Toggle to the corresponding HTML file.
- `angular-file-toggle.toggleCss`: Toggle to the corresponding CSS file (supports SCSS, SASS, LESS, CSS, Stylus).

## Default Keybindings

The extension comes with the following default keybindings:

- `Ctrl+Alt+T` (Windows/Linux) or `Cmd+Alt+T` (macOS): Toggle to the corresponding TypeScript file.
- `Ctrl+Alt+H` (Windows/Linux) or `Cmd+Alt+H` (macOS): Toggle to the corresponding HTML file.
- `Ctrl+Alt+C` (Windows/Linux) or `Cmd+Alt+C` (macOS): Toggle to the corresponding CSS file.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "Angular File Toggle".
4. Click Install.

## Usage

1. Open an Angular component file in the editor.
2. Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and type one of the following commands:
   - `Toggle to TypeScript File`: Switch to the corresponding TypeScript file.
   - `Toggle to HTML File`: Switch to the corresponding HTML file.
   - `Toggle to CSS File`: Switch to the corresponding CSS file.

Alternatively, you can use the default keybindings mentioned above.

> **The extension assumes that the file names follow the Angular component naming conventions.**

## Contributing

If you have any suggestions or find any issues, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/lczerniawski/Angular-File-Toggle).

## License

See [LICENSE.txt](LICENSE.txt) for license information.
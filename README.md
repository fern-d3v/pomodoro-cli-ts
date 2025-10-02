# Pomodoro Timer CLI

A minimalist command-line Pomodoro Timer built with TypeScript and Bun, featuring the Catppuccin Mocha color scheme.

## Features

- **Session Selection Menu**: Choose Work, Study, Short Break, Long Break, or set a custom duration
- **Catppuccin Mocha Theme**: Beautiful, easy-on-the-eyes color palette
- **Custom Timers**: Set any duration in minutes
- **Audio Notifications**: Custom sound plays when sessions complete
- **Keyboard Controls**: Space to pause/resume, Ctrl+C to cancel and return to menu
- **Real-time Countdown**: Live updating timer display

## Quick Start

```bash
# Install dependencies
bun install

# Run the timer
bun run dev
```

## Usage

1. Select a session type from the menu (1-6)
2. For custom duration, choose option 5 and enter minutes
3. Use SPACE to pause/resume during a session
4. Press Ctrl+C to cancel and return to the menu
5. Choose option 6 to exit the application

## Session Types

- **Work**: 25 minutes (default Pomodoro)
- **Study**: 30 minutes (extended focus)
- **Short Break**: 5 minutes
- **Long Break**: 15 minutes
- **Custom**: Any duration you specify

## Custom Audio

Place your audio file in the `assets/` directory. The app uses macOS's `afplay` command to play sounds on session completion.

## Built With

- [Bun](https://bun.sh) - Fast JavaScript runtime
- [TypeScript](https://typescriptlang.org) - Type-safe JavaScript
- [Chalk](https://github.com/chalk/chalk) - Terminal colors
- [Catppuccin](https://github.com/catppuccin/catppuccin) - Mocha color palette

## Learning Files

This project includes progressive TypeScript/Bun learning examples:
- `index.ts` - Basic TypeScript
- `src/pomodoro.ts` - Enums and structure
- `src/countdown.ts` - Real countdown
- `src/full-pomodoro.ts` - Complete cycle
- `src/index.ts` - Production CLI

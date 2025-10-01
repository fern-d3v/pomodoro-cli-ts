# 🍅 Pomodoro Timer CLI

A beautiful command-line Pomodoro Timer built with TypeScript and Bun. Perfect for boosting productivity with the proven Pomodoro Technique!

## ✨ Features

- **Full Pomodoro Cycle**: 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- **Auto-transitions**: Automatically switches between work and break sessions
- **Progress tracking**: Shows completed work sessions (4 sessions = 1 long break)
- **Colorful interface**: Beautiful colored output using Chalk
- **Keyboard controls**: Space to pause/resume, Ctrl+C to quit
- **Audio feedback**: Bell sound when sessions complete
- **Real-time countdown**: Live updating timer display

## 🚀 Quick Start

### Install dependencies:
```bash
bun install
```

### Run the timer:
```bash
bun run dev
```

### Build for production:
```bash
bun run build
bun run start
```

## 🎮 Controls

- **SPACE**: Pause/Resume timer
- **Ctrl+C**: Stop and quit

## 📚 Learning Files

This project includes progressive learning examples:

- `index.ts` - Basic TypeScript concepts
- `src/pomodoro.ts` - Basic timer structure with enums
- `src/countdown.ts` - Real countdown implementation  
- `src/full-pomodoro.ts` - Complete cycle with auto-transitions
- `src/index.ts` - Production-ready CLI version

## 🛠️ Built With

- [Bun](https://bun.com) - Fast JavaScript runtime
- [TypeScript](https://typescriptlang.org) - Type-safe JavaScript
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

## 🍅 The Pomodoro Technique

1. Work for 25 minutes (1 Pomodoro)
2. Take a 5-minute break
3. After 4 Pomodoros, take a 15-minute long break
4. Repeat!

---

*Built with ❤️ for productivity enthusiasts*

<div align="center">

# 🍅 Pomodoro Timer CLI

<p>
  <img src="https://img.shields.io/badge/Catppuccin-Mocha-cba6f7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

**A minimalist command-line Pomodoro Timer featuring the cozy Catppuccin Mocha theme**

</div>

---

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> ✨ Features

- **Session Selection Menu** — Choose Work, Study, Short Break, Long Break, or set a custom duration
- **Catppuccin Mocha Theme** — Beautiful, easy-on-the-eyes color palette
- **Custom Timers** — Set any duration in minutes
- **Audio Notifications** — Custom sound plays when sessions complete
- **Keyboard Controls** — Space to pause/resume, Ctrl+C to cancel and return to menu
- **Real-time Countdown** — Live updating timer display

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> 🚀 Quick Start

```bash
# Install dependencies
bun install

# Run the timer
bun run dev
```

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> 📖 Usage

1. Select a session type from the menu (1-6)
2. For custom duration, choose option 5 and enter minutes
3. Use **SPACE** to pause/resume during a session
4. Press **Ctrl+C** to cancel and return to the menu
5. Choose option 6 to exit the application

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> ⏱️ Session Types

| Session | Duration | Description |
|---------|----------|-------------|
| 🍅 **Work** | 25 min | Default Pomodoro focus time |
| 📚 **Study** | 30 min | Extended learning session |
| ☕ **Short Break** | 5 min | Quick refresh |
| 🌙 **Long Break** | 15 min | Extended rest period |
| ⚙️ **Custom** | Any | Your choice of duration |

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> 🔊 Custom Audio

Place your audio file in the `assets/` directory. The app uses macOS's `afplay` command to play sounds on session completion.

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> 🛠️ Built With

- [Bun](https://bun.sh) — Fast JavaScript runtime
- [TypeScript](https://typescriptlang.org) — Type-safe JavaScript
- [Chalk](https://github.com/chalk/chalk) — Terminal colors
- [Catppuccin](https://github.com/catppuccin/catppuccin) — Mocha color palette

## <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> 📚 Learning Files

This project includes progressive TypeScript/Bun learning examples:

```plaintext
├── index.ts                 # Basic TypeScript
└── src/
    ├── pomodoro.ts         # Enums and structure
    ├── countdown.ts        # Real countdown
    ├── full-pomodoro.ts    # Complete cycle
    └── index.ts            # Production CLI
```

---

<div align="center">

<p>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/mocha.png" width="600px" />
</p>

<sub>Themed with 💜 using <a href="https://github.com/catppuccin/catppuccin">Catppuccin Mocha</a></sub>

</div>

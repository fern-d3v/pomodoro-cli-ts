# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

**Installation:**
```bash
bun install
```

**Development (runs main production CLI):**
```bash
bun run dev          # Runs src/index.ts - the full-featured Pomodoro CLI
./start.sh           # Alternative quick-start script (checks bun, installs deps, runs dev)
```

**Build & Production:**
```bash
bun run build        # Compiles to dist/index.js
bun run start        # Runs the production build
```

**Learning Demos (progressive complexity):**
```bash
bun run demo:basic      # index.ts - Basic TypeScript exercises
bun run demo:pomodoro   # src/pomodoro.ts - Timer structure with enums
bun run demo:countdown  # src/countdown.ts - Real countdown implementation
bun run demo:full       # src/full-pomodoro.ts - Complete cycle with transitions
```

## Architecture

This is a **learning-focused** Pomodoro Timer CLI with progressive complexity across multiple files.

### Learning File Progression

The project is structured as a TypeScript/Bun learning journey:

1. **`index.ts` (root)** - Basic TypeScript exercises: functions with types, variables, simple operations
2. **`src/pomodoro.ts`** - Introduction to enums (`TimerState`, `SessionType`) and timer object structure
3. **`src/countdown.ts`** - Real countdown using `setInterval()`, time formatting, and tick functions
4. **`src/full-pomodoro.ts`** - Complete Pomodoro cycle with auto-transitions between work/break sessions
5. **`src/index.ts`** - **Production-ready CLI** with:
   - Interactive session selection menu
   - Catppuccin Mocha color scheme
   - Custom timer duration support
   - Keyboard controls (SPACE to pause/resume, Ctrl+C to cancel)
   - Custom audio playback on completion
   - Real-time countdown display

### Core Design Pattern

**State Machine Architecture:**
- Uses TypeScript enums for state management:
  - `TimerState`: STOPPED, RUNNING, PAUSED
  - `SessionType`: WORK, STUDY, SHORT_BREAK, LONG_BREAK, CUSTOM
- Timer object holds current state, session type, remaining time, and interval ID
- `tick()` function runs every second to update countdown and check for completion

**Menu-Driven Architecture:**
- `showMenu()` displays interactive session selection
- `main()` runs in a loop: show menu → run timer → return to menu
- Ctrl+C cancels current session and returns to menu (doesn't exit)
- Custom duration allows user-specified timer length

**Session Durations:**
- Work: 25 minutes
- Study: 30 minutes
- Short breaks: 5 minutes  
- Long breaks: 15 minutes
- Custom: User-specified

## Bun-Specific Requirements

This project uses **Bun** as its runtime (not Node.js):

- Run TypeScript files directly: `bun <file.ts>` (no `ts-node` needed)
- Install dependencies: `bun install` (not `npm install`)
- Run scripts: `bun run <script>` (not `npm run`)
- Build: `bun build` (not webpack/vite)
- Testing: Use `bun test` with `bun:test` module (no tests currently implemented)
- Bun automatically loads `.env` files (no `dotenv` package needed)

Reference: See .cursor/rules/use-bun-instead-of-node-vite-npm-pnpm.mdc for full Bun guidelines.

## Important Notes

- **Production CLI entry point**: `src/index.ts` (NOT root `index.ts`)
- **Root `index.ts`**: Basic TypeScript learning exercises only
- **Session durations**: 
  - Work: 25 minutes (1500 seconds)
  - Study: 30 minutes (1800 seconds)
  - Short break: 5 minutes (300 seconds)
  - Long break: 15 minutes (900 seconds)
  - Custom: User-specified
- **Keyboard controls** (in production CLI):
  - SPACE: Pause/resume timer
  - Ctrl+C: Cancel session and return to menu
  - Menu option 6: Exit application
- **Color scheme**: Catppuccin Mocha palette via `chalk.hex()`
  - Work sessions: Red (`#f38ba8`)
  - Study sessions: Blue (`#89b4fa`)
  - Short breaks: Green (`#a6e3a1`)
  - Long breaks: Teal (`#94e2d5`)
  - Custom sessions: Mauve (`#cba6f7`)
- **Audio playback**: Uses macOS `afplay` command via `Bun.spawn()`
  - Audio file location: `./assets/Sound of a Glitch.wav`
  - Plays on session completion
- **No emojis**: Clean text-only interface with bracket labels
- **No tests**: Project currently has no test suite (would use `bun test` if added)

## TypeScript Configuration

- Uses strict mode with modern ESNext features
- Module resolution: bundler mode
- Allows importing `.ts` extensions directly (Bun feature)
- No emit mode (Bun handles transpilation)

#!/usr/bin/env bun

// 🍅 Pomodoro Timer CLI - Main Entry Point
// Built with TypeScript and Bun

import chalk from 'chalk';

// Type definitions for our timer
enum TimerState {
  STOPPED = "Timer is not running",
  RUNNING = "Timer is currently running", 
  PAUSED = "Timer is paused",
}

enum SessionType {
  WORK = "Work Session",
  STUDY = "Study Session",
  SHORT_BREAK = "Short Break", 
  LONG_BREAK = "Long Break",
  CUSTOM = "Custom Session",
}
// Catppuccin Mocha color palette
const COLORS = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
  text: '#cdd6f4',
  subtext1: '#bac2de',
  subtext0: '#a6adc8',
  overlay2: '#9399b2',
  overlay1: '#7f849c',
  overlay0: '#6c7086',
  surface2: '#585b70',
  surface1: '#45475a',
  surface0: '#313244',
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#11111b',
};

// Timer configuration and state
const pomodoro = {
  state: TimerState.STOPPED as TimerState,
  currentSession: SessionType.WORK as SessionType,
  primarySessionType: SessionType.WORK as SessionType, // Track whether we're in WORK or STUDY mode
  remainingSeconds: 0 as number,
  intervalId: null as NodeJS.Timeout | null,
  completedWorkSessions: 0 as number,
  sessionsUntilLongBreak: 4 as number,
};

// Session durations in seconds (25 min work, 5 min short break, 15 min long break)
const SESSION_DURATIONS = {
  WORK: 25 * 60,        // 25 minutes
  STUDY: 30 * 60,       // 30 minutes
  SHORT_BREAK: 5 * 60,  // 5 minutes
  LONG_BREAK: 15 * 60,  // 15 minutes
  CUSTOM: 0,            // Custom duration (set by user)
};

// Helper function to format time as MM:SS
function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${minutes}:${secondsStr}`;
}

// Play audio file on macOS - uses AppleScript to ensure sound plays even when window is not active
function playSound(audioPath: string): void {
  try {
    // Convert relative path to absolute path
    const absolutePath = audioPath.startsWith('/') ? audioPath : `${process.cwd()}/${audioPath}`;
    
    // Use AppleScript to play the sound - this works even when the terminal is not active
    // AppleScript's sound playback is not suppressed when the app is in the background
    // Note: We don't set the volume, so it plays at the current system volume
    const script = `do shell script "afplay " & quoted form of "${absolutePath}"`;
    
    Bun.spawn(['osascript', '-e', script], {
      stdout: 'ignore',
      stderr: 'ignore',
    });
  } catch (error) {
    // Silently fail if audio doesn't work
    console.error('Could not play audio:', error);
  }
}

// The main countdown function that runs every second
function tick(): void {
  if (pomodoro.state !== TimerState.RUNNING) return;

  pomodoro.remainingSeconds--;

  // Clear the line and show countdown with colors
  process.stdout.write('\r\x1b[K'); // Clear current line
  
  const timeDisplay = chalk.hex(COLORS.yellow).bold(formatTime(pomodoro.remainingSeconds));
  const sessionDisplay = getSessionDisplay();
  const progressDisplay = `(${pomodoro.completedWorkSessions}/4 work sessions completed)`;
  
  process.stdout.write(`${sessionDisplay} ${timeDisplay} remaining ${chalk.hex(COLORS.overlay2)(progressDisplay)}`);

  // When session completes, auto-transition!
  if (pomodoro.remainingSeconds <= 0) {
    console.log(); // New line
    completeCurrentSession();
  }
}

// Get colored display for current session type
function getSessionDisplay(): string {
  switch (pomodoro.currentSession) {
    case SessionType.WORK:
      return chalk.hex(COLORS.red)('[WORK]');
    case SessionType.STUDY:
      return chalk.hex(COLORS.blue)('[STUDY]');
    case SessionType.SHORT_BREAK:
      return chalk.hex(COLORS.green)('[SHORT BREAK]');
    case SessionType.LONG_BREAK:
      return chalk.hex(COLORS.teal)('[LONG BREAK]');
    case SessionType.CUSTOM:
      return chalk.hex(COLORS.mauve)('[CUSTOM]');
  }
}

// Handle session completion and auto-transitions
function completeCurrentSession(): void {
  // Play completion sound
  playSound('./assets/Sound of a Glitch.wav');
  
  // Play a bell sound (if terminal supports it)
  console.log('\x07'); // Bell character
  
  if (pomodoro.currentSession === SessionType.WORK || pomodoro.currentSession === SessionType.STUDY) {
    pomodoro.completedWorkSessions++;
    const sessionName = pomodoro.currentSession === SessionType.WORK ? 'Work' : 'Study';
    console.log(chalk.hex(COLORS.green).bold(`${sessionName} session complete! Great job!`));

    // Check if it's time for a long break
    if (pomodoro.completedWorkSessions >= pomodoro.sessionsUntilLongBreak) {
      console.log(chalk.hex(COLORS.teal).bold('Time for a long break! You\'ve earned it!'));
      startSession(SessionType.LONG_BREAK, SESSION_DURATIONS.LONG_BREAK);
      pomodoro.completedWorkSessions = 0; // Reset counter
    } else {
      console.log(chalk.hex(COLORS.green).bold('Time for a short break!'));
      startSession(SessionType.SHORT_BREAK, SESSION_DURATIONS.SHORT_BREAK);
    }
  } else {
    // Finished a break - return to the primary session type (WORK or STUDY)
    const sessionName = pomodoro.primarySessionType === SessionType.WORK ? 'work' : 'study';
    console.log(chalk.hex(COLORS.red).bold(`Break's over! Back to ${sessionName}!`));
    
    if (pomodoro.primarySessionType === SessionType.STUDY) {
      startSession(SessionType.STUDY, SESSION_DURATIONS.STUDY);
    } else {
      startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
    }
  }
}

// Start any session type
function startSession(sessionType: SessionType, durationSeconds: number): void {
  // Stop any existing timer
  if (pomodoro.intervalId) {
    clearInterval(pomodoro.intervalId);
  }

  // Set up new session
  pomodoro.state = TimerState.RUNNING;
  pomodoro.currentSession = sessionType;
  pomodoro.remainingSeconds = durationSeconds;
  
  // If starting a WORK or STUDY session, update the primary session type
  if (sessionType === SessionType.WORK || sessionType === SessionType.STUDY) {
    pomodoro.primarySessionType = sessionType;
  }

  // Start the countdown
  pomodoro.intervalId = setInterval(tick, 1000);

  const sessionDisplay = getSessionDisplay();
  const duration = chalk.hex(COLORS.yellow)(formatTime(durationSeconds));
  console.log(`\n${sessionDisplay} ${duration}`);
}

// Public control functions
function startPomodoro(): void {
  console.log(chalk.red.bold('\nPOMODORO TIMER STARTED!'));
  console.log(chalk.gray('Work: 25 min | Short break: 5 min | Long break: 15 min (every 4 work sessions)'));
  console.log(chalk.gray('Press Ctrl+C to stop\n'));
  
  startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
}

function pausePomodoro(): void {
  if (pomodoro.state === TimerState.RUNNING) {
    pomodoro.state = TimerState.PAUSED;
    console.log(chalk.hex(COLORS.yellow)('\n[PAUSED] Timer paused! Press SPACE to resume...'));
  }
}

function resumePomodoro(): void {
  if (pomodoro.state === TimerState.PAUSED) {
    pomodoro.state = TimerState.RUNNING;
    console.log(chalk.hex(COLORS.green)('[RESUMED] Timer resumed!\n'));
  }
}

function stopPomodoro(): void {
  pomodoro.state = TimerState.STOPPED;
  if (pomodoro.intervalId) {
    clearInterval(pomodoro.intervalId);
    pomodoro.intervalId = null;
  }
  pomodoro.remainingSeconds = 0;
  pomodoro.completedWorkSessions = 0;
  console.log(chalk.hex(COLORS.teal).bold('\nPomodoro stopped! Great work today!\n'));
}

// Handle keyboard input for pause/resume
function setupKeyboardControls(onCancel: () => void): void {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  
  const keyHandler = (key: Buffer) => {
    const keyPressed = key.toString();
    
    // Ctrl+C to cancel current session and return to menu
    if (keyPressed === '\u0003') {
      stopPomodoro();
      process.stdin.removeListener('data', keyHandler); // Remove this handler
      process.stdin.setRawMode(false);
      onCancel(); // Call the cancel callback
      return;
    }
    
    // Space to pause/resume
    if (keyPressed === ' ') {
      if (pomodoro.state === TimerState.RUNNING) {
        pausePomodoro();
      } else if (pomodoro.state === TimerState.PAUSED) {
        resumePomodoro();
      }
    }
  };
  
  process.stdin.on('data', keyHandler);
}

// Display interactive menu and get user choice
async function showMenu(): Promise<{ type: SessionType; duration: number } | null> {
  console.clear();
  
  console.log(chalk.hex(COLORS.mauve).bold('='.repeat(50)));
  console.log(chalk.hex(COLORS.mauve).bold('               POMODORO TIMER CLI'));
  console.log(chalk.hex(COLORS.mauve).bold('='.repeat(50)));
  console.log(chalk.hex(COLORS.subtext1)('Built with TypeScript and Bun ❥'));
  console.log();
  
  console.log(chalk.hex(COLORS.text)('Select session type:'));
  console.log(chalk.hex(COLORS.peach)('  1.') + chalk.hex(COLORS.text)(' Work Session (25 minutes)'));
  console.log(chalk.hex(COLORS.peach)('  2.') + chalk.hex(COLORS.text)(' Study Session (30 minutes)'));
  console.log(chalk.hex(COLORS.peach)('  3.') + chalk.hex(COLORS.text)(' Short Break (5 minutes)'));
  console.log(chalk.hex(COLORS.peach)('  4.') + chalk.hex(COLORS.text)(' Long Break (15 minutes)'));
  console.log(chalk.hex(COLORS.peach)('  5.') + chalk.hex(COLORS.text)(' Custom Duration'));
  console.log(chalk.hex(COLORS.peach)('  6.') + chalk.hex(COLORS.text)(' Exit'));
  console.log();
  
  // Read user input
  process.stdout.write(chalk.hex(COLORS.yellow)('Enter choice (1-6): '));
  
  // Wait for user input
  const choice = await new Promise<string>((resolve) => {
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
  
  switch (choice) {
    case '1':
      return { type: SessionType.WORK, duration: SESSION_DURATIONS.WORK };
    case '2':
      return { type: SessionType.STUDY, duration: SESSION_DURATIONS.STUDY };
    case '3':
      return { type: SessionType.SHORT_BREAK, duration: SESSION_DURATIONS.SHORT_BREAK };
    case '4':
      return { type: SessionType.LONG_BREAK, duration: SESSION_DURATIONS.LONG_BREAK };
    case '5':
      // Custom duration
      process.stdout.write(chalk.hex(COLORS.yellow)('Enter duration in minutes: '));
      const minutes = await new Promise<string>((resolve) => {
        process.stdin.once('data', (data) => {
          resolve(data.toString().trim());
        });
      });
      const duration = parseInt(minutes) * 60;
      if (isNaN(duration) || duration <= 0) {
        console.log(chalk.hex(COLORS.red)('Invalid duration. Returning to menu...'));
        await new Promise(resolve => setTimeout(resolve, 2000));
        return showMenu(); // Show menu again
      }
      return { type: SessionType.CUSTOM, duration };
    case '6':
      console.log(chalk.hex(COLORS.teal)('Goodbye!'));
      process.exit(0);
    default:
      console.log(chalk.hex(COLORS.red)('Invalid choice. Please try again.'));
      await new Promise(resolve => setTimeout(resolve, 2000));
      return showMenu(); // Show menu again
  }
}

// Main function - entry point with menu loop
async function main(): Promise<void> {
  // Set up stdin for menu input
  process.stdin.setRawMode(false);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  // Menu loop
  while (true) {
    const choice = await showMenu();
    
    if (!choice) {
      continue; // Show menu again if something went wrong
    }
    
    // Start the selected session
    console.clear();
    console.log(chalk.hex(COLORS.mauve).bold('='.repeat(50)));
    console.log(chalk.hex(COLORS.mauve).bold('       POMODORO TIMER'));
    console.log(chalk.hex(COLORS.mauve).bold('='.repeat(50)));
    console.log(chalk.hex(COLORS.subtext1)('Controls: [SPACE] pause/resume | [Ctrl+C] cancel'));
    console.log();
    
    // Set up keyboard controls with cancel callback
    const cancelRequested = { value: false };
    setupKeyboardControls(() => {
      cancelRequested.value = true;
    });
    
    // Start the timer
    startSession(choice.type, choice.duration);
    
    // Wait for the session to complete or be cancelled
    await new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (pomodoro.state === TimerState.STOPPED || cancelRequested.value) {
          clearInterval(checkInterval);
          if (pomodoro.intervalId) {
            clearInterval(pomodoro.intervalId);
            pomodoro.intervalId = null;
          }
          resolve();
        }
      }, 100);
    });
    
    // Clean up and return to menu
    if (cancelRequested.value) {
      console.log(chalk.hex(COLORS.yellow)('\n\nSession cancelled. Returning to menu...'));
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }
}

main().catch(console.error);
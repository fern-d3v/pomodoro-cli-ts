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
  SHORT_BREAK = "Short Break", 
  LONG_BREAK = "Long Break",
}

// Timer configuration and state
const pomodoro = {
  state: TimerState.STOPPED as TimerState,
  currentSession: SessionType.WORK as SessionType,
  remainingSeconds: 0 as number,
  intervalId: null as NodeJS.Timeout | null,
  completedWorkSessions: 0 as number,
  sessionsUntilLongBreak: 4 as number,
};

// Session durations in seconds (25 min work, 5 min short break, 15 min long break)
const SESSION_DURATIONS = {
  WORK: 25 * 60,        // 25 minutes 
  SHORT_BREAK: 5 * 60,  // 5 minutes
  LONG_BREAK: 15 * 60,  // 15 minutes
};

// Helper function to format time as MM:SS
function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${minutes}:${secondsStr}`;
}

// The main countdown function that runs every second
function tick(): void {
  if (pomodoro.state !== TimerState.RUNNING) return;

  pomodoro.remainingSeconds--;

  // Clear the line and show countdown with colors
  process.stdout.write('\r\x1b[K'); // Clear current line
  
  const timeDisplay = chalk.bold.yellow(formatTime(pomodoro.remainingSeconds));
  const sessionDisplay = getSessionDisplay();
  const progressDisplay = `(${pomodoro.completedWorkSessions}/4 work sessions completed)`;
  
  process.stdout.write(`${sessionDisplay} ${timeDisplay} remaining ${chalk.gray(progressDisplay)}`);

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
      return chalk.red('🍅 Work Session:');
    case SessionType.SHORT_BREAK:
      return chalk.green('☕ Short Break:');
    case SessionType.LONG_BREAK:
      return chalk.blue('🌴 Long Break:');
  }
}

// Handle session completion and auto-transitions
function completeCurrentSession(): void {
  // Play a bell sound (if terminal supports it)
  console.log('\x07'); // Bell character
  
  if (pomodoro.currentSession === SessionType.WORK) {
    pomodoro.completedWorkSessions++;
    console.log(chalk.green.bold('🎉 Work session complete! Great job!'));

    // Check if it's time for a long break
    if (pomodoro.completedWorkSessions >= pomodoro.sessionsUntilLongBreak) {
      console.log(chalk.blue.bold('🌴 Time for a long break! You\'ve earned it!'));
      startSession(SessionType.LONG_BREAK, SESSION_DURATIONS.LONG_BREAK);
      pomodoro.completedWorkSessions = 0; // Reset counter
    } else {
      console.log(chalk.green.bold('☕ Time for a short break!'));
      startSession(SessionType.SHORT_BREAK, SESSION_DURATIONS.SHORT_BREAK);
    }
  } else {
    // Finished a break
    console.log(chalk.red.bold('🍅 Break\'s over! Back to work!'));
    startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
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

  // Start the countdown
  pomodoro.intervalId = setInterval(tick, 1000);

  const sessionDisplay = getSessionDisplay();
  const duration = chalk.yellow(formatTime(durationSeconds));
  console.log(`\n${sessionDisplay} ${duration}`);
}

// Public control functions
function startPomodoro(): void {
  console.log(chalk.red.bold('\n🍅 POMODORO TIMER STARTED! 🍅'));
  console.log(chalk.gray('Work: 25 min | Short break: 5 min | Long break: 15 min (every 4 work sessions)'));
  console.log(chalk.gray('Press Ctrl+C to stop\n'));
  
  startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
}

function pausePomodoro(): void {
  if (pomodoro.state === TimerState.RUNNING) {
    pomodoro.state = TimerState.PAUSED;
    console.log(chalk.yellow('\n⏸️ Timer paused! Press any key to resume...'));
  }
}

function resumePomodoro(): void {
  if (pomodoro.state === TimerState.PAUSED) {
    pomodoro.state = TimerState.RUNNING;
    console.log(chalk.green('▶️ Timer resumed!\n'));
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
  console.log(chalk.blue.bold('\n🛑 Pomodoro stopped! Great work today! 🎉\n'));
}

// Handle keyboard input for pause/resume
function setupKeyboardControls(): void {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', (key: Buffer) => {
    const keyPressed = key.toString();
    
    // Ctrl+C to quit
    if (keyPressed === '\u0003') {
      stopPomodoro();
      process.exit(0);
    }
    
    // Space to pause/resume
    if (keyPressed === ' ') {
      if (pomodoro.state === TimerState.RUNNING) {
        pausePomodoro();
      } else if (pomodoro.state === TimerState.PAUSED) {
        resumePomodoro();
      }
    }
  });
}

// Main function - entry point
function main(): void {
  console.clear(); // Clear terminal
  
  console.log(chalk.red.bold('='.repeat(50)));
  console.log(chalk.red.bold('🍅     POMODORO TIMER CLI     🍅'));
  console.log(chalk.red.bold('='.repeat(50)));
  console.log(chalk.gray('Built with TypeScript and Bun'));
  console.log(chalk.gray('Controls: [SPACE] pause/resume | [Ctrl+C] quit'));
  
  // Set up keyboard controls
  setupKeyboardControls();
  
  // Start the pomodoro timer
  startPomodoro();
}

// Run the app!
main();
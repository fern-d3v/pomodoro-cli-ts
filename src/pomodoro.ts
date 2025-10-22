// Pomodoro Timer - Step 1: Basic Structure

enum TimerState {
  STOPPED = "Timer is not running", // Timer is not running (use quotes!)
  RUNNING = "Timer is currently running", // Timer is currently running
  PAUSED = "Timer is paused", // Timer is temporarily paused
}

enum SessionType {
  DEV = "Dev Session (60 Minutes)",
  STUDY = "Study Session (25 minutes)",
  WORK = "Work Session (25 minutes)", // Work session (25 minutes)
  SHORT_BREAK = "Short break (5 minutes)", // Short break (5 minutes)
  LONG_BREAK = "Long break (15 minutes)", // Long break (15 minutes)
}

const timer = {
  state: TimerState.STOPPED as TimerState, // What state is the timer in?
  currentSession: SessionType.WORK as SessionType, // What type of session?
  remainingMinutes: 0 as number, // How many minutes left?
};

function startWorkSession(): void {
  timer.state = TimerState.RUNNING;
  timer.currentSession = SessionType.WORK;
  timer.remainingMinutes = 25; // 25 minutes for work

  console.log("Work session started! 25 minutes on the clock.");
  console.log(`Timer state: ${timer.state}`);
  console.log(`Session type: ${timer.currentSession}`);
}

startWorkSession();

function pauseTimer(): void {
  timer.state = TimerState.PAUSED;
  timer.currentSession = SessionType.WORK;
  timer.remainingMinutes = timer.remainingMinutes; // Creates a string
}

import { UploaderMachineProps } from "../components/types";

export const states = { 
    IDLE: "IDLE", 
    HOVERING: "HOVERING", 
    UPLOADING: "UPLOADING", 
    SUCCESS: "SUCCESS" 
};

export const events = { 
    MOUSEENTER: "MOUSEENTER", 
    MOUSELEAVE: "MOUSELEAVE", 
    CLICK: "CLICK", 
    SUCCESS: "SUCCESS", 
    RESET: "RESET", 
    UPLOADED: "UPLOADED" 
};

export const TIMEOUT = 2000;

export const uploadStateMachine = {
    initial: states.IDLE,
    states: {
      [states.IDLE]: {
        on: {
          [events.CLICK]: states.UPLOADING,
          [events.MOUSEENTER]: states.HOVERING
        }
      },
      [states.HOVERING]: {
        on: {
          [events.CLICK]: states.UPLOADING,
          [events.MOUSELEAVE]: states.IDLE
        }
      },
      [states.UPLOADING]: {
        on: { 
          [events.UPLOADED]: states.SUCCESS,
          [events.MOUSELEAVE]: states.UPLOADING,
          [events.MOUSEENTER]: states.UPLOADING,
        }
      },
      [states.SUCCESS]: {
        on: {
          [events.CLICK]: states.IDLE,
          [events.RESET]: states.IDLE,
          // [events.MOUSELEAVE]: states.IDLE,
        }
      }
    }
};

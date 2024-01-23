import { UploaderMachineProps } from "../components/types";

export const states = { 
    IDLE: "IDLE", 
    HOVERING: "HOVERING", 
    SELECTION: "SELECTION", 
    UPLOADING: "UPLOADING", 
    SUCCESS: "SUCCESS" 
};

export const events = { 
    MOUSEENTER: "MOUSEENTER", 
    MOUSELEAVE: "MOUSELEAVE", 
    CLICK: "CLICK", 
    SELECTED: "SELECTED", 
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
          // [events.CLICK]: states.UPLOADING,
          [events.CLICK]: states.SELECTION,
          [events.MOUSEENTER]: states.HOVERING,
          [events.MOUSELEAVE]: states.IDLE
        }
      },
      [states.HOVERING]: {
        on: {
          [events.CLICK]: states.SELECTION,
          [events.MOUSELEAVE]: states.IDLE
        }
      },
      [states.SELECTION]: {
        on: { 
          [events.SELECTED]: states.UPLOADING,
          [events.MOUSELEAVE]: states.UPLOADING,
          [events.MOUSEENTER]: states.UPLOADING,
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
          [events.MOUSELEAVE]: states.IDLE,
        }
      }
    }
};

export const defaultFileTypes = "image/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const fileExtensions = {
  'application/pdf': 'pdf',
  
}
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
          [events.CLICK]: states.UPLOADING,
          [events.MOUSEENTER]: states.HOVERING,
          [events.MOUSELEAVE]: states.IDLE,
        }
      },
      [states.HOVERING]: {
        on: {
          [events.CLICK]: states.UPLOADING,
          [events.MOUSELEAVE]: states.IDLE,
        }
      },
      [states.UPLOADING]: {
        on: { 
          [events.UPLOADED]: states.SUCCESS,
        }
      },
      [states.SUCCESS]: {
        on: {
          [events.CLICK]: states.IDLE,
          [events.RESET]: states.IDLE,
        }
      }
    }
};

export const defaultFileTypes = "image/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const fileExtensions = {
  'application/pdf': 'pdf',
  '.jpg': 'JPG',
  '.jpeg': 'JPEG',
  '.doc': 'DOC',
  '.png': 'PNG',
  '.docx': 'DOCX',
  '.xml': 'XML',
  '.mp4': 'MP4',
  '.avi': 'AVI',
  '.mkv': 'MKV',
  '.gif': 'GIF',
  '.webp': 'WEBP',
  '.svg': 'SVG',
  '.bmp': 'BMP',
} as Record<string, string>
interface ILogOnDev {
  log: (message: string, color: string) => void;
  info: (message: string, color?: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  dir: (message: any) => void;
}

const logOnDev: ILogOnDev = {
  log: (message: any, color = '') => {
    if (import.meta.env.MODE === 'development') {
      console.log(message, color);
    }
  },

  error: (message: any) => {
    if (import.meta.env.MODE === 'development') {
      console.error(message);
    }
  },

  info: (message: any, color = '') => {
    if (import.meta.env.MODE === 'development') {
      console.info(message, color);
    }
  },

  warn: (message: any) => {
    if (import.meta.env.MODE === 'development') {
      console.warn(message);
    }
  },

  dir: (message: any) => {
    if (import.meta.env.MODE === 'development') {
      console.dir(message);
    }
  },
};

export { logOnDev };

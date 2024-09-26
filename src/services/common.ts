import {AnyObject} from '@loopback/repository';

const appConfig = require('../config')[process.env.NODE_ENV || 'local'];

export function getAppConfig() {
  return appConfig;
}

export function generateString(): string {
  let pass = '';
  const str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$';

  for (let i = 1; i <= 60; i++) {
    const char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

  return pass;
}

export function filterEmailContent(content: string, obj: AnyObject) {
  obj = obj || {};
  if (content) {
    const keys = content.match(/\[(.+?)\]/g);
    if (keys?.length) {
      keys.forEach(function (k: any) {
        content = content.replace(k, obj[k.slice(1, -1)]);
      });
    }
  }
  return content;
}

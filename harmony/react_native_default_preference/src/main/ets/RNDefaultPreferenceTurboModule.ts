/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import dataPreferences from '@ohos.data.preferences';
import { BusinessError } from '@ohos.base';
import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import Logger from './Logger'


let preferences: dataPreferences.Preferences | null = null;
const DEFAULT = 'default'
let options = { name:'defultName' }


export class RNDefaultPreferenceTurboModule extends TurboModule implements TM.DefaultPreferenceNativeModule.Spec {
  constructor(ctx) {
    super(ctx);
  }

  get(key: string): Promise<string | null> {
    return new Promise((res) => {
      let preferencesName: dataPreferences.Options = { name: options.name };
      preferences = dataPreferences.getPreferencesSync(this.ctx.uiAbilityContext, preferencesName);
      preferences.get(key, DEFAULT, async(err: BusinessError, val: string) => {
        if (err) {
          Logger.error("Failed to get value of 'startup'. code =" + err.code + ", message =" + err.message);
          return;
        }
        res(val)
      })
    })
  }

  set(key: string, value: string): Promise<void> {
    return new Promise(() => {
      let preferencesName: dataPreferences.Options = { name: options.name };
      preferences = dataPreferences.getPreferencesSync(this.ctx.uiAbilityContext, preferencesName);
      preferences.put(key, value, (err: BusinessError) => {
        if (err) {
          Logger.error("Failed to put value of 'startup'. code =" + err.code + ", message =" + err.message);
          return;
        }
        Logger.info("Succeeded in putting value of 'startup'.");
      })
      preferences.flush((err: BusinessError) => {
        if (err) {
          Logger.error("Failed to flush. code =" + err.code + ", message =" + err.message);
          return;
        }
        Logger.info("Succeeded in flushing.");
      })
    })
  }

  clear(key: string): Promise<void> {
    return new Promise(() => {
      preferences.delete(key, (err: BusinessError) => {
        if (err) {
          console.error("Failed to delete the key 'startup'. code =" + err.code + ", message =" + err.message);
          return;
        }
        console.info("Succeeded in deleting the key 'startup'.");
      })
    })
  }

  getMultiple(keys: string[]): Promise<string[]> {
    return new Promise(async (res) => {
      let resArry=[]
      for (const element of keys) {
        let getItem = await this.get(element)
        resArry.push(getItem)
      }
      res(resArry)
    })
  }

  setMultiple(data: {}): Promise<void> {
    return new Promise(async () => {
      for (const key in data) {
        this.set(key,data[key])
      }
    })
  }

  clearMultiple(keys: string[]): Promise<void> {
    return new Promise(async () => {
      for (const key of keys) {
        this.clear(key)
      }
    })
  }

  getAll(): Promise<{}> {
    return new Promise((res) => {
      let preferencesName: dataPreferences.Options = { name: options.name };
      preferences = dataPreferences.getPreferencesSync(this.ctx.uiAbilityContext, preferencesName);
      preferences.getAll(async (err: BusinessError, value: Object) => {
        if (err) {
          Logger.error("Failed to get all key-values. code =" + err.code + ", message =" + err.message);
          return;
        }
        let allKeys = this.getObjKeys(value);
        res(allKeys)
      })
    })
  }

  clearAll(): Promise<void> {
    return new Promise(()=>{
      let preferencesName: dataPreferences.Options = { name: options.name };
      preferences = dataPreferences.getPreferencesSync(this.ctx.uiAbilityContext, preferencesName);
      preferences.clear((err: BusinessError) =>{
        if (err) {
          console.error("Failed to clear. code =" + err.code + ", message =" + err.message);
          return;
        }
        console.info("Succeeded in clearing.");
      })
    })
  }

  getName(): Promise<string> {
    return new Promise((res)=>{
      res(options.name)
    })
  }

  setName(name: string): Promise<void> {
    return new Promise(()=>{
      options.name = name
    })
  }

  getObjKeys(obj: Object): string[] {
    let keys = Object.keys(obj);
    return keys;
  }

}
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  get(key: string): Promise<string | undefined | null>;
  set(key: string, value: string): Promise<void>;
  clear(key: string): Promise<void>;
  getMultiple(keys: string[]): Promise<string[]>;
  setMultiple(data: {}): Promise<void>;
  clearMultiple(keys: string[]): Promise<void>;
  getAll(): Promise<{}>;
  clearAll(): Promise<void>;
  getName(): Promise<string>;
  setName(name: string): Promise<void>;
} 
export default TurboModuleRegistry.get<Spec>('DefaultPreferenceNativeModule') as Spec | null;
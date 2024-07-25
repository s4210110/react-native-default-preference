
import { NativeModules,Platform  } from 'react-native';
import preference from './src/NativeDefaultPreference'
let RNDefaultPreference
if (Platform.OS == 'harmony') {
    RNDefaultPreference = preference
}else{
    RNDefaultPreference = NativeModules;
}


export default RNDefaultPreference;

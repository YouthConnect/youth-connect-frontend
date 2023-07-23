// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch';
import XMLHttpRequest from 'xhr2';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

global.XMLHttpRequest = XMLHttpRequest;

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom';

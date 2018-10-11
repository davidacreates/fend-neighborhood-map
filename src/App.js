import React from 'react';
import Map from './components/Map';
import './App.css';

// // TODO: Remove below commented code if I don't use state in this component
// export default class App extends Component {
//   state = {
//     venues: [],
//     photos: [],
//   };

//   render() {
//     const { venues } = this.state;
//     return (
//       <div>
//         <Map venues={venues} />
//       </div>
//     );
//   }
// }

const App = () => (
  <div>
    <Map />
  </div>
);

export default App;

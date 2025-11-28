import { Spinner as CatSpinner } from './component/CatSpinner';

import './styles/App.css'; 

function App() {
  return (
    <div className="app-container" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <CatSpinner
        isLoading={true} 
        size="custom"
        captionText={[
          "Polishing my tuxedo...",
          "Loading purrfectly...",
          "Thinking about tuna...",
          "Initialising zoomies...",
        ]}
        captionInterval={3000}
      />

      <div style={{ marginTop: '50px' }}>
          <h1>This is a permanent dashboard.</h1>
          <p>The Cat is always busy.</p>
      </div>

    </div>
  );
}

export default App;
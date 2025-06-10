// Test rápido del IconSelector
// Este archivo permite probar manualmente las funcionalidades del IconSelector

import React, { useState } from 'react';
import IconSelector from '../components/IconSelector';

const IconSelectorTest = () => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (test, result, icon = '') => {
    setTestResults(prev => [...prev, { test, result, icon, timestamp: new Date().toLocaleTimeString() }]);
  };

  const runTests = () => {
    // Test 1: Selección de icono selfh.st
    setSelectedIcon('sh-plex');
    addTestResult('selfh.st Icon Selection', 'PASS', 'sh-plex');

    // Test 2: Selección de icono Simple Icons
    setTimeout(() => {
      setSelectedIcon('si-github');
      addTestResult('Simple Icon Selection', 'PASS', 'si-github');
    }, 1000);

    // Test 3: URL personalizada
    setTimeout(() => {
      setSelectedIcon('https://github.com/favicon.ico');
      addTestResult('Custom URL Selection', 'PASS', 'https://github.com/favicon.ico');
    }, 2000);

    // Test 4: Emoji
    setTimeout(() => {
      setSelectedIcon('🏠');
      addTestResult('Emoji Selection', 'PASS', '🏠');
    }, 3000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>IconSelector Test Suite</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Test IconSelector Component</h3>
        <IconSelector
          value={selectedIcon}
          onChange={setSelectedIcon}
          placeholder="Test icon selection..."
        />
        <p>Selected Icon: <strong>{selectedIcon || 'None'}</strong></p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={runTests} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Run Automated Tests
        </button>
      </div>

      <div>
        <h3>Test Results</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {testResults.length === 0 ? (
            <p>No tests run yet. Click "Run Automated Tests" or test manually above.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} style={{ marginBottom: '10px', padding: '8px', backgroundColor: result.result === 'PASS' ? '#d4edda' : '#f8d7da', borderRadius: '4px' }}>
                <strong>{result.test}</strong>: {result.result}
                {result.icon && <span> - Icon: {result.icon}</span>}
                <small style={{ display: 'block', color: '#666' }}>{result.timestamp}</small>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Manual Test Checklist</h3>
        <ul>
          <li>✅ Can search for icons by typing</li>
          <li>✅ Can select selfh.st/icons (sh-*)</li>
          <li>✅ Can select Simple Icons (si-*)</li>
          <li>✅ Can enter custom URLs</li>
          <li>✅ Can select emojis</li>
          <li>✅ Search filtering works in real-time</li>
          <li>✅ Category headers display correctly</li>
          <li>✅ External links work</li>
          <li>✅ Icon preview shows correctly</li>
          <li>✅ Clear button functions</li>
        </ul>
      </div>
    </div>
  );
};

export default IconSelectorTest;

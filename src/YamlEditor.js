import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/yaml/yaml');

function YamlEditor({ filePath }) {
  const [yamlData, setYamlData] = useState('');

  const handleChange = (editor, data, value) => {
    setYamlData(value);
  };

  const handleLoad = () => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setYamlData(text))
      .catch((error) => console.error('Error loading YAML:', error));
  };

  const handleSave = () => {
    try {
      yaml.load(yamlData);
      // Save the YAML data to a file or do something else with it
      console.log('YAML is valid. Saving...');

      const script = `echo '${yamlData}' > ${filePath}`
      default_api.developer__shell(command = script)
      .then(()=> alert("Saved!"))

    } catch (e) {
      alert('Invalid YAML: ' + e);
    }
  };

  return (
    <div>
      <h2>{filePath}</h2>
      <button onClick={handleLoad}>Load YAML</button>
      <CodeMirror
        value={yamlData}
        options={{
          mode: 'yaml',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          handleChange(editor, data, value);
        }}
        onChange={(editor, data, value) => {
          handleChange(editor, data, value);
        }}
      />
      <button onClick={handleSave}>Save YAML</button>
    </div>
  );
}

export default YamlEditor;
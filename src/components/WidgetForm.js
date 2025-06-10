// WidgetForm.js - Maneja Information Widgets independientes que van en widgets.yaml
// Estos widgets aparecen en el header de Homepage y NO se asocian con servicios específicos
// NO confundir con Service Widgets que van en services.yaml (manejados por ServiceForm.js)
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const FormContainer = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  transition: all 0.2s ease;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const OptionsContainer = styled.div`
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  padding: 15px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  transition: all 0.2s ease;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const OptionInput = styled(Input)`
  flex: 1;
`;

const RemoveButton = styled.button`
  background: ${props => props.theme?.colors?.danger || '#dc3545'};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.dangerHover || '#c82333'};
  }
`;

const AddOptionButton = styled.button`
  background: ${props => props.theme?.colors?.success || '#28a745'};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.successHover || '#218838'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &.primary {
    background: ${props => props.theme?.colors?.primary || '#007acc'};
    color: white;
    
    &:hover {
      background: ${props => props.theme?.colors?.primaryHover || '#0056b3'};
    }
  }
  
  &.secondary {
    background: ${props => props.theme?.colors?.secondary || '#6c757d'};
    color: white;
    
    &:hover {
      background: ${props => props.theme?.colors?.secondaryHover || '#5a6268'};
    }
  }
`;

// Tipos de Information Widgets (para widgets.yaml) - Estos aparecen en el header de Homepage
const INFO_WIDGET_TYPES = [
  // Información General
  { value: 'search', label: 'Search Bar', category: 'Navigation' },
  { value: 'bookmarks', label: 'Bookmarks', category: 'Navigation' },
  { value: 'logo', label: 'Logo', category: 'Branding' },
  { value: 'greeting', label: 'Greeting Message', category: 'Personalization' },
  { value: 'datetime', label: 'Date & Time', category: 'Information' },

  // Información del Sistema
  { value: 'resources', label: 'System Resources', category: 'System Info' },
  { value: 'glances', label: 'Glances System Monitor', category: 'System Info' },
  { value: 'unifi_controller', label: 'UniFi Controller Info', category: 'System Info' },

  // Clima y Ubicación
  { value: 'weather', label: 'Weather Widget', category: 'Weather' },
  { value: 'openweathermap', label: 'OpenWeatherMap', category: 'Weather' },
  { value: 'openmeteo', label: 'OpenMeteo', category: 'Weather' },

  // Finanzas e Información
  { value: 'stocks', label: 'Stock Information', category: 'Finance' },
  { value: 'calendar', label: 'Calendar', category: 'Productivity' },

  // Personalización
  { value: 'iframe', label: 'Custom iFrame', category: 'Custom' },
  { value: 'customapi', label: 'Custom API', category: 'Custom' }
];

// Configuración específica de parámetros para Information Widgets
const INFO_WIDGET_PARAMETERS = {
  // Navegación y Búsqueda
  'search': {
    required: [],
    optional: ['provider', 'target'],
    fields: {
      provider: { 
        type: 'select', 
        label: 'Search Provider', 
        options: [
          { value: 'google', label: 'Google' },
          { value: 'bing', label: 'Bing' },
          { value: 'duckduckgo', label: 'DuckDuckGo' },
          { value: 'custom', label: 'Custom' }
        ],
        default: 'google'
      },
      target: { 
        type: 'select', 
        label: 'Link Target', 
        options: [
          { value: '_blank', label: 'New Tab' },
          { value: '_self', label: 'Same Tab' }
        ],
        default: '_blank'
      }
    }
  },

  'bookmarks': {
    required: [],
    optional: ['style', 'abbr'],
    fields: {
      style: { 
        type: 'select', 
        label: 'Display Style', 
        options: [
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' }
        ],
        default: 'list'
      },
      abbr: { type: 'checkbox', label: 'Show abbreviations' }
    }
  },

  'logo': {
    required: [],
    optional: ['icon', 'href', 'target'],
    fields: {
      icon: { type: 'url', label: 'Logo Image URL', placeholder: 'https://example.com/logo.png' },
      href: { type: 'url', label: 'Link URL (optional)', placeholder: 'https://homepage.dev' },
      target: { 
        type: 'select', 
        label: 'Link Target', 
        options: [
          { value: '_blank', label: 'New Tab' },
          { value: '_self', label: 'Same Tab' }
        ],
        default: '_blank'
      }
    }
  },

  'greeting': {
    required: [],
    optional: ['text', 'text_size', 'color'],
    fields: {
      text: { type: 'text', label: 'Greeting Text', placeholder: 'Good morning, {username}!' },
      text_size: { 
        type: 'select', 
        label: 'Text Size', 
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' }
        ],
        default: 'lg'
      },
      color: { type: 'text', label: 'Text Color (optional)', placeholder: '#ffffff or theme' }
    }
  },

  'datetime': {
    required: [],
    optional: ['text_size', 'format', 'locale', 'timezone'],
    fields: {
      text_size: { 
        type: 'select', 
        label: 'Text Size', 
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' }
        ],
        default: 'lg'
      },
      format: { 
        type: 'select', 
        label: 'Date Format', 
        options: [
          { value: 'short', label: 'Short (12/31/2023)' },
          { value: 'long', label: 'Long (December 31, 2023)' },
          { value: 'full', label: 'Full (Sunday, December 31, 2023)' },
          { value: 'custom', label: 'Custom' }
        ],
        default: 'long'
      },
      locale: { type: 'text', label: 'Locale (optional)', placeholder: 'en-US, es-ES, etc.' },
      timezone: { type: 'text', label: 'Timezone (optional)', placeholder: 'America/New_York' }
    }
  },

  // Sistema
  'resources': {
    required: [],
    optional: ['cpu', 'memory', 'disk', 'cputemp', 'tempmin', 'tempmax', 'uptime', 'units', 'refresh', 'diskUnits', 'network', 'label', 'expanded'],
    fields: {
      cpu: { type: 'checkbox', label: 'Show CPU usage', default: true },
      memory: { type: 'checkbox', label: 'Show memory usage', default: true },
      disk: { type: 'text', label: 'Disk mount path', placeholder: '/disk/mount/path' },
      cputemp: { type: 'checkbox', label: 'Show CPU temperature' },
      tempmin: { type: 'number', label: 'Min CPU temp', placeholder: '0' },
      tempmax: { type: 'number', label: 'Max CPU temp', placeholder: '100' },
      uptime: { type: 'checkbox', label: 'Show uptime' },
      units: { 
        type: 'select', 
        label: 'Temperature units', 
        options: [
          { value: 'metric', label: 'Celsius' },
          { value: 'imperial', label: 'Fahrenheit' }
        ], 
        default: 'metric' 
      },
      refresh: { type: 'number', label: 'Refresh interval (ms)', placeholder: '3000', default: '3000' },
      diskUnits: { 
        type: 'select', 
        label: 'Disk units', 
        options: [
          { value: 'bytes', label: 'Bytes' },
          { value: 'bbytes', label: 'Binary Bytes' }
        ], 
        default: 'bytes' 
      },
      network: { type: 'text', label: 'Network interface (optional)', placeholder: 'eth0' },
      label: { type: 'text', label: 'Custom label', placeholder: 'My Server' },
      expanded: { type: 'checkbox', label: 'Show expanded view' }
    }
  },

  'glances': {
    required: ['url'],
    optional: ['username', 'password', 'version', 'cpu', 'mem', 'cputemp', 'uptime', 'disk', 'diskUnits', 'expanded', 'label'],
    fields: {
      url: { type: 'url', label: 'Glances URL', placeholder: 'http://glances.host.or.ip:61208' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' },
      version: { 
        type: 'select', 
        label: 'Glances Version', 
        options: [
          { value: '3', label: 'Version 3' },
          { value: '4', label: 'Version 4' }
        ], 
        default: '3' 
      },
      cpu: { type: 'checkbox', label: 'Show CPU', default: true },
      mem: { type: 'checkbox', label: 'Show Memory', default: true },
      cputemp: { type: 'checkbox', label: 'Show CPU Temperature' },
      uptime: { type: 'checkbox', label: 'Show Uptime' },
      disk: { type: 'text', label: 'Disk mount point(s)', placeholder: '/ or /,/home' },
      diskUnits: { 
        type: 'select', 
        label: 'Disk Units', 
        options: [
          { value: 'bytes', label: 'Bytes' },
          { value: 'bbytes', label: 'Binary Bytes' }
        ], 
        default: 'bytes' 
      },
      expanded: { type: 'checkbox', label: 'Show expanded view' },
      label: { type: 'text', label: 'Custom label', placeholder: 'Remote Server' }
    }
  },

  'unifi_controller': {
    required: ['url'],
    optional: ['username', 'password', 'key', 'site'],
    fields: {
      url: { type: 'url', label: 'UniFi Controller URL', placeholder: 'https://unifi.host.or.ip:8443' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      key: { type: 'text', label: 'API Key (alternative)', placeholder: 'your-api-key' },
      site: { type: 'text', label: 'Site Name (optional)', placeholder: 'default' }
    }
  },

  // Clima
  'weather': {
    required: ['latitude', 'longitude'],
    optional: ['units', 'apikey', 'cache'],
    fields: {
      latitude: { type: 'number', label: 'Latitude', placeholder: '40.7128', step: 'any' },
      longitude: { type: 'number', label: 'Longitude', placeholder: '-74.0060', step: 'any' },
      units: { 
        type: 'select', 
        label: 'Units', 
        options: [
          { value: 'metric', label: 'Metric (°C)' },
          { value: 'imperial', label: 'Imperial (°F)' },
          { value: 'standard', label: 'Standard (K)' }
        ], 
        default: 'metric' 
      },
      apikey: { type: 'text', label: 'API Key (optional)', placeholder: 'your-weather-api-key' },
      cache: { type: 'number', label: 'Cache Duration (minutes)', placeholder: '5', default: '5' }
    }
  },

  'openweathermap': {
    required: ['latitude', 'longitude', 'apikey'],
    optional: ['units', 'cache', 'label'],
    fields: {
      latitude: { type: 'number', label: 'Latitude', placeholder: '40.7128', step: 'any' },
      longitude: { type: 'number', label: 'Longitude', placeholder: '-74.0060', step: 'any' },
      apikey: { type: 'text', label: 'OpenWeatherMap API Key', placeholder: 'your-openweather-api-key' },
      units: { 
        type: 'select', 
        label: 'Units', 
        options: [
          { value: 'metric', label: 'Metric (°C)' },
          { value: 'imperial', label: 'Imperial (°F)' },
          { value: 'standard', label: 'Standard (K)' }
        ], 
        default: 'metric' 
      },
      cache: { type: 'number', label: 'Cache Duration (minutes)', placeholder: '5', default: '5' },
      label: { type: 'text', label: 'Custom label', placeholder: 'Current Weather' }
    }
  },

  'openmeteo': {
    required: ['latitude', 'longitude'],
    optional: ['cache', 'label'],
    fields: {
      latitude: { type: 'number', label: 'Latitude', placeholder: '40.7128', step: 'any' },
      longitude: { type: 'number', label: 'Longitude', placeholder: '-74.0060', step: 'any' },
      cache: { type: 'number', label: 'Cache Duration (minutes)', placeholder: '5', default: '5' },
      label: { type: 'text', label: 'Custom label', placeholder: 'Weather' }
    }
  },

  // Finanzas
  'stocks': {
    required: ['provider', 'watchlist'],
    optional: ['color', 'cache'],
    fields: {
      provider: { 
        type: 'select', 
        label: 'Data Provider', 
        options: [
          { value: 'finnhub', label: 'Finnhub' }
        ],
        default: 'finnhub'
      },
      watchlist: { type: 'text', label: 'Stock Symbols (comma separated)', placeholder: 'AAPL,MSFT,GOOGL,TSLA' },
      color: { type: 'checkbox', label: 'Show price change colors', default: true },
      cache: { type: 'number', label: 'Cache Duration (minutes)', placeholder: '1', default: '1' }
    }
  },

  // Personalización
  'calendar': {
    required: [],
    optional: ['firstDayInWeek', 'view', 'maxEvents', 'showTime', 'timezone'],
    fields: {
      firstDayInWeek: { 
        type: 'select', 
        label: 'First Day of Week', 
        options: [
          { value: 'monday', label: 'Monday' },
          { value: 'sunday', label: 'Sunday' }
        ], 
        default: 'monday' 
      },
      view: { 
        type: 'select', 
        label: 'Calendar View', 
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'agenda', label: 'Agenda' }
        ], 
        default: 'monthly' 
      },
      maxEvents: { type: 'number', label: 'Max Events to Show', placeholder: '10', default: '10' },
      showTime: { type: 'checkbox', label: 'Show event times' },
      timezone: { type: 'text', label: 'Timezone (optional)', placeholder: 'America/New_York' }
    }
  },

  'iframe': {
    required: ['name', 'src'],
    optional: ['width', 'height', 'allowpopups', 'allowforms'],
    fields: {
      name: { type: 'text', label: 'Frame Name', placeholder: 'My Widget' },
      src: { type: 'url', label: 'Source URL', placeholder: 'https://example.com' },
      width: { type: 'number', label: 'Width (optional)', placeholder: '800' },
      height: { type: 'number', label: 'Height (optional)', placeholder: '600' },
      allowpopups: { type: 'checkbox', label: 'Allow popups' },
      allowforms: { type: 'checkbox', label: 'Allow forms' }
    }
  },

  'customapi': {
    required: ['url'],
    optional: ['method', 'headers', 'mappings', 'display', 'refreshInterval'],
    fields: {
      url: { type: 'url', label: 'API URL', placeholder: 'https://api.example.com/data' },
      method: { 
        type: 'select', 
        label: 'HTTP Method', 
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' }
        ], 
        default: 'GET' 
      },
      display: { 
        type: 'select', 
        label: 'Display Type', 
        options: [
          { value: 'list', label: 'List' },
          { value: 'block', label: 'Block' }
        ], 
        default: 'list' 
      },
      refreshInterval: { type: 'number', label: 'Refresh Interval (ms)', placeholder: '60000', default: '60000' }
    }
  }
};

// Función para renderizar campos dinámicamente basados en el tipo de widget
const renderFieldInput = (fieldName, fieldConfig, value, onChange, theme) => {
  const { type, label, placeholder, options, default: defaultValue, step } = fieldConfig;

  switch (type) {
    case 'select':
      return (
        <Select
          theme={theme}
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    case 'checkbox':
      return (
        <input
          type="checkbox"
          checked={value || defaultValue || false}
          onChange={(e) => onChange(fieldName, e.target.checked)}
        />
      );

    case 'number':
      return (
        <Input
          theme={theme}
          type="number"
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder={placeholder}
          step={step}
        />
      );

    case 'url':
      return (
        <Input
          theme={theme}
          type="url"
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      );

    case 'email':
      return (
        <Input
          theme={theme}
          type="email"
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      );

    case 'password':
      return (
        <Input
          theme={theme}
          type="password"
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      );

    default: // 'text'
      return (
        <Input
          theme={theme}
          type="text"
          value={value || defaultValue || ''}
          onChange={(e) => onChange(fieldName, e.target.value)}
          placeholder={placeholder}
        />
      );
  }
};

// Función para renderizar todos los campos de un widget específico
const renderWidgetFields = (widgetType, formData, handleFieldChange, theme) => {
  const widgetConfig = INFO_WIDGET_PARAMETERS[widgetType];
  if (!widgetConfig) return null;

  const { required = [], optional = [], fields = {} } = widgetConfig;
  const allFields = [...required, ...optional];

  return (
    <div>
      {allFields.map(fieldName => {
        const fieldConfig = fields[fieldName];
        if (!fieldConfig) return null;

        const isRequired = required.includes(fieldName);
        const value = formData.options?.[fieldName];

        return (
          <FormGroup key={fieldName}>
            <Label theme={theme}>
              {fieldConfig.label}
              {isRequired && ' *'}
            </Label>
            {renderFieldInput(fieldName, fieldConfig, value, handleFieldChange, theme)}
          </FormGroup>
        );
      })}
    </div>
  );
};

const WidgetForm = ({ widget, onSave, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    type: widget?.type || '',
    key: widget?.key || '',
    options: widget?.options || {},
    ...widget
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cleanData = {
      type: formData.type,
      ...(formData.key && { key: formData.key }),
      ...(Object.keys(formData.options || {}).length > 0 && { options: formData.options })
    };
    
    onSave(cleanData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [fieldName]: value
      }
    }));
  };

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{widget ? 'Edit Information Widget' : 'Add New Information Widget'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Widget Type *</Label>
            <Select
              theme={theme}
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              required
            >
              <option value="">Select widget type</option>
              {/* Agrupar widgets por categoría */}
              {Object.entries(
                INFO_WIDGET_TYPES.reduce((acc, widget) => {
                  const category = widget.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(widget);
                  return acc;
                }, {})
              )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, widgets]) => (
                  <optgroup key={category} label={`${category} (${widgets.length})`}>
                    {widgets
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map(widget => (
                        <option key={widget.value} value={widget.value}>
                          {widget.label}
                        </option>
                      ))}
                  </optgroup>
                ))
              }
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Widget Key (optional)</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.key}
              onChange={(e) => handleChange('key', e.target.value)}
              placeholder="Unique identifier for the widget"
            />
          </FormGroup>
        </FormRow>

        {/* Renderizar campos dinámicamente basados en el tipo de widget seleccionado */}
        {formData.type && (
          <div>
            <h4>Widget Configuration</h4>
            {renderWidgetFields(formData.type, formData, handleFieldChange, theme)}
          </div>
        )}

        <ButtonGroup>
          <Button theme={theme} type="button" className="secondary" onClick={onCancel}>
            <FiX /> Cancel
          </Button>
          <Button theme={theme} type="submit" className="primary">
            <FiSave /> Save Widget
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default WidgetForm;

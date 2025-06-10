import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSave, FiSettings } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const FormContainer = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
  transition: all 0.3s ease;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 14px;
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
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const SaveButton = styled.button`
  background: ${props => props.theme?.colors?.primary || '#007acc'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-top: 15px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.primaryHover || '#0056b3'};
  }
`;

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
];

const COLOR_OPTIONS = [
  { value: 'slate', label: 'Slate' },
  { value: 'gray', label: 'Gray' },
  { value: 'zinc', label: 'Zinc' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'stone', label: 'Stone' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'amber', label: 'Amber' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'lime', label: 'Lime' },
  { value: 'green', label: 'Green' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'teal', label: 'Teal' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'sky', label: 'Sky' },
  { value: 'blue', label: 'Blue' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'violet', label: 'Violet' },
  { value: 'purple', label: 'Purple' },
  { value: 'fuchsia', label: 'Fuchsia' },
  { value: 'pink', label: 'Pink' },
  { value: 'rose', label: 'Rose' }
];

const HEADER_STYLE_OPTIONS = [
  { value: 'underlined', label: 'Underlined (Default)' },
  { value: 'boxed', label: 'Boxed' },
  { value: 'clean', label: 'Clean' },
  { value: 'boxedWidgets', label: 'Boxed Widgets' }
];

const STATUS_STYLE_OPTIONS = [
  { value: 'basic', label: 'Basic' },
  { value: 'dot', label: 'Dot' }
];

const ICON_STYLE_OPTIONS = [
  { value: 'gradient', label: 'Gradient (Default)' },
  { value: 'theme', label: 'Theme Colors' },
  { value: 'mono', label: 'Monochrome' },
  { value: 'adaptive', label: 'Adaptive' },
  { value: 'auto', label: 'Auto' },
  { value: 'original', label: 'Original Colors' },
  { value: 'flat', label: 'Flat' },
  { value: 'outline', label: 'Outline' }
];

const SEARCH_PROVIDER_OPTIONS = [
  { value: 'google', label: 'Google' },
  { value: 'duckduckgo', label: 'DuckDuckGo' },
  { value: 'bing', label: 'Bing' },
  { value: 'baidu', label: 'Baidu' },
  { value: 'brave', label: 'Brave' },
  { value: 'custom', label: 'Custom Provider' }
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'nl', label: 'Dutch' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' }
];

const BOOKMARK_STYLE_OPTIONS = [
  { value: 'list', label: 'List (Default)' },
  { value: 'icons', label: 'Icons Only' }
];

const LAYOUT_STYLE_OPTIONS = [
  { value: 'columns', label: 'Columns' },
  { value: 'row', label: 'Row' }
];

const TARGET_OPTIONS = [
  { value: '_self', label: 'Same Tab' },
  { value: '_blank', label: 'New Tab' }
];

const BLUR_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: '2xl', label: '2X Large' },
  { value: '3xl', label: '3X Large' }
];

const CARD_BLUR_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
];

const SettingsForm = ({ settings, onUpdate }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: settings?.title || 'Homepage',
    description: settings?.description || '',
    favicon: settings?.favicon || '',
    theme: settings?.theme || 'dark',
    color: settings?.color || 'slate',
    headerStyle: settings?.headerStyle || 'underlined',
    iconStyle: settings?.iconStyle || 'gradient',
    language: settings?.language || 'en',
    startUrl: settings?.startUrl || '/',
    base: settings?.base || '',
    target: settings?.target || '_blank',
    hideVersion: settings?.hideVersion || false,
    hideErrors: settings?.hideErrors || false,
    useEqualHeights: settings?.useEqualHeights || false,
    statusStyle: settings?.statusStyle || 'basic',
    showStats: settings?.showStats || false,
    bookmarksStyle: settings?.bookmarksStyle || 'list',
    disableCollapse: settings?.disableCollapse || false,
    groupsInitiallyCollapsed: settings?.groupsInitiallyCollapsed || false,
    maxGroupColumns: settings?.maxGroupColumns || 4,
    instanceName: settings?.instanceName || '',
    logpath: settings?.logpath || '',
    cardBlur: settings?.cardBlur || 'none',
    background: settings?.background || {
      image: '',
      blur: 'none',
      saturate: 100,
      brightness: 60,
      opacity: 65
    },
    quicklaunch: settings?.quicklaunch || {
      searchDescriptions: true,
      hideInternetSearch: false,
      showSearchSuggestions: true,
      hideVisitURL: false,
      provider: 'google',
      url: '',
      target: '_blank',
      suggestionUrl: ''
    },
    providers: settings?.providers || {
      openweathermap: '',
      glances: '',
      finnhub: '',
      longhorn: {
        url: '',
        username: '',
        password: ''
      }
    },
    layout: settings?.layout || {},
    ...settings
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const handleDeepNestedChange = (parentField, middleField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [middleField]: {
          ...prev[parentField]?.[middleField],
          [childField]: value
        }
      }
    }));
  };

  // Debug theme status
  console.log('🔍 SettingsForm theme status:', {
    theme: theme,
    themeColors: theme?.colors,
    textColor: theme?.colors?.text,
    isThemeDefined: !!theme
  });

  // Fallback si no hay tema disponible
  if (!theme) {
    console.warn('⚠️ No theme available in SettingsForm, using fallback');
  }

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>
        <FiSettings /> Homepage Settings
      </FormTitle>
        
        <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <FormTitle style={{ marginTop: '0', fontSize: '16px', color: theme.colors.primary }}>
          General Configuration
        </FormTitle>
        
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Page Title</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Homepage"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Page Description</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="A description of my awesome homepage"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Favicon URL</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.favicon}
              onChange={(e) => handleChange('favicon', e.target.value)}
              placeholder="https://example.com/favicon.ico"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Language</Label>
            <Select
              theme={theme}
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              {LANGUAGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Start URL</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.startUrl}
              onChange={(e) => handleChange('startUrl', e.target.value)}
              placeholder="/"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Base URL</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.base}
              onChange={(e) => handleChange('base', e.target.value)}
              placeholder="http://host.local/homepage"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Default Link Target</Label>
            <Select
              theme={theme}
              value={formData.target}
              onChange={(e) => handleChange('target', e.target.value)}
            >
              {TARGET_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Instance Name</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.instanceName}
              onChange={(e) => handleChange('instanceName', e.target.value)}
              placeholder="public"
            />
          </FormGroup>
        </FormRow>

        {/* Appearance Settings */}
        <FormTitle style={{ marginTop: '30px', fontSize: '16px', color: theme.colors.primary }}>
          Appearance & Styling
        </FormTitle>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Theme</Label>
            <Select
              theme={theme}
              value={formData.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              {THEME_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Color Scheme</Label>
            <Select
              theme={theme}
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            >
              {COLOR_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Header Style</Label>
            <Select
              theme={theme}
              value={formData.headerStyle}
              onChange={(e) => handleChange('headerStyle', e.target.value)}
            >
              {HEADER_STYLE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Icon Style</Label>
            <Select
              theme={theme}
              value={formData.iconStyle}
              onChange={(e) => handleChange('iconStyle', e.target.value)}
            >
              {ICON_STYLE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Status Style</Label>
            <Select
              theme={theme}
              value={formData.statusStyle}
              onChange={(e) => handleChange('statusStyle', e.target.value)}
            >
              {STATUS_STYLE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Bookmarks Style</Label>
            <Select
              theme={theme}
              value={formData.bookmarksStyle}
              onChange={(e) => handleChange('bookmarksStyle', e.target.value)}
            >
              {BOOKMARK_STYLE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Card Blur</Label>
            <Select
              theme={theme}
              value={formData.cardBlur}
              onChange={(e) => handleChange('cardBlur', e.target.value)}
            >
              {CARD_BLUR_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        {/* Layout Configuration */}
        <FormTitle style={{ marginTop: '30px', fontSize: '16px', color: theme.colors.primary }}>
          Layout & Behavior
        </FormTitle>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Max Group Columns</Label>
            <Input
              theme={theme}
              type="number"
              min="1"
              max="8"
              value={formData.maxGroupColumns}
              onChange={(e) => handleChange('maxGroupColumns', parseInt(e.target.value))}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Log Path</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.logpath}
              onChange={(e) => handleChange('logpath', e.target.value)}
              placeholder="/logfile/path"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Hide Version</Label>
            <Select
              theme={theme}
              value={formData.hideVersion}
              onChange={(e) => handleChange('hideVersion', e.target.value === 'true')}
            >
              <option value={false}>Show Version</option>
              <option value={true}>Hide Version</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Hide Errors</Label>
            <Select
              theme={theme}
              value={formData.hideErrors}
              onChange={(e) => handleChange('hideErrors', e.target.value === 'true')}
            >
              <option value={false}>Show Errors</option>
              <option value={true}>Hide Errors</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Use Equal Heights</Label>
            <Select
              theme={theme}
              value={formData.useEqualHeights}
              onChange={(e) => handleChange('useEqualHeights', e.target.value === 'true')}
            >
              <option value={false}>Disabled</option>
              <option value={true}>Enabled</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Show Stats</Label>
            <Select
              theme={theme}
              value={formData.showStats}
              onChange={(e) => handleChange('showStats', e.target.value === 'true')}
            >
              <option value={false}>Hidden</option>
              <option value={true}>Visible</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Disable Collapse</Label>
            <Select
              theme={theme}
              value={formData.disableCollapse}
              onChange={(e) => handleChange('disableCollapse', e.target.value === 'true')}
            >
              <option value={false}>Allow Collapsing</option>
              <option value={true}>Disable Collapsing</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Groups Initially Collapsed</Label>
            <Select
              theme={theme}
              value={formData.groupsInitiallyCollapsed}
              onChange={(e) => handleChange('groupsInitiallyCollapsed', e.target.value === 'true')}
            >
              <option value={false}>Expanded</option>
              <option value={true}>Collapsed</option>
            </Select>
          </FormGroup>
        </FormRow>

        {/* Background Configuration */}
        <FormTitle style={{ marginTop: '30px', fontSize: '16px' }}>
          Background Settings
        </FormTitle>
        
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Background Image URL</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.background?.image || ''}
              onChange={(e) => handleNestedChange('background', 'image', e.target.value)}
              placeholder="https://example.com/background.jpg"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Blur</Label>
            <Select
              theme={theme}
              value={formData.background?.blur || 'none'}
              onChange={(e) => handleNestedChange('background', 'blur', e.target.value)}
            >
              {BLUR_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Brightness (%)</Label>
            <Input
              theme={theme}
              type="number"
              min="0"
              max="200"
              value={formData.background?.brightness || 100}
              onChange={(e) => handleNestedChange('background', 'brightness', parseInt(e.target.value))}
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Opacity (%)</Label>
            <Input
              theme={theme}
              type="number"
              min="0"
              max="100"
              value={formData.background?.opacity || 100}
              onChange={(e) => handleNestedChange('background', 'opacity', parseInt(e.target.value))}
            />
          </FormGroup>
        </FormRow>

        {/* Quicklaunch Configuration */}
        <FormTitle style={{ marginTop: '30px', fontSize: '16px' }}>
          Search & Quicklaunch Settings
        </FormTitle>
        
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Search Descriptions</Label>
            <Select
              theme={theme}
              value={formData.quicklaunch?.searchDescriptions}
              onChange={(e) => handleNestedChange('quicklaunch', 'searchDescriptions', e.target.value === 'true')}
            >
              <option value={false}>Disabled</option>
              <option value={true}>Enabled</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Hide Internet Search</Label>
            <Select
              theme={theme}
              value={formData.quicklaunch?.hideInternetSearch}
              onChange={(e) => handleNestedChange('quicklaunch', 'hideInternetSearch', e.target.value === 'true')}
            >
              <option value={false}>Show</option>
              <option value={true}>Hide</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Show Search Suggestions</Label>
            <Select
              theme={theme}
              value={formData.quicklaunch?.showSearchSuggestions}
              onChange={(e) => handleNestedChange('quicklaunch', 'showSearchSuggestions', e.target.value === 'true')}
            >
              <option value={false}>Disabled</option>
              <option value={true}>Enabled</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Hide Visit URL</Label>
            <Select
              theme={theme}
              value={formData.quicklaunch?.hideVisitURL}
              onChange={(e) => handleNestedChange('quicklaunch', 'hideVisitURL', e.target.value === 'true')}
            >
              <option value={false}>Show</option>
              <option value={true}>Hide</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Search Provider</Label>
            <Select
              theme={theme}
              value={formData.quicklaunch?.provider || 'google'}
              onChange={(e) => handleNestedChange('quicklaunch', 'provider', e.target.value)}
            >
              {SEARCH_PROVIDER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          {formData.quicklaunch?.provider === 'custom' && (
            <FormGroup>
              <Label theme={theme}>Custom Search URL</Label>
              <Input
                theme={theme}
                type="url"
                value={formData.quicklaunch?.url || ''}
                onChange={(e) => handleNestedChange('quicklaunch', 'url', e.target.value)}
                placeholder="https://www.ecosia.org/search?q="
              />
            </FormGroup>
          )}
        </FormRow>

        {formData.quicklaunch?.provider === 'custom' && (
          <FormRow>
            <FormGroup>
              <Label theme={theme}>Custom Search Target</Label>
              <Select
                theme={theme}
                value={formData.quicklaunch?.target || '_blank'}
                onChange={(e) => handleNestedChange('quicklaunch', 'target', e.target.value)}
              >
                {TARGET_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>Suggestion URL (Optional)</Label>
              <Input
                theme={theme}
                type="url"
                value={formData.quicklaunch?.suggestionUrl || ''}
                onChange={(e) => handleNestedChange('quicklaunch', 'suggestionUrl', e.target.value)}
                placeholder="https://ac.ecosia.org/autocomplete?type=list&q="
              />
            </FormGroup>
          </FormRow>
        )}

        {/* Provider APIs */}
        <FormTitle style={{ marginTop: '30px', fontSize: '16px' }}>
          API Providers
        </FormTitle>
        
        <FormRow>
          <FormGroup>
            <Label theme={theme}>OpenWeatherMap API Key</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.providers?.openweathermap || ''}
              onChange={(e) => handleNestedChange('providers', 'openweathermap', e.target.value)}
              placeholder="your_openweather_api_key_here"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Finnhub API Key</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.providers?.finnhub || ''}
              onChange={(e) => handleNestedChange('providers', 'finnhub', e.target.value)}
              placeholder="your_finnhub_api_key_here"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Glances URL</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.providers?.glances || ''}
              onChange={(e) => handleNestedChange('providers', 'glances', e.target.value)}
              placeholder="http://localhost:61208"
            />
          </FormGroup>
        </FormRow>

        {/* Longhorn Provider Configuration */}
        <FormTitle style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Longhorn Storage Provider
        </FormTitle>
        
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Longhorn URL</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.providers?.longhorn?.url || ''}
              onChange={(e) => handleDeepNestedChange('providers', 'longhorn', 'url', e.target.value)}
              placeholder="https://longhorn.example.com"
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Longhorn Username</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.providers?.longhorn?.username || ''}
              onChange={(e) => handleDeepNestedChange('providers', 'longhorn', 'username', e.target.value)}
              placeholder="longhorn-username"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>Longhorn Password</Label>
            <Input
              theme={theme}
              type="password"
              value={formData.providers?.longhorn?.password || ''}
              onChange={(e) => handleDeepNestedChange('providers', 'longhorn', 'password', e.target.value)}
              placeholder="very-secret-longhorn-password"
            />
          </FormGroup>
        </FormRow>

        <SaveButton type="submit" theme={theme}>
          <FiSave /> Save Settings
        </SaveButton>
      </form>
    </FormContainer>
  );
};

export default SettingsForm;

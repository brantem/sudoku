import { useTheme } from 'next-themes';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import Select, { Option } from 'components/Select';

const renderValue = (value: string) => {
  switch (value) {
    case 'system':
      return <ComputerDesktopIcon className="h-5 w-5" />;
    case 'dark':
      return <MoonIcon className="h-5 w-5" />;
    case 'light':
      return <SunIcon className="h-5 w-5" />;
  }
};

const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme || 'system'}
      renderValue={renderValue}
      onChange={(value) => setTheme(value)}
      label="Theme"
      placeholder="Select a theme"
      className="w-8 px-0"
    >
      <Option value="system">System</Option>
      <Option value="dark">Dark</Option>
      <Option value="light">Light</Option>
    </Select>
  );
};

export default Theme;
